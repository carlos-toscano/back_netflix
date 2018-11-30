const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const { MONGO_URI, MONGO_URI_TEST } = require('./const');
const mongoose = require('mongoose');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const verifyToken = require('./utils/verifyToken');
const mongoUri = process.env.NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;

const typeDefs = importSchema('./src/schema.graphql');

mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => console.log('Fallo al conectar MongoDB'));
db.on('connected', () => console.log('Conectado a la base de datos'));

const resolvers = {
    Query,
    Mutation
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new GraphQLServer({
    schema,
    context: async context => ({
        ...context,
        user: await verifyToken(context.request)
    })
});

const options = {
    port: process.env.PORT || 8000,
    endpoint: '/graphql',
    playground: '/playground',
    cors: {
        credentials: true,
        origin: '*'
    },
    methods: ['GET','POST','PUT','DELETE','OPTIONS']
};

server.start(options, ({ port }) => console.log(`Server started at port ${port}`));

module.exports = { schema };
