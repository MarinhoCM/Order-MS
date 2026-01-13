import * as env from 'env-var';

if (process.env.NODE_ENV != 'PRD') require('dotenv').config()

export const serverConfig = {
    port: env.get('SERVER_PORT').default(3000).asPortNumber()
}

export const databaseConfig = {
    url: String(env.get('DATABASE_URL').asString()) || 'file:./dev.db'
};

export const queueConfig = {
    url: env.get('RABBITMQ_URL').required().asString()
}