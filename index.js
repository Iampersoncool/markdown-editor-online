const Fastify = require('fastify').default;
const path = require('path');
const eta = require('eta');

const fastifyStatic = require('@fastify/static');
const fastifyCompression = require('@fastify/compress');
const fastifyView = require('@fastify/view');

const app = Fastify();
const port = process.env.PORT || 3000;

eta.configure({
  useWith: true,
  cache: true,
});

app.register(fastifyView, {
  engine: {
    eta,
  },
});

app.register(fastifyCompression, {
  global: true,
});

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/static',
});

app.get('/', (request, reply) => {
  return reply.view('./views/index.eta');
});

app
  .listen({ port })
  .then((address) => console.log(`app listening on ${address}`))
  .catch((err) => {
    throw Error(`Error listening to port: ${err}`);
  });
