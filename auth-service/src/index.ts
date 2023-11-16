require('dotenv').config();

import express, { Application, Request, Response } from 'express'
import routes from './routes';
import { connect } from 'http2';
import connectToDatabase from './database/DatabaseConnection';

const app: Application = express()
const port = process.env.AUTH_SERVICE_PORT || 3000

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to database
connectToDatabase();

//app.use('/api/v1', routes)
app.use('/api/v1', routes)

try 
{
    app.listen(port, () => 
    {
        console.log(`Auth service running on http://localhost:${port}`)
    })
} 
catch (error : any) 
{
    console.log(`An error occurred while trying to initialize auth serrvice: ${error.message}`)
}                    