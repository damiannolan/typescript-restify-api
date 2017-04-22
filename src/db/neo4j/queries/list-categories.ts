import { driver } from '../../neo4j';
import { logger as log } from '../../../logger';

export const getListCategories = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
    
        // Create a new session using the driver
        const session = driver.session();

        // Use session.run() to match categories
        session
            .run('MATCH (c:Category) RETURN c.name as category')
            .then((result: any) => {
                // log the result
                log.debug('match returned', result);

                let categories : string[] = [];
                
                result.records.forEach((record:any) => {                    
                    // Retrieve category based on 'category' field key
                    let category = record.get('category');
                    // Push to categories array
                    categories.push(category);
                });

                // resolve the promise with categories
                resolve(categories);
            })
            .catch((error: any) => { // catch error and log
                log.error('getListCategories', error);
                reject(error);
            });
    });
};
