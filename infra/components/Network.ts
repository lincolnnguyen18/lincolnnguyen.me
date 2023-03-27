import { InternetGateway, RouteTable, RouteTableAssociation, SecurityGroup, Subnet, Vpc } from '@pulumi/aws/ec2';
import { ComponentResource } from '@pulumi/pulumi';

export default class Network extends ComponentResource {
  public readonly vpc: Vpc;
  public readonly allowAllSecurityGroup: SecurityGroup;
  public readonly publicSubnet: Subnet;

  constructor (name: string) {
    super('custom:Network', name);

    this.vpc = new Vpc('vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: {
        Name: 'pulumi-vpc',
      },
      enableDnsHostnames: true,
    });

    const igw = new InternetGateway('igw', {
      vpcId: this.vpc.id,
      tags: {
        Name: 'pulumi-igw',
      },
    });

    // create public subnet in the vpc
    this.publicSubnet = new Subnet('public-subnet', {
      vpcId: this.vpc.id,
      cidrBlock: '10.0.1.0/24',
      availabilityZone: 'us-east-1a',
      tags: {
        Name: 'pulumi-public-subnet',
      },
    });

    // create a route table for the public subnet
    const publicRouteTable = new RouteTable('public-route-table', {
      vpcId: this.vpc.id,
      tags: {
        Name: 'pulumi-public-route-table',
      },
      routes: [
        // route any traffic that is not destined for resources in the VPC to the internet gateway
        {
          cidrBlock: '0.0.0.0/0',
          gatewayId: igw.id,
        },
      ],
    });

    // associate the public subnet with the public route table
    new RouteTableAssociation('public-route-table-association', {
      subnetId: this.publicSubnet.id,
      routeTableId: publicRouteTable.id,
    });

    const allowAll = [
      {
        fromPort: 0,
        toPort: 0,
        protocol: '-1',
        cidrBlocks: ['0.0.0.0/0'],
      },
    ];

    // create a security group for the public subnet
    this.allowAllSecurityGroup = new SecurityGroup('security-group', {
      vpcId: this.vpc.id,
      description: 'Allow inbound traffic from the internet',
      ingress: allowAll,
      egress: allowAll,
    });
  }
}
