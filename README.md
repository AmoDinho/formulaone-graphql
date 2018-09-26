# formulaone-graphql
This is a fullstack GraphQL Formula One app

Once you have deployed your Prisma Service head over to the http endpoint and add your prisma token. 

## Instructions

In this part we needed to configure the resolvers to use Prisma Bindings. 

We created an Application layer and databaser layer.

However we have a problem when running ```prisma deploy```. Nothing gets generated. So you need run each of the deploy hooks via the terminal.

Once that is done in one terminal run: ```node src/index.js```

then in the another one run: ```graphql playground```

------------------------------



token :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamxydm9qcGE4eXJ6MGIxMmlqbnk2cHdoIiwiaWF0IjoxNTM2MzE3MzQ1fQ.tR67_m5ggWqwJO5G9UqmIx9YVch74RaTIqYQ4Yt_j1o"

Make the following queries for sorting, filtering and pagination:

```
{
  feed(filter:"Kimi"){
    id
    team
    name
  }
}
``` 


```
{
  feed(
    first: 1
    skip: 1
  ){
    id
    name
    team
  }
}
```


```
{
  feed(orderBy: createdAt_ASC){
   id
    name
    team
  }
}
```


```
```

