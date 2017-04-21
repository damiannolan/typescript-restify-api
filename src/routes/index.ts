import * as restify from 'restify';
import { bootstrap as bootstrapMiddleware } from './middleware';
import { bootstrap as bootstrapHealthCheck } from './healthcheck';
import { bootstrap as bootstrapAuth } from './auth';
import { bootstrap as boostrapCategories } from './categories';
import { bootstrap as bootstrapArticles } from './articles';

export const bootstrap = (server: restify.Server) => {
    bootstrapMiddleware(server);
    bootstrapHealthCheck(server);
    bootstrapAuth(server);
    boostrapCategories(server);
    bootstrapArticles(server);
};
