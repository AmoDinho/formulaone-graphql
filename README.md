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

Make the following subscription: 

```
subscription{
  newDriver{
    node{
      id
      name
      team
      points
      pictureURL
      podiums
      championshipWins
      postedBy{
        id
        name
        email
      }
    }
  }
}
```

create another mutation to test that the subscription works:

```
mutation{
  driver(
    name: "Daniel Ricciardo"
    team: "Red Bull Racing"
    points: 934
    pictureURL: "https://www.formula1.com/content/fom-website/en/drivers/daniel-ricciardo/_jcr_content/image.img.1024.medium.jpg/1536135061859.jpg"
    podiums: 29
    championshipWins: 0
    
  ){
    id
  }
}


```