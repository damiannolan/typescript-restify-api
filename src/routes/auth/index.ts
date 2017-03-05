import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as restify from 'restify';
import { logger as log } from '../../logger';
import { bootstrap as bootstrapFacebook } from './facebook';

export const bootstrap = (server: restify.Server) : void => {
  bootstrapFacebook(server);
};