const {GraphQLServer} = require('graphql-yoga')
const {Prisma} = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')
require('dotenv').config({ path: '.env' });

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed

}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000


const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://fanboost-1e87623432.herokuapp.com/fanBoost/dev' ,           
            secret: process.env.PRISMA_SECRET,
            debug: process.env.NODE_ENV==="development" ? true:false,
        }),
    }),

})

server.start({port: PORT}, () => console.log(`Server is running on http://localhost:${PORT}`))