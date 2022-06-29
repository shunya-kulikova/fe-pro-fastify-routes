import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const res = request.body.toUpperCase();
  if (res.includes('FUCK')) return reply.status(403).send('unresolved');
  else return reply.send(res);
})

fastify.post('/lowercase', (request, reply) => {
  const res = request.body.toLowerCase();
  if (res.includes('fuck')) return reply.status(403).send('unresolved');
  else return reply.send(res);
})


fastify.get('/user/:id', (request, reply) => {
  const id = request.params.id;
  if (users[id]) return reply.send(users[id]);
  else return reply.status(400).send('User not exist');
})


fastify.get('/users', (request, reply) => {
  const { filter, value } = request.query;
  let arrOfUsers = Object.values(users);
  if (request.query ) {
    arrOfUsers = arrOfUsers.filter((user) => {
      return user[filter] == value;
    })
  }

  return reply.send(arrOfUsers);

})

export default fastify;
