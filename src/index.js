const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const mongoose = require('mongoose');
const verifyToken = require('./utils/verifyToken');

mongoose.connect('mongodb://netflix:netflix@cluster0-shard-00-00-clh7g.mongodb.net:27017,cluster0-shard-00-01-clh7g.mongodb.net:27017,cluster0-shard-00-02-clh7g.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => console.log('Fallo al conectar MongoDB'));
db.on('connected', () => console.log('Conectado a la base de datos'));

const resolvers = {
    Query,
    Mutation
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: async context => ({
        ...context,
        user: await verifyToken(context.request)
    })
})

const options = {
    port: 8000,
    endpoint: '/graphql',
    playground: '/playground'
};

server.start(options, ({port}) => console.log(`Server started at port ${port}`));
