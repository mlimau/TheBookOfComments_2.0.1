const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const PORT = +process.env.PORT || 5000
const MONGODB = "mongodb+srv://student:studentAa123@cluster0.uia968n.mongodb.net/?retryWrites=true&w=majority"

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers
})
mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB Connection successful");
    return server.listen(PORT)
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
