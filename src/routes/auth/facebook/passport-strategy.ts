import * as config from 'config';
import { Profile, Strategy as FacebookStrategy } from 'passport-facebook';
import * as passport from 'passport-restify';

//import { createOrUpdateUserAccountAsync } from '../../../db';
import { logger as log } from '../../../logger';
//import { IFacebookProfile, IUserProfile, UserProfile } from '../../../model';

export const init = (): void => {
  log.trace('init PassportFacebookStrategy');

  const fbConfig = config.get('OAuthProviders.Facebook') as any;

  /* Setup a strategy to handle the redirection. Basically after OAuth
   * done the callback function below will be called from within Passport with
   * the Passport version of a Facebook profile. The route that services the
   * "callbackURL" i.e "cb" will be invoked passing our IUserProfile that we map from
   * the PassportFacebook profile.
   **/
  passport.use(new FacebookStrategy({
    callbackURL: fbConfig.redirect_uri,
    clientID: fbConfig.client_id,
    clientSecret: fbConfig.client_secret,
    profileFields: ['id', 'first_name', 'last_name', 'email', 'gender'],
  }, (accessToken: string, refreshToken: string, profile: any, cb: cb) => {
    log.debug(`Passport FacebookStrategy returned profile`, profile);

    //const userProfile = UserProfile.fromPassportFacebookProfile(profile);

    cb(null, profile);
  }));
};

type cb = (error: any, user?: any, info?: any) => void;