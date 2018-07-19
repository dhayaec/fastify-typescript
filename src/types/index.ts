import * as fastify from 'fastify';
import * as http from 'http';

export type Request = fastify.FastifyRequest<http.IncomingMessage>;
export type Reply = fastify.FastifyReply<http.ServerResponse>;
