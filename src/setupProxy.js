import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const { createProxyMiddleware } = require('http-proxy-middleware');
     
    module.exports = function(app) {
        app.use(createProxyMiddleware('/api/vaccination/public', { target: 'https://tiemchungcovid19.gov.vn/' }));
        app.use(createProxyMiddleware('/api/**/**', { target: 'https://tiemchungcovid19.gov.vn/' }));
    };