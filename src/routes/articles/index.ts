import * as restify from 'restify';
import { logger as log } from '../../logger';
import { createNewArticle } from '../../db/neo4j/commands/create-new-article';

const createArticle = async (req: restify.Request, res: restify.Response, next: restify.Next) => {
    try {
        log.debug(req.body);

        await createNewArticle(req.body.article);
        res.send(200);
    } catch (err) {
        log.error('createArticle ', err);
    }
};

export const bootstrap = (server: restify.Server): void => {
    server.post('/createArticle', createArticle);
};
