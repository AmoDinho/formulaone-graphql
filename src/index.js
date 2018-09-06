const {GraphQLServer} = require('graphql-yoga')
const {Prisma} = require('prisma-binding')


const resolvers = {
    Query:{
        info: () => `This is the API for the Forumala One App`,
        feed: (root, args, context, info) => {
            return context.db.query.drivers({}, info)
        } ,
    },
    
    Mutation:{
       driver: (root, args, context, info) =>{
           return context.db.mutation.createDriver({
               data:{
                   name: args.name,
                   team: args.team,
                   points: args.points,
               },
           }, info)
       },

       
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-volcanoking-719/formulaone-graphql/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),

})

server.start(() => console.log(`Server is running on http://localhost:4000`))