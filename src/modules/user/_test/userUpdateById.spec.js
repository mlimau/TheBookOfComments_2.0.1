const request = require('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER UPDATE BY ID',  () => {
  describe('USER UPDATE BY ID - POSITIVE',  () => {
    let userId = null;
    it('user create',  (done) => {
      const arg = {
        userInput: {
          firstName: 'firstName',
          lastName: 'lastName'
        }
      }
      const postData = {
        query: `mutation UserCreate($userInput: UserItems) {
  userCreate(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
        variables: arg
      }
      request(graphQLEndpoint)
          .post('/')
          .send(postData)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            const respData = res.body.data;
            userId = res.body.data.userCreate._id
            console.log("RESP BODY ===", respData)
            console.log("RESP ID ===", userId)
            // expect(respData.userCreate.firstName).eq('firstName')
            // expect(respData.userCreate.lastName).eq('lastName')
            done()
          })
    })
    it('user update by id',  (done) => {
      const arg = {
        userInput: {
          _id: userId,
          firstName: "Denis",
          lastName: "Nazarenko"
        }
      }
      const postData = {
        query: `mutation UserUpdateById($userInput: UserFields) {
  userUpdateById(userInput: $userInput) {
    _id
    firstName
    lastName
  }
}`,
        variables: arg
      }
      request(graphQLEndpoint)
          .post('/')
          .send(postData)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            const respData = res.body.data;

            console.log("RESP BODY ===", respData)
            expect(respData.userGetById._id).eq(userId)
            done()
          })
    })
  })
  describe('USER UPDATE BY ID - NEGATIVE',  () => {

  })
})