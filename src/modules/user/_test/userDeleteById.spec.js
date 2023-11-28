const request = require ('supertest')
const { expect } = require('chai')
const graphqlEndPoint = 'http://localhost:5000/graphql'


describe('Positives user tests', () => {
    describe('USER GET BY ID', () => {

        let userId = null
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
                    if (err) return done(err)

                    const responseData = res.body.data
                    userId = responseData.userCreate._id
                    console.log(responseData)
                    console.log("USER ID ===", responseData.userCreate._id)
                    done()
                })
        })//above user was created without assertions


        it('Update user by ID', (done) => {

            const arq = {
                "userInput": {
                    "firstName": "UpdateData"
                }
            }
            const resBody = {
                query: `mutation UserDeleteById($userInput: UserFields) {
                 userUpdateById(userInput: $userInput) {
                  _id
                  firstName
                  lastName
                  }
               }`,
                variables: arq
            }

            request(graphqlEndPoint)
                .post('/')
                .send(resBody)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const resBody = res.body.data
                    console.log(resBody)
                    done()
                })
        })

    })
})
