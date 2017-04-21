import { driver } from '../../neo4j';
import { logger as log } from '../../../logger';

export const getListCategories = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
    
        // Create a new session using the driver
        const session = driver.session();

        // Use session.run() to attempt to match an existing user
        session
            .run('MATCH (c:Category) RETURN c.name as category')
            .then((result: any) => {
                // log the result
                log.debug('match returned', result);

                let categories : string[];
                categories = [];
                
                result.records.forEach((record:any) => {                    
                    //log.debug(record.get('category'));
                    let category = record.get('category');
                    log.debug(category);
                    categories.push(category);
                });

                // resolve the promise using the userProfile
                resolve(categories);
            })
            .catch((error: any) => { // catch error and log
                log.error('getListCategories', error);
                reject(error);
            });
    });
};
