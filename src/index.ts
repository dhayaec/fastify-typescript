import { Reply, Request } from './types/index';
import * as cors from 'cors';
import * as fastify from 'fastify';
import { createReadStream } from 'fs';
import { AddressInfo } from 'net';

const port = 3000;

const server = fastify();

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
};

function getHelloHandler(req: Request, reply: Reply) {
  reply.header('Content-Type', 'application/json').code(200);
  reply.send({ hello: 'world' });
}

function getStreamHandler(req: Request, reply: Reply) {
  const stream = createReadStream(process.cwd() + '/package.json', 'utf8');
  reply
    .code(200)
    .type('application/json')
    .send(stream);
}

server.use(cors() as any);

server.get('/', opts, getHelloHandler);

server.get('/stream', getStreamHandler);

server.listen(port, err => {
  if (err) {
    throw err;
  }
  const { port } = server.server.address() as AddressInfo;

  console.log(`listening ${port}`);
});
