require('dotenv').config();

import express, { Application, Request, Response } from 'express'
import routes from './routes';
import { connect } from 'http2';
import connectToDatabase from './database/DatabaseConnection';

const app: Application = express()
const port = process.env.PROFILE_SERVICE_PORT || 3100

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to database
connectToDatabase();

app.use('/api/v1', routes)

try 
{
    app.listen(port, () => 
    {
        console.log(`Resource service running on http://localhost:${port}`)
    })
} 
catch (error : any) 
{
    console.log(`An error occurred while trying to initialize profile service: ${error.message}`)
}                    