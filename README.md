# formulaone-graphql
This is the backend for the  fullstack GraphQL Formula One app. It uses Prisma as the Database layer.

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

In one terminal run :

```
$ yarn run server

```

This will start the appilcation server. 

Then to start the database server run:

```
$ yarn run playground

```