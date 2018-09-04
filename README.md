# formulaone-graphql
This is a fullstack GraphQL Formula One app

Once you have deployed your Prisma Service head over to the http endpoint and add your prisma token. 

## Commands



Create a driver:

`mutation{
  createDriver(data:{
    name: "Rakim Meyer"
    team: "HAAS"
    points: 200
  }){
    id
  }
}
`