import * as restify from 'restify';

const catagories = (req: restify.Request, res: restify.Response, next: restify.Next) =>  {
  res.json(['Guitar', 'Drums', 'Bass', 'DJ and Audio Production']);
  res.send(200);
  return next();
};

export const bootstrap = (server: restify.Server) : void => {
  server.get('/catagories', catagories);
};