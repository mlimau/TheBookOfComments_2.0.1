const request = require ('supertest')
const { expect } = require('chai')
const graphqlEndPoint = 'http://localhost:5000/graphql'


describe('Positives user tests', () => {
    describe('USER GET BY ID positive', () => {
        let userId
        it('Created user get by ID', (done) => {

    const reqData = {
            "userInput": {
              "firstName": "User1FirstName",
              "lastName": "User1LastName"
              }
            }
    const respData = {
                query: `mutation UserCreate($userInput: UserItems) {
          userCreate(userInput: $userInput) {
            _id
            firstName
            lastName
          }
     }`, variables: reqData
            }

        request(graphqlEndPoint)
           .post('/')
            .send(respData)
            .expect(200)
            .end((err, res) => {
                if(err) return done(err)

     const responseData = res.body.data
     userId = responseData.userCreate._id
     console.log(responseData)
                console.log("USER ID ===",responseData.userCreate._id)
                done()
            })
        })//above user was created without assertions

        it('Get user by ID', (done) => {
            const requestData = {
               userId: userId
            }
            const responseData = {
                query: `query UserGetById($userId: ID!) {
                userGetById(userId: $userId) {
                    _id
                    firstName
                    lastName
                }
            }`,
                variables: requestData
            }

            request(graphqlEndPoint)
                .post('/')
                .send(responseData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
                    const responseData = res.body.data
                    console.log("RESP DATA USER GET BY ID ===", responseData)
                    expect(responseData.userGetById._id).eq(userId)//path from Apollo Operation - res.body.data+path
                    //expect(responseData.userGetById.firstName).eq(arq.userInput.firstName)
                    done()
                })
        })

    })
describe('User get by Id negative', () => {

})
})