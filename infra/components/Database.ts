import { Instance, SecurityGroup, Subnet } from '@pulumi/aws/ec2';
import { ComponentResource } from '@pulumi/pulumi';
import { postgresInit } from '../common/scripts';

interface Props {
  publicSubnet: Subnet;
  /**
   * VPC of security group should be the same as the VPC of the subnet
   */
  securityGroup: SecurityGroup;
}

/**
 * Run command below on ec2 instance to check userData script logs
 * cat /var/log/cloud-init-output.log
 * 
 * Run command below to test postgres connection
 * psql -h $(pulumi stack output postgresPublicDns) -p 5432 -U postgres -d postgres
 * 
 * Run command below to ssh into postgres ec2 instance
 * ssh -i "~/pems/default.pem" ubuntu@$(pulumi stack output postgresPublicDns)
 */
export default class Postgres extends ComponentResource {
  public readonly ec2Instance: Instance;

  constructor (name: string, props: Props) {
    super('custom:Database', name);

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
        Name: 'pulumi-postgres',
      },

      userData: postgresInit,
      userDataReplaceOnChange: true,
    });
  }
}
