import { environment } from './environment';

/**
 * Run command below on ec2 instance to check userData script logs
 * cat /var/log/cloud-init-output.log
 * 
 * Run command below to test postgres connection
 * psql -h $(pulumi stack output instancePublicDns) -p 5432 -U postgres -d postgres
 * 
 * Run command below to ssh into postgres ec2 instance
 * ssh -i "~/pems/default.pem" ubuntu@$(pulumi stack output instancePublicDns)
 */

const userDataScript = `#!/bin/bash
echo "Installing Docker"
sudo apt-get update -y
sudo apt-get install docker.io -y

echo "Installing Docker Compose"
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Installing node and npm"
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Cloning repo"
git clone ${environment.GIT_URL}
cd ${environment.DOCKER_COMPOSE_DIR_PATH}

echo "Starting docker-compose"
sudo npm run start

// echo "Starting Postgres"
// sudo docker run -e POSTGRES_PASSWORD=${environment.POSTGRES_PASSWORD} -p 5432:5432 -d postgres
// echo "Postgres started"
`;

export { userDataScript };
