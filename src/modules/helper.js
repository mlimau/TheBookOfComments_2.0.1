const request = require ('supertest')
const graphQLEndpoint = 'http://localhost:5000/graphql'

function requestGqL (postData) {
   return request(graphQLEndpoint)//1 call our cont with endpoint, open page
       .post('/')
       .send(postData)
}

module.exports = { requestGqL}

