import * as config from 'config';
import * as restify from 'restify';
import { logger as log } from './logger';

export const server = restify.createServer();

// Use the config file to get the server name and port
const serverName = config.get('Server.name');
const port = config.get('Server.port');

server.listen(port, () => log.info(`${serverName} started and listening on port ${port}`));