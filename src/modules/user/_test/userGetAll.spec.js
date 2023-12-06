const request = require('supertest')
const { expect } = require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER GET ALL',  () => {
  describe('USER GET ALL - POSITIVE',  () => {
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
            console.log("RESP BODY ===", respData)
            expect(respData.userCreate.firstName).eq('firstName')
            expect(respData.userCreate.lastName).eq('lastName')
            done()
          })
    })
    it('user get all',  (done) => {
      const arg = {
        amount: 5
      }
      const postData = {
        query: `query UsersGetAll($amount: Int) {
  usersGetAll(amount: $amount) {
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
            console.log("RESP BODY USER GET ALL ===", respData)
            expect(respData.usersGetAll.length).eq(arg.amount)
            done()
          })
    })
  })
  describe('USER GET ALL - NEGATIVE',  () => {

  })
})