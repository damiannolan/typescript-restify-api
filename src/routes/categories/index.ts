import * as restify from 'restify';
import { getListCategories } from '../../db/neo4j/queries/list-categories';


const categories = async (req: restify.Request, res: restify.Response, next: restify.Next) =>  {
  
  const categories = await getListCategories();
  
  res.json(categories);
  res.send(200);
  return next();
};

export const bootstrap = (server: restify.Server) : void => {
  server.get('/categories', categories);
};