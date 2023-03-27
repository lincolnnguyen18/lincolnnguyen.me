import { environment } from './environment';

const postgresInit = `#!/bin/bash
echo "Installing Docker"
sudo apt-get update -y
sudo apt-get install docker.io -y
sudo systemctl start docker
echo "Starting Postgres"
sudo docker run -e POSTGRES_PASSWORD=${environment.POSTGRES_PASSWORD} -p 5432:5432 -d postgres
echo "Postgres started"
`;

export { postgresInit };
