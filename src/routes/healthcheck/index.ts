import * as restify from 'restify';

const healthcheck = (req: restify.Request, res: restify.Response, next: restify.Next) =>  {
  res.send(200);
  return next();
};

export const bootstrap = (server: restify.Server) : void => {
  server.head('/healthcheck', healthcheck);
  server.get('/healthcheck', healthcheck);
};
