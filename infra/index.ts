import Network from './components/Network';
import Postgres from './components/Database';

const network = new Network('pulumi-network');

const postgres = new Postgres('pulumi-postgres', {
  publicSubnet: network.publicSubnet,
  securityGroup: network.allowAllSecurityGroup,
});

export const postgresPublicDns = postgres.ec2Instance.publicDns;
