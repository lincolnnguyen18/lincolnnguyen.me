import { Construct } from 'constructs';
import { App, CloudBackend, NamedCloudWorkspace, TerraformOutput, TerraformStack } from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { Vpc } from '@cdktf/provider-aws/lib/vpc';
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group';
import { Subnet } from '@cdktf/provider-aws/lib/subnet';
import { Instance } from '@cdktf/provider-aws/lib/instance';
import { InternetGateway } from '@cdktf/provider-aws/lib/internet-gateway';
import { RouteTable } from '@cdktf/provider-aws/lib/route-table';
import { RouteTableAssociation } from '@cdktf/provider-aws/lib/route-table-association';
import { postgresInit } from './common/scripts';
import { environment } from './common/environment';

function configureCloudBackend (stack: TerraformStack) {
  new AwsProvider(stack, 'aws', {
    region: environment.AWS_REGION,
  });

  new CloudBackend(stack, {
    hostname: environment.TERRAFORM_CLOUD_HOSTNAME,
    organization: environment.TERRAFORM_CLOUD_ORG,
    workspaces: new NamedCloudWorkspace(environment.TERRAFORM_CLOUD_WORKSPACE_NAME + '-' + stack.node.id),
  });
}

class NetworkStack extends TerraformStack {
  public vpc: Vpc;
  public securityGroup: SecurityGroup;
  public publicSubnet: Subnet;

  constructor (scope: Construct, name: string) {
    super(scope, name);
    configureCloudBackend(this);

    this.vpc = new Vpc(this, 'vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: {
        Name: 'cdktf-vpc',
      },
      enableDnsHostnames: true,
    });

    const igw = new InternetGateway(this, 'igw', {
      vpcId: this.vpc.id,
      tags: {
        Name: 'cdktf-igw',
      },
    });

    // create public subnet in the vpc
    this.publicSubnet = new Subnet(this, 'publicSubnet', {
      vpcId: this.vpc.id,
      cidrBlock: '10.0.1.0/24',
      availabilityZone: 'us-east-1a',
      tags: {
        Name: 'cdktf-public-subnet',
      },
    });

    // create a route table for the public subnet
    const publicRouteTable = new RouteTable(this, 'publicRouteTable', {
      vpcId: this.vpc.id,
      tags: {
        Name: 'cdktf-public-route-table',
      },
      route: [
        // route any traffic that is not destined for resources in the VPC to the internet gateway
        {
          cidrBlock: '0.0.0.0/0',
          gatewayId: igw.id,
        },
      ],
    });
    
    // associate the public subnet with the public route table
    new RouteTableAssociation(this, 'publicRouteTableAssociation', {
      subnetId: this.publicSubnet.id,
      routeTableId: publicRouteTable.id,
    });

    // create a new sg that allows all incoming and all outgoing traffic
    this.securityGroup = new SecurityGroup(this, 'securityGroup', {
      name: 'cdktf-security-group',
      vpcId: this.vpc.id,
      ingress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: '-1',
          cidrBlocks: ['0.0.0.0/0'],
        },
      ],
      egress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: '-1',
          cidrBlocks: ['0.0.0.0/0'],
        },
      ],
    });
  }
}

interface DbStackProps {
  publicSubnetId: string;
  /**
   * VPC of security group should be the same as the VPC of the subnet
   */
  securityGroupId: string;
}

class DbStack extends TerraformStack {
  constructor (scope: Construct, name: string, props: DbStackProps) {
    super(scope, name);
    configureCloudBackend(this);
    
    const { publicSubnetId, securityGroupId } = props;

    const instance = new Instance(this, 'ec2Instance', {
      // AMI for Ubuntu on t4g.nano in us-east-1
      ami: 'ami-0f9bd9098aca2d42b',
      instanceType: 't4g.nano',
      keyName: 'default',
      associatePublicIpAddress: true,
      subnetId: publicSubnetId,
      vpcSecurityGroupIds: [securityGroupId],

      tags: {
        Name: 'cdktf-postgres',
      },

      // run command below on ec2 instance to check userData script logs
      // cat /var/log/cloud-init-output.log
      userData: postgresInit,
      userDataReplaceOnChange: true,

      // run command below to test postgres connection
      // psql -h $PUBLIC_DNS -p 5432 -U postgres -d postgres
    });

    // run command below to ssh into postgres ec2 instance
    // ssh -i "default.pem" ubuntu@{publicDns}
    new TerraformOutput(this, 'publicDns', {
      value: instance.publicDns,
    });
  }
}

const app = new App();

const network = new NetworkStack(app, 'network');

new DbStack(app, 'db', {
  publicSubnetId: network.publicSubnet.id,
  securityGroupId: network.securityGroup.id,
});

app.synth();
