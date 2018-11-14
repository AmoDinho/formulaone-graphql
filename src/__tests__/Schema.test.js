import {
	makeExecutableSchema,
	addMockFunctionsToSchema
} from 'graphql-tools'
import {graphql} from 'graphql'

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
}
`

const schema = makeExecutableSchema({typeDefs})

addMockFunctionsToSchema({schema})

const query = `
 query driverQuery{

     driver{
     id
     name
     }
 }
`

graphql(schema,query).then((results) => console.log('Got Result', results))