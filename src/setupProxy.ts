import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const app = express();
app.use(
        createProxyMiddleware('/api/vaccination/public/',{
            target: 'https://tiemchungcovid19.gov.vn/',
            changeOrigin: true, } ));
app.listen(3000);