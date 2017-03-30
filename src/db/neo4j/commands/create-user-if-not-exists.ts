import { driver } from '../../neo4j';
import { logger as log } from '../../../logger';
import { UserProfile } from '../../../model/user-profile';

export const createUserIfNotExists = (userProfile: UserProfile): Promise<UserProfile> => {
    return new Promise((resolve, reject) => {
        // Create a new session using the driver
        const session = driver.session();

        // Use session.run() to attempt to match an existing user
        session
            .run('match (user:User) where user.email = {email} RETURN user', { email: userProfile.email })
            .then((result: any) => {
                // log the existing user
                log.debug('match returned', result);

                // if the records < 1 then create a new user
                if (result.records.length < 1) { 
                    // Use session.run() to create a new User node in the db
                    session
                        .run('create (user:User { email: {email}, firstName: {firstName}, lastName: {lastName}, pictureUrl: { pictureUrl }})',
                        { email: userProfile.email, firstName: userProfile.firstName, lastName: userProfile.lastName, pictureUrl: userProfile.pictureUrl })
                        .then((result: any) => {
                            log.trace(result);
                            session.close();
                            resolve(userProfile);
                        })
                        .catch((error: any) => { // catch error and log
                            log.error('createUserIfNotExists - cypher create failed', error);
                        });
                }
                // resolve the promise using the userProfile
                resolve(userProfile);
            })
            .catch((error: any) => { // catch error and log
                log.error('createUserIfNotExists', error);
            });
    });
};
