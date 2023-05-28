/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process')

const isProduction = process.env.NODE_ENV === 'production'
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'XXX'

const endpoint = 'http://localhost:8120'
const secret = `--admin-secret ${adminSecret}`
const auth = `--endpoint ${endpoint} ${secret}`

// Apply the metadata, then the migrations

execSync(`npx hasura metadata apply ${auth}`)
execSync(`npx hasura migrate apply --all-databases ${auth}`)
execSync(`npx hasura metadata reload ${auth}`)

if (!isProduction) {
  execSync(`hasura seed apply --file user.sql ${auth} --database-name default`)
}
