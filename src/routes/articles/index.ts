import * as restify from 'restify';
import { logger as log } from '../../logger';
import { createNewArticle } from '../../db/neo4j/commands/create-new-article';
import { getArticlesList } from '../../db/neo4j/queries/get-articles-list';

const createArticle = async (req: restify.Request, res: restify.Response) => {
    try {
        await createNewArticle(req.body.article);
        res.send(200);
    } catch (err) {
        log.error('createArticle ', err);
    }
};

const getAllArticles = async (req: restify.Request, res: restify.Response) => {
    try {
        log.debug('GET ALL ARTICLES HIT');
        const articles = await getArticlesList();

        //res.json(articles);
        res.send(200, articles);
    } catch (err) {
        log.error('getAllArticles ', err);
    }
};

export const bootstrap = (server: restify.Server): void => {
    server.post('/createArticle', createArticle);
    server.get('/getAllArticles', getAllArticles);
};
