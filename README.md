# FanBoost 🏎
This is the backend for FanBoost. It is powered by [GraphQL-Yoga](https://github.com/prisma/graphql-yoga) an Express GraphQL server and [Prisma](https://prisma.io) to interact with a SQL Postgress database. 

## Features

* Prisma Datalayer: Prisma sits inbetween your GraphQL API and database and acts as an ORM.
* GraphQL API: The API is built with GraphQL-Yoga. Which is an Express server that supports GraphQL APIs.
* Real-Time Subscriptions: The app use Websockets to enable real-time interactions with the API. 
* Transactional Emails: Nodemailer and PostMark are used to send transactional emails.
* Authentification: The app  uses Json Web Tokens to help with Authenticating users.

The API supports the following queries:

```feed(
   filter: String, 
   skip: Int, 
   first: Int, 
   orderBy: DriverOrderByInput): Feed!

   driver(
   id: ID!): Driver!
   
    tracks(
    filter: String, 
    skip: Int, 
    first: Int, 
    orderBy: CircuitOrderByInput): Tracks!
    
    circuit(id:ID!): Circuit
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
    
    updateDriver(
    id:ID!,
    name: String!, 
    number: Int!, 
    team: String!, 
    points: Int!, 
    pictureURL: String!, 
    podiums: Int!, 
    championshipWins:Int!, 
    country:String!): Driver!
    
    deleteDriver(id:ID!): Driver
    
    requestReset(email: String!): SuccessMessage
    
    resetPassword(resetToken: String!, password: String!,confirmPassword: String!): User!
    
    deleteUser(id:ID!, password: String!): User!
    
    createCircuit(name: String!,
    country: String!,
    numOfLaps: Int!,
    description: String!,
    raceDistance: Float!,
    circuitLength: Float!,
    lapRecord: Float!,
    address:String!,
    longitude: Float!,
    latitude: Float!,
    flyAway: Boolean!,
    trackMap: String!,
    trackImage: String!): Circuit!
    
    updateCircuit(id: ID!,
    name: String!,
    country: String!,
    numOfLaps: Int!,
    description: String!,
    raceDistance: Float!,
    circuitLength: Float!,
    lapRecord: Float!,
    address:String!,
    longitude: Float!,
    latitude: Float!,
    flyAway: Boolean!,
    trackMap: String!,
    trackImage: String!): Circuit!
    
    deleteCircuit(id: ID!): Circuit!

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

First clone the repo:
```
$ git clone https://github.com/AmoDinho/formulaone-graphql.git
```

Then install the dependancies :

```
 
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



The following resources were used to create this app: 

* [Advanced React](https://github.com/wesbos/Advanced-React)
* [Boilerplate for a Fullstack GraphQL App with React & Prisma](https://github.com/alan345/naperg)
* [How to GraphQL:React-Apollo](https://github.com/howtographql/react-apollo)
* [React-Apollo Docs](https://www.apollographql.com/docs/react/)
* [GraphQL Docs](https://graphql.org/)
