import DbStack from './stacks/DbStack';
import NetworkStack from './stacks/NetworkStack';
import { App } from 'cdktf';

const app = new App();

const network = new NetworkStack(app, 'network');

new DbStack(app, 'db', {
  publicSubnetId: network.publicSubnet.id,
  securityGroupId: network.securityGroup.id,
});

app.synth();
