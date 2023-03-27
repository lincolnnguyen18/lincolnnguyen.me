import { InternetGateway } from '@cdktf/provider-aws/lib/internet-gateway';
import { RouteTable } from '@cdktf/provider-aws/lib/route-table';
import { RouteTableAssociation } from '@cdktf/provider-aws/lib/route-table-association';
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group';
import { Subnet } from '@cdktf/provider-aws/lib/subnet';
import { Vpc } from '@cdktf/provider-aws/lib/vpc';
import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { configureCloudBackend } from '../common/utils';

export default class NetworkStack extends TerraformStack {
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
