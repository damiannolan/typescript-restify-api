import * as config from 'config';
import * as fb from 'fb';
import { Facebook, FacebookApiException } from 'fb';
import * as jwt from 'jsonwebtoken';
import { logger as log } from '../../../logger';
import * as restify from 'restify';
import { UserProfileRequest } from '../../../model/user-profile-request';
import * as URLSafeBase64  from 'urlsafe-base64';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';

import { createUserIfNotExists } from '../../../db/neo4j/commands/create-user-if-not-exists';

export const bootstrap = (server: restify.Server) => {

  server.get('/auth/facebook/callback', (req: restify.Request, res: restify.Response) => {
    log.info('Facebook Response: ', req.params);
    
    // !!! response doens't really matter as its going to the pop up browser window
    res.header('Location', 'http://localhost:4200/about');
    res.send(302);
  });

  // post to exchange fb token for jwt
  server.post('/auth/facebook/token', [fbVerify, createUser, issueToken]);
};

const fbVerify = (req: UserProfileRequest, res: restify.Response, next: restify.Next): void => {
  log.trace('fbVerify', req.body);

  const fb = new Facebook({
    appId: config.get('OAuthProviders.Facebook.client_id'),
    appSecret: config.get('OAuthProviders.Facebook.client_secret'),
    version: config.get('OAuthProviders.Facebook.apiVersion'),
  });

  fb.api('me', {
    access_token: req.body.accessToken,
    fields: ['first_name', 'last_name', 'email', 'gender', 'picture.type(large)'],
  }, (fbApiResp: any) => {
    log.debug('facebook.api response ', fbApiResp);

    if (fbApiResp.error) {
      return res.send(503, { reason: 'Failed to access Facebook API' });
    }

    req.userProfile = {
      email: fbApiResp.email,
      firstName: fbApiResp.first_name,
      lastName: fbApiResp.last_name,
      pictureUrl: fbApiResp.picture.data.url,
      id: fbApiResp.id
    };

    next();
    //createOrUpdateUser(fbApiResp);
    // req.userProfile = UserProfile.fromFacebookProfile(fbApiResp as IFacebookProfile);
    
  });

};

const createUser = async (req: UserProfileRequest, res: restify.Response, next: restify.Next) => {
    try {
      const userProfile = await createUserIfNotExists(req.userProfile);
      next();
    } catch(err) {
      log.error('Create User Failed', err);
    }
};

const issueToken = (req: UserProfileRequest, res: restify.Response, next: restify.Next) => {
    const payload = req.userProfile;

    const secret = config.get('Server.authSecret') as string;

    //payload.pictureUrl = URLSafeBase64.encode(buff);
    //payload.pictureUrl = base64.encode(utf8.encode(payload.pictureUrl));
    payload.pictureUrl = base64.encode(payload.pictureUrl);

    const tokenResponse = {
      accessToken: jwt.sign(payload, secret, { subject: req.userProfile.id }),
      expiresIn: 9600,
      tokenType: 'Bearer',
    };

    res.send(200, tokenResponse);
};
