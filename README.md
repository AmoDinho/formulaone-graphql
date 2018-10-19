# Formula One App
This is the backend for a fullstack GraphQL Formula One app. It uses Prisma as the Database layer.

The API supports the following queries:

```feed(
   filter: String, 
   skip: Int, 
   first: Int, 
   orderBy: DriverOrderByInput): Feed!

   driver(
   id: ID!): Driver!
   ```


The API supports the following mutations:

```    
    driver(
    name: String!, 
    team: String!, 
    points: Int!, 
    pictureURL: String!, 
    podiums: Int!, 
    championshipWins:Int!, 
    country:String!): Driver!
    
    signup(
    email: String!,
    password:String!,
    name:String!): AuthPayload
    
    login(
    email: String!, 
    password: String!): AuthPayload
    
    boost(
    driverId: ID!): FanBoost

```



You can jump over to the front-end repo [here](https://github.com/AmoDinho/formulaone-graphql-client).

This project uses yarn which can be downloaded from [here](https://yarnpkg.com/en/).


## App Structure
```
├── Server
   ├── Database
   ├── src
      ├── generated
      ├── resolvers
      ├── index.js
      ├── schema.graphql
      ├── utils.js
   ├── .graphqlconfig.yml

```
 

## Setup Instructions


First install the dependancies :

```
#yarn 
$ yarn install


```


In one terminal run :

```
$ yarn run server

```

This will start the appilcation server. 

Then to start the database server run:

```
$ yarn run playground

```

Playground should open on `localhost://3000`

Make sure you start the backend server first before the front-end repo. Then follow the commands and make sure it runs through `localhost://3001`.
