// Require apollo-server
const { ApolloServer } = require('apollo-server')

const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(
      name: String!
      description: String
    ): Photo!
  }
`
// A variable that we will increment for unique ids
var _id = 0

var photos = []

// A data type to store our photos in memory
var photos = []

const resolvers = {
  Query: {
    // return the length of the photos array
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  // Mutation and postPhotos resolver
  Mutation: {
    postPhoto(parent, args) {
      // Create a new photo and generate an id
      var newPhoto = {
        id: _id++,
        ...args
      }
      photos.push(newPhoto)
      // Return the new photo
      return newPhoto
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
