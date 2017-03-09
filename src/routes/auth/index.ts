import { bootstrap as bootstrapFacebook } from './facebook';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { logger as log } from '../../logger';
import * as restify from 'restify';

export const bootstrap = (server: restify.Server) : void => {
  bootstrapFacebook(server);
};
