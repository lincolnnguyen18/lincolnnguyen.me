import { Instance, SecurityGroup, Subnet } from '@pulumi/aws/ec2';
import { ComponentResource } from '@pulumi/pulumi';
import { userDataScript } from '../common/scripts';

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
      // AMI for Ubuntu on t3a.nano in us-east-1
      ami: 'ami-007855ac798b5175e',
      instanceType: 't3a.nano',
      keyName: 'default',
      associatePublicIpAddress: true,
      subnetId: publicSubnet.id,
      vpcSecurityGroupIds: [securityGroup.id],

      tags: {
        Name: name,
      },

      userData: userDataScript,
      userDataReplaceOnChange: true,
    });
  }
}
