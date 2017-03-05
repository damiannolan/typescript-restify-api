import * as config from 'config';
import { Facebook, FacebookApiException } from 'fb';
import * as passport from 'passport-restify';
import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import * as fb from 'fb';

import { logger as log } from '../../../logger';

import { init as initPassportStrategy } from './passport-strategy';

export const bootstrap = (server: restify.Server) => {

  initPassportStrategy();

  server.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

  //server.get('/auth/facebook/callback', [passportAuth, createAccount, issueTokenResponse]);

  server.get('/auth/facebook/callback', (req: restify.Request, res: restify.Response) => {
    log.info('got response', req.params);
    res.header('Location', 'http://localhost:4200/about');
    res.send(302);
  });

  //post for exchange fb token for jwt
  server.post('/auth/facebook/token', fbVerify);
}

const fbVerify = (req: restify.Request, res: restify.Response, next: restify.Next): void => {
  log.trace('fbVerify', req.body);

  const fb = new Facebook({
    appId: config.get('OAuthProviders.Facebook.client_id'),
    appSecret: config.get('OAuthProviders.Facebook.client_secret'),
    version: config.get('OAuthProviders.Facebook.apiVersion'),
  });

  fb.api('/me', {
    access_token: req.body.accessToken,
    fields: ['first_name', 'last_name', 'email', 'gender', 'picture.type(large)'],
  }, (fbApiResp: any) => {
    log.debug('facebook.api response ', fbApiResp);

    if (fbApiResp.error) {
      return res.send(503, { reason: 'Failed to access Facebook API' });
    }

    //req.userProfile = UserProfile.fromFacebookProfile(fbApiResp as IFacebookProfile);
    const payload = {
      firstName: fbApiResp.first_name,
      lastName: fbApiResp.last_name,
      email: fbApiResp.email,
      pictureUrl: fbApiResp.picture.data.url,
    };

    const secret = config.get('Server.authSecret') as string;

    const tokenResponse = {
      accessToken: jwt.sign(payload, secret, { subject: fbApiResp.id }),
      tokenType: 'Bearer',
      expiresIn: 9600,
    };

    res.send(200, tokenResponse);
  });

};

