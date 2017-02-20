import * as restify from 'restify';
import { bootstrap as bootstrapHealthCheck } from './healthcheck';

export const bootstrap = (server: restify.Server) => {
    bootstrapHealthCheck(server);
};