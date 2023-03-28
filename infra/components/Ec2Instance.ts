import { Instance, SecurityGroup, Subnet } from '@pulumi/aws/ec2';
import { ComponentResource } from '@pulumi/pulumi';

interface Props {
  publicSubnet: Subnet;
  /**
   * VPC of security group should be the same as the VPC of the subnet
   */
  securityGroup: SecurityGroup;
}

export default class Ec2Instance extends ComponentResource {
  public readonly ec2Instance: Instance;

  constructor (name: string, props: Props) {
    super('custom:Ec2Instance', name);

    const { publicSubnet, securityGroup } = props;

    this.ec2Instance = new Instance('ec2-instance', {
      // AMI for Ubuntu on t4g.nano in us-east-1
      ami: 'ami-0f9bd9098aca2d42b',
      instanceType: 't4g.nano',
      keyName: 'default',
      associatePublicIpAddress: true,
      subnetId: publicSubnet.id,
      vpcSecurityGroupIds: [securityGroup.id],

      tags: {
        Name: name,
      },

      // userData: postgresInit,
      // userDataReplaceOnChange: true,
    });
  }
}
