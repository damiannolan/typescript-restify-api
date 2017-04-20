import * as restify from 'restify';
import { bootstrap as bootstrapMiddleware } from './middleware';
import { bootstrap as bootstrapHealthCheck } from './healthcheck';
import { bootstrap as bootstrapAuth } from './auth';
import { bootstrap as boostrapCatagories } from './catagories';

export const bootstrap = (server: restify.Server) => {
    bootstrapMiddleware(server);
    bootstrapHealthCheck(server);
    bootstrapAuth(server);
    boostrapCatagories(server);
};
