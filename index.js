// Require apollo-server
const { ApolloServer } = require('apollo-server')

const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(
      name: String!
      description: String
    ): Boolean!
  }
`
// A data type to store our photos in memory
var photos = []

const resolvers = {
  Query: {

    // return the length of the photos array
    totalPhotos: () => photos.length
  },

  // Mutation and postPhotos resolver
  Mutation: {
    postPhoto(parent, args) {
      photos.push(args)
      return true
    }
  }
}

// Create a new instance of the server
// Send it an object with typeDefs (the schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// Call listen on the server to launch the web server
server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))
