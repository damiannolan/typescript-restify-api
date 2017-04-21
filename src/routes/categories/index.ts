import * as restify from 'restify';
import { getListCategories } from '../../db/neo4j/queries/list-categories';
import { logger as log } from '../../logger';


const categories = async (req: restify.Request, res: restify.Response) => {
  try {
    const categories = await getListCategories();

    res.json(categories);
    res.send(200);

  } catch (err) {
    log.error('/categories - ', err);
  }

};

export const bootstrap = (server: restify.Server): void => {
  server.get('/categories', categories);
};
