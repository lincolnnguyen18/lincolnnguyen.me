# Commands

```shell
# Run command below on ec2 instance to check userData script logs
cat /var/log/cloud-init-output.log
tail -f /var/log/cloud-init-output.log

# Run command below to test postgres connection
psql -h $(pulumi stack output instancePublicDns) -p 5432 -U postgres -d postgres
psql -h database.lincolnnguyen.me -p 5432 -U postgres -d postgres
psql -h development.database.lincolnnguyen.me -p 5432 -U postgres -d postgres
psql -h staging.database.lincolnnguyen.me -p 5432 -U postgres -d postgres

# Run command below to ssh into postgres ec2 instance
`ssh -i "~/pems/default.pem" ubuntu@$(pulumi stack output instancePublicDns)`

# Run command below to scale docker swarm
docker service scale api=2
# Run command below to check docker swarm logs
docker service logs api
# running the service
docker service ps api

# Run command below to delete the service
docker service rm api
# Run command below to inspect the service
docker service inspect api --pretty
# Run command below to set update delay for the service
docker service update --update-delay 10s api
# Run command below to update service with new image
docker service update --image ln342000/lincolnnguyen-me-production-api:latest stack_production_api
# Run command below to publish service to port 80
docker service update --publish-add 80:4000 api
# Run command below to unpublish service from port 80
docker service update --publish-rm 80:4000 api

# Run command below to create a published service
docker service create --replicas 2 --name api --publish 80:4000 --update-delay 10s ln342000/lincolnnguyen-me-api-v2
docker service create --replicas 2 --name api --publish 80:80 --update-delay 10s ln342000/lincolnnguyen-backend
sudo docker service create --replicas 1 --name api --publish 80:80 --update-delay 10s ln342000/lincolnnguyen-backend
sudo docker service create --replicas 1 --name api --publish 80:4000 ln342000/lincolnnguyen-me-api-v2
sudo docker service create --name postgres --replicas 1 -e POSTGRES_PASSWORD=${environment.POSTGRES_PASSWORD} -p 5432:5432 postgres

# Run command below to create a postgres service with one replica and password of 'password'
docker service create --name postgres --replicas 1 -e POSTGRES_PASSWORD=password -p 5432:5432 postgres
# Run command below to test postgres connection
psql -h localhost -p 5432 -U postgres -d postgres
# Run command below to list all services
docker service ls
# Run command below to delete all services
docker service rm $(docker service ls -q)
# Run command below to delete all containers
docker rm $(docker ps -a -q)
# Run command below to check docker swarm status
docker info
# Run command below to pull an image
docker pull ln342000/lincolnnguyen-me-production-api
docker pull ln342000/nginx

# Run command below to prune all unused images forcefully
prune -a -f
# Run command below to ssh into a docker container
sudo docker exec -it <container_id> /bin/bash
# Run command below to remove all images
sudo docker rmi $(sudo docker images -q)
# Run command below to remove all containers
sudo docker rm $(sudo docker ps -a -q)
# Run command below to remove all containers and images
sudo docker rm $(sudo docker ps -a -q) && sudo docker rmi $(sudo docker images -q)
# Run command below to deploy a stack to docker swarm
sudo docker stack deploy --compose-file docker-compose.yml stack
sudo env POSTGRES_PASSWORD=enter_password docker stack deploy --compose-file docker-compose.yml stack
# Run command below to remove a stack from docker swarm
sudo docker stack rm stack
# Run command below to restart a service
sudo docker service update --force api
# Run command below to do docker compose up
sudo env POSTGRES_PASSWORD=enter_password docker-compose up -d


# Run command below to forcefully stop an EC2 instance
aws ec2 stop-instances --instance-ids $(pulumi stack output instanceId) --force

# Run command below to sync from s3 bucket
aws s3 sync s3://bucket-1cc1e43 ~
aws s3 sync s3://bucket-1cc1e43 startup-scripts

# Run command below to sync to s3 bucket
aws s3 sync ~ s3://bucket-1cc1e43
aws s3 sync letsencrypt s3://bucket-2-1281a98

# Run command below to run certbot and get a certificate
sudo docker run -it --rm \
-v ~/letsencrypt:/etc/letsencrypt \
certbot/certbot certonly \
--manual --preferred-challenges dns \
-d lincolnnguyen.me -d '*.lincolnnguyen.me' -d '*.api.lincolnnguyen.me'

# Run command below to set permission levels for certbot directory
sudo chmod 775 letsencrypt && sudo find letsencrypt -type d -exec chmod 775 {} \; && sudo find letsencrypt -type f -exec chmod 664 {} \;

# Certificate is saved at: ~/letsencrypt/live/lincolnnguyen.me/fullchain.pem
# Key is saved at:         ~/letsencrypt/live/lincolnnguyen.me/privkey.pem
```
