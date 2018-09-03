const {GraphQLServer} = require('graphql-yoga')


let drivers = [{
    id: 'driver-0',
    name: 'Simon Tabane',
    team: 'Aston Martin Red Bull',
    points: 20
}]

let idCount = drivers.length

const resolvers = {
    Query:{
        info: () => `This is the API for the Forumala One App`,
        feed: () => drivers,
    },
    
    Mutation:{
        driver: (root, args) => {
            const driver ={
                id: `driver-${idCount++}`,
                name: args.name,
                team: args.team,
                points: args.points,
            }
            drivers.push(driver)
            return driver
        }
       
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))