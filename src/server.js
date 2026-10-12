import http from 'http';
import { createApp } from './app.js';
import mongoose from 'mongoose';
import { logger } from './pkg/logger/logger.js';
import { env } from './lib/config/env.js';

const app = createApp();
const server = http.createServer(app);
server.listen(env.port, () => logger.info(`Server started on port ${env.port}`));

async function serverShutdown() {
    await mongoose.connection.close();
    process.exit(0);
}

process.on('SIGINT', serverShutdown);
process.on('SIGTERM', serverShutdown);

// EMAIL_USER = 'eng.mohamed.sa02@gmail.com'
// EMAIL_PASS = 'wlcn llsc uqxk paey'
// DATABASE_URL = 'mongodb://127.0.0.1:27017/c47'
// JWT_SECRET = "MSA@@Master"
// CLIENT_ID = '175946535580-knm3ssq6d5i6ffhroetst5viasob8387.apps.googleusercontent.com'
// REDIS_HOST = 'localhost'
// REDIS_PORT = '6379'
// REDIS_PASSWORD = ''