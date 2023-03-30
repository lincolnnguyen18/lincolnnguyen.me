echo "Installing Docker"
sudo apt-get update -y
sudo apt-get install docker.io -y

daemonJson=$(cat <<'EOF'
{
  "iptables": true,
  "dns": ["8.8.8.8", "8.8.4.4"]
}
EOF
)

echo "Creating daemon.json"
sudo mkdir -p /etc/docker
sudo touch /etc/docker/daemon.json
echo "${daemonJson}" | sudo tee /etc/docker/daemon.json > /dev/null

echo "Restarting Docker"
sudo systemctl restart docker

echo "Initializing Docker Swarm"
sudo docker swarm init

echo "Setting AWS credentials"
export AWS_ACCESS_KEY_ID="AKIAX4X6VWC3GTTRM2EG"
export AWS_SECRET_ACCESS_KEY="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"
export AWS_DEFAULT_REGION="us-east-1"
export AWS_DEFAULT_OUTPUT="json"

echo "Installing AWS CLI"
sudo apt-get install awscli -y

echo "Downloading startup scripts"
aws s3 sync s3://bucket-1cc1e43 ~/startup-scripts
cd ~/startup-scripts

echo "Pulling Docker images"
sudo docker-compose pull

echo "Deploying stack to Docker Swarm"
sudo env POSTGRES_PASSWORD=password_here docker stack deploy --compose-file docker-compose.yml stack

echo "Installing Docker Compose"
sudo apt-get install docker-compose -y