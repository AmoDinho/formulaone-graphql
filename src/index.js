const {GraphQLServer} = require('graphql-yoga')

const typeDefs = `
type Query {
    info: String!
    feed: [Driver]!
}

type Driver {
    id: ID!
    name: String!
    team: String!
    points: Int!
}
`
let drivers = [{
    id: 'driver-0',
    name: 'Simon Tabane',
    team: 'Aston Martin Red Bull',
    points: 20
}]

const resolvers = {
    Query:{
        info: () => `This is the API for the Forumala One App`,
        feed: () => drivers,
    },

    Driver: {
        id: (root) => root.id,
        name: (root) => root.name,
        team: (root) => root.team,
        points: (root) => root.points,
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))