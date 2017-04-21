import { driver } from '../../neo4j';
import { logger as log } from '../../../logger';

export const createNewArticle = (article:any): Promise<any> => {
    return new Promise((resolve, reject) => {
    
        // Create a new session using the driver
        const session = driver.session();

        // Use session.run() to attempt to match an existing user
        session
            .run('match (u:User {email: {email}}), (c:Category {name: {category}}) create (u)-[:AuthorOf]->(a:Article {title: {title}, body: {body}, createdAt: {createdAt}})-[:TopicOf]->(c)', {
                email: article.author.email, category: article.category, title: article.title, body: article.body,
                createdAt: article.createdAt
            })
            .then((result: any) => {
                // log the result
                log.debug('match returned', result);
                

                // resolve
                resolve();
            })
            .catch((error: any) => { // catch error and log
                log.error('createNewArticle', error);
                reject(error);
            });
    });
};
