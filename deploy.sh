export $(xargs < .env)
export NEXT_PUBLIC_VERSION=$(git rev-parse --short HEAD)

if [ -n "$COMPOSE_FILE" ]; then
  echo "Deploying with file: $COMPOSE_FILE"
else
  COMPOSE_FILE=docker-compose.yml
  echo "Deploying with file: $COMPOSE_FILE"
fi


git pull origin main
docker-compose -f $COMPOSE_FILE build
docker-compose -f $COMPOSE_FILE down --remove-orphans -t=0
docker-compose -f $COMPOSE_FILE up -d