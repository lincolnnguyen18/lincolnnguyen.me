import { environment } from './environment';

const daemonJson = `{
  "iptables": true,
  "dns": ["8.8.8.8", "8.8.4.4"]
}
`;

const userDataScript = `#!/bin/bash
echo "Installing Docker"
sudo apt-get update -y
sudo apt-get install docker.io -y

echo "Creating daemon.json"
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
sudo echo '${daemonJson}' > /etc/docker/daemon.json

echo "Restarting Docker"
sudo systemctl restart docker

echo "Initializing Docker Swarm"
sudo docker swarm init

echo "Installing AWS CLI"
sudo apt-get install awscli -y

echo "Downloading startup scripts"
aws s3 sync s3://${environment.STARTUP_SCRIPTS_BUCKET_NAME} ~
cd ~

echo "Deploying stack to Docker Swarm"
sudo env POSTGRES_PASSWORD=${environment.POSTGRES_PASSWORD} docker stack deploy --compose-file docker-compose.yml stack

echo "Installing Docker Compose"
sudo apt-get install docker-compose -y
`;

export { userDataScript };
