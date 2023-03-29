
/**
 * Run command below on ec2 instance to check userData script logs
 * cat /var/log/cloud-init-output.log
 * tail -f /var/log/cloud-init-output.log
 * 
 * Run command below to test postgres connection
 * psql -h $(pulumi stack output instancePublicDns) -p 5432 -U postgres -d postgres
 * 
 * Run command below to ssh into postgres ec2 instance
 * ssh -i "~/pems/default.pem" ubuntu@$(pulumi stack output instancePublicDns)
 */

import { environment } from './environment';

/**
 * Run command below to scale docker swarm
 * docker service scale api=2
 * 
 * Run command below to check docker swarm logs
 * docker service logs api
 * 
 * Run command below to view nodes running the service
 * docker service ps api
 * 
 * Run command below to delete the service
 * docker service rm api
 * 
 * Run command below to inspect the service
 * docker service inspect api --pretty
 * 
 * Run command below to set update delay for the service
 * docker service update --update-delay 10s api
 * 
 * Run command below to update service with new image
 * docker service update --image ln342000/lincolnnguyen-me-production-api:latest api
 * 
 * Run command below to publish service to port 80
 * docker service update --publish-add 80:4000 api
 * 
 * Run command below to unpublish service from port 80
 * docker service update --publish-rm 80:4000 api
 * 
 * Run command below to create a published service
 * docker service create --replicas 2 --name api --publish 80:4000 --update-delay 10s ln342000/lincolnnguyen-me-api-v2
 * docker service create --replicas 2 --name api --publish 80:80 --update-delay 10s ln342000/lincolnnguyen-backend
 * sudo docker service create --replicas 1 --name api --publish 80:80 --update-delay 10s ln342000/lincolnnguyen-backend
 * sudo docker service create --replicas 1 --name api --publish 80:4000 ln342000/lincolnnguyen-me-api-v2
 * sudo docker service create --name postgres --replicas 1 -e POSTGRES_PASSWORD=${environment.POSTGRES_PASSWORD} -p 5432:5432 postgres
 * 
 * Run command below to create a postgres service with one replica and password of 'password'
 * docker service create --name postgres --replicas 1 -e POSTGRES_PASSWORD=password -p 5432:5432 postgres
 * 
 * Run command below to test postgres connection
 * psql -h localhost -p 5432 -U postgres -d postgres
 * 
 * Run command below to list all services
 * docker service ls
 * 
 * Run command below to delete all services
 * docker service rm $(docker service ls -q)
 * 
 * Run command below to delete all containers
 * docker rm $(docker ps -a -q)
 * 
 * Run command below to check docker swarm status
 * docker info
 * 
 * Run command below to pull an image
 * docker pull ln342000/lincolnnguyen-me-production-api
 * 
 * Run command below to prune all unused images forcefully
 * sudo docker image prune -a -f
 * 
 * Run command below to ssh into a docker container
 * sudo docker exec -it <container_id> /bin/bash
 * 
 * Run command below to remove all images
 * sudo docker rmi $(sudo docker images -q)
 * 
 * Run command below to deploy a stack to docker swarm
 * sudo docker stack deploy --compose-file docker-compose.yml stack
 * sudo env POSTGRES_PASSWORD=password_here docker stack deploy --compose-file docker-compose.yml stack
 * 
 * Run command below to remove a stack from docker swarm
 * sudo docker stack rm stack
 * 
 * Run command below to restart a service
 * sudo docker service update --force api
 */

/**
 * Run command below to forcefully stop an EC2 instance
 * aws ec2 stop-instances --instance-ids $(pulumi stack output instanceId) --force
 * 
 * Run command below to sync with s3 bucket
 * aws s3 sync s3://bucket-1cc1e43 ~
 */

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
`;

export { userDataScript };
