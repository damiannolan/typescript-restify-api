import { driver } from '../../neo4j';
import { logger as log } from '../../../logger';
import { Article } from '../../../model/article';

export const getArticlesList = (): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
    
        // Create a new session using the driver
        const session = driver.session();

        // Use session.run() to match and return
        session
            .run('match (u:User)-[:AuthorOf]->(a:Article)-[:TopicOf]->(c:Category) return u as user, a.createdAt as createdAt, a.title as title, a.body as body, c.name as category;')
            .then((result: any) => {
                // log the result
                log.debug('match returned', result);

                let article: Article;
                let articles: Article[] = [];

                // Map the records to articles and push to array
                result.records.forEach((record:any) => {
                    let user = record.get('user');

                    article = Object.assign({
                        author: user.properties,
                        createdAt: record.get('createdAt'),
                        title: record.get('title'),
                        body: record.get('body'),
                        category: record.get('category')
                    });

                    log.debug('article = ', article);

                    // Push to articles array
                    articles.push(article);
                });

                // resolve the promise
                resolve(articles);
            })
            .catch((error: any) => { // catch error and log
                log.error('getArticlesList', error);
                reject(error);
            });
    });
}