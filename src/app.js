import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from "./lib/db/mongoose.js";
import cors from 'cors';
import router from './routes.js';
import globalErrorHandler from './lib/error/globalErrorHandeler.js';

export function createApp() {
    const app = express();
    app.use(cors());
    // connect to DB
    connectDB();
    app.use(express.json());

    // routes
    app.use('/api', router);

    // global error handler
    app.use(globalErrorHandler);

    return app;
}