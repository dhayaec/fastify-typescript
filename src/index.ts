import * as fastify from 'fastify';
import * as cors from 'cors';
import { createReadStream } from 'fs';
import * as http from 'http';

const server = fastify();

const hello = () => {
  const d = 4;
  const a = 6;
  const c = a + d;
  console.log('called');
  return c;
};

hello();

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

function getHelloHandler(
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>
) {
  reply.header('Content-Type', 'application/json').code(200);
  reply.send({ hello: 'world' });
}

function getStreamHandler(
  req: fastify.FastifyRequest<http.IncomingMessage>,
  reply: fastify.FastifyReply<http.ServerResponse>
) {
  const stream = createReadStream(
    process.cwd() + '/examples/plugin.js',
    'utf8'
  );
  reply.code(200).send(stream);
}

server.use(cors() as any);
server.get('/', opts, getHelloHandler);
server.get('/stream', getStreamHandler);

server.listen(3000, err => {
  if (err) throw err;
  console.log(`on ${server.server.address()}`);
});
