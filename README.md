# formulaone-graphql
This is a fullstack GraphQL Formula One app


## Commands

To run the server : `node src/index.js` it should be live on http://localhost:4000/ with the GraphQL playground IDE open.

Then type in the following query:

`  
query{
    info
} `

Now that you have updated the Schema you can enter the following Query:

`query{
  feed{
    id
    name
    team
    points
  }
}
`

Now you run your mutation: 

`mutation{
  driver(
    name:"Ruby Ella"
    team:"Force India"
    points: 40
  ){
    id
  }
}`