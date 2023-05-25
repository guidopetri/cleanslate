echo "=> Kill the local version of Clean Slate..."

pkill -9 -f "cypress"
pkill -9 -f "Cypress"
pkill -9 -f "hasura console"
pkill -9 -f "next dev"
pkill -9 -f "npm exec tsc --watch"
pkill -9 -f "tsc --watch"

echo "=> Configure the local machine"

if [[ $CI != "true" ]]; then

  export DB_HOST="127.0.0.1"
  export DB_NAME="postgres"
  export DB_PASSWORD="password"
  export DB_PORT="1276"
  export DB_USER="postgres"
  export HASURA_GRAPHQL_ADMIN_SECRET='secret'
  export HASURA_GRAPHQL_DATABASE_URL="postgres://postgres:password@database:5432/postgres"
  export NEXT_PUBLIC_LOGIN_WITH_APPLE="true"
  export NEXT_PUBLIC_LOGIN_WITH_GOOGLE="true"
  export NEXT_PUBLIC_LOGIN_WITH_GITHUB="true"
  export NEXT_PUBLIC_LOGIN_WITH_FACEBOOK="true"
  export NEXT_PUBLIC_VERSION="XXX"
  export NODE_ENV="development"

  if [[ $FIREBASE != "true" ]]; then

    export HASURA_GRAPHQL_JWT_SECRET='{ "type": "HS256", "key": "d374e7c8-912c-4871-bac2-7dde6afc2b55" }'

  else

    abspath() {                                               
      cd "$(dirname "$1")"
      printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
      cd "$OLDPWD"
    }

    export NEXT_PUBLIC_USE_FIREBASE="true"
    export GOOGLE_APPLICATION_CREDENTIALS=$(abspath "firebase-service-account.json")
    export FIREBASE_PROJECT_ID=$(jq -r .projectId firebase-config.json)
    export NEXT_PUBLIC_FIREBASE_CONFIG=$(jq . firebase-config.json)
    HASURA_GRAPHQL_JWT_SECRET='{ "type": "RS256", "audience": "%s", "issuer": "%s", "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com" }'
    export HASURA_GRAPHQL_JWT_SECRET=$(printf "$HASURA_GRAPHQL_JWT_SECRET" $FIREBASE_PROJECT_ID https://securetoken.google.com/$FIREBASE_PROJECT_ID)

  fi

 
  echo "=> Install the dependencies..."
  pnpm install
  cd functions && npm install && cd ..

  echo "=> Spin up PostgreSQL and Hasura..."
  docker-compose down -v --remove-orphans -t 0
  docker-compose pull && docker-compose up -d

  echo "=> Wait for five seconds for Hasura to get ready..."
  sleep 5;

  echo "=> Run migrations with Hasura..."
  node migrate.js

  npx hasura console --no-browser --admin-secret 'secret' &
  (cd src && (npx tsc --watch --preserveWatchOutput)) &

fi

# Start the server!

(cd src && npx next dev) & 

if [[ $CYPRESS == "true" ]]; then

  if [[ $CI == "true" ]]; then
    cd src && npx cypress run --browser chrome

  else

    cd src && npx cypress open &

  fi

fi
