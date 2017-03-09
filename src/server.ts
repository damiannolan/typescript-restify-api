import * as config from 'config';
import * as restify from 'restify';
import { logger as log } from './logger';
import { bootstrap } from './routes';

export const server = restify.createServer();

bootstrap(server);

// Use the config file to get the server name and port
const serverName = config.get('Server.name');
const port = config.get('Server.port');

server.listen(port, () => log.info(`${serverName} started and listening on port ${port}`));
