import Network from './components/Network';
import Ec2Instance from './components/Ec2Instance';

const network = new Network('pulumi-network');

const instance = new Ec2Instance('pulumi-instance', {
  publicSubnet: network.publicSubnet,
  securityGroup: network.allowAllSecurityGroup,
});

export const instancePublicDns = instance.ec2Instance.publicDns;
