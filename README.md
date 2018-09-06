# formulaone-graphql
This is a fullstack GraphQL Formula One app

Once you have deployed your Prisma Service head over to the http endpoint and add your prisma token. 

## Instructions

In this part we needed to configure the resolvers to use Prisma Bindings. 

We created an Application layer and databaser layer.

However we have a problem when running ```prisma deploy```. Nothing gets generated. So you need run each of the deploy hooks via the terminal.

Once that is done in one terminal run: ```node src/index.js```

then in the another one run: ```graphql playground```