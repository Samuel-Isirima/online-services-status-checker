import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import services from "./services.json";

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 5000;

app.get('/api/v1', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        error: false,
        message: `Welcome to the fintech API web service, please specify a service path to continue...`,
        data: Object.entries(services).map(([serviceName, serviceUrl]) => {
            return {
                name: `${serviceName} service`,
                url_path: `/${serviceName}`,
            }
        })
    });
});

const createServiceProxy = (serviceName: string, serviceUrl: string, prefix: string, version: string) => {
    let apiPath = `${prefix}/${version}/${serviceName}`;
    const serviceProxy = createProxyMiddleware(apiPath, {
        target: serviceUrl,
        changeOrigin: true,
        pathRewrite: {
            [`^${apiPath}`]: '',
        },
        onError: (err, req, res) => {
            res.status(500).json({
                statusCode: 500,
                error: true,
                message: `${serviceName} service is currently unavailable or encountered an error: ${err.message}`,
                data: null,
            });
        },
        onProxyRes: (proxyRes, req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        },
        
    });
    app.use(serviceProxy);

};

Object.entries(services.services).forEach(([serviceName, serviceUrl]) => 
{
    createServiceProxy(serviceName, serviceUrl, '/api', 'v1') // for v1 services
});

app.listen(PORT, () => {
    console.log(`Gateway listening on port ${PORT}\n`);
    console.log('\nAvailable Services:');
    console.log(`------------------------------------`)
    Object.keys(services).forEach((serviceName, idx) => {
        console.log(` ${idx + 1} ----  ${serviceName} : /api/v1/${serviceName} \n------------------------------------`);
    });
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
});