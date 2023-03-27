import { Instance } from '@cdktf/provider-aws/lib/instance';
import { TerraformOutput, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import { postgresInit } from '../common/scripts';
import { configureCloudBackend } from '../common/utils';

interface DbStackProps {
  publicSubnetId: string;
  /**
   * VPC of security group should be the same as the VPC of the subnet
   */
  securityGroupId: string;
}

export default class DbStack extends TerraformStack {
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
