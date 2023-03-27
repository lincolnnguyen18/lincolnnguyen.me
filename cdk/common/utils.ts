import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { CloudBackend, NamedCloudWorkspace, TerraformStack } from 'cdktf';
import { environment } from './environment';

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

export { configureCloudBackend };
