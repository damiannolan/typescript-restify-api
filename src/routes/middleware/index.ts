import * as bunyan from 'bunyan';
import * as config from 'config';
import * as restify from 'restify';
import * as jwt from 'restify-jwt';

export const bootstrap = (server: restify.Server) => {
    const corsHeaders = config.get('Server.corsHeaders') as string[];
    const corsOrigins = config.get('Server.corsOrigins') as string[];

    // CORS for Cross Domain Requests
    server.pre(restify.CORS({ headers: corsHeaders, origins: corsOrigins, credentials: true }));
    server.use(restify.fullResponse());
    server.use(restify.queryParser());
    // Accept application/json
    server.use(restify.acceptParser(server.acceptable));
    // Authorization parser necessary to take bearer token
    server.use(restify.authorizationParser());
    // Json web token for authorized routes
    //server.use(jwt(jwtConfig).unless(whitelistConfig));
    server.use(restify.bodyParser(bodyParserConfig));
}

const jwtConfig = { secret: config.get('Server.authSecret') };

// Unless on whitelist. middleware will expect you to have a valid jwt to access protected routes
// Whitelist root /heathcheck
// And regexp to not have to deal with each individual auth route separately (every route under /auth)
const whitelistConfig = {
  path: ['/', '/healthcheck', /(?:auth(?:$|\/\w*?))/i]
};

const bodyParserConfig = { mapParams: true };

