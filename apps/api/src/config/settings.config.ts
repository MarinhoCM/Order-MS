import * as env from 'env-var';

if (process.env.NODE_ENV != 'PRD') require('dotenv').config()

export const serverConfig = {
    port: env.get('SERVER_PORT').default(3000).asPortNumber()
}

export const databaseConfig = {
    url:env.get('DATABASE_URL').required().asString() || 'file:./dev.db'
};
