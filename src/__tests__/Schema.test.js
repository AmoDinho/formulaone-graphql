import {makeExecutableSchema,addMockFunctionsToSchema} from 'graphql-tools'
import {graphql} from 'graphql'
import {find,filter} from 'lodash';

const typeDefs = `
  type Driver {
    id: ID! @unique
    createdAt: DateTime!
    number: Int
    name: String!
    team: String!
    points: Int!
    pictureURL: String!
    country: String!
    podiums: Int!
    championshipWins:Int!
    postedBy:User
    boosts: [FanBoost!]! @relation(name:"FanBoost",onDelete:CASCADE)

    type Query {
        drivers: [Driver]
        driver(id:String!): Driver
    }

}`

const resolvers = {
    Query: {
        drivers: () => drivers,
        driver: (_, {id}) => find(drivers,{id:id})

    },
    Driver: {
        drivers: driver => filter(drivers, {driverId: driver.id})
    }
}

const schema = makeExecutableSchema({typeDefs, resolvers})

addMockFunctionsToSchema({schema})

const drivers = [
    {id:'1',createdAt:'2018-09-09',number:2,name:'Giggs',team:'Grimey',points:3,pictureURL:'png.url.cdn',country: 'Britian',podiums: 3,championshipWins:2,postedBy: 'Skepta',boosts:2}
]

graphql(schema).then((results) => console.log('Got Result', results))