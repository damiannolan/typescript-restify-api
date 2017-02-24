import * as restify from 'restify';
import { bootstrap as bootstrapMiddleware } from './middleware';
import { bootstrap as bootstrapHealthCheck } from './healthcheck';

export const bootstrap = (server: restify.Server) => {
    bootstrapMiddleware(server);
    bootstrapHealthCheck(server);
};