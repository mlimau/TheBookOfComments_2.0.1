const request = require ('supertest')
const { expect } = require('chai')
const graphqlEndPoint = 'http://localhost:5000/graphql'


describe('Positives user tests', () => {
    describe('USER UPDATE by ID', () => {

        let userId = null
        it('Created user', (done) => {

            const reqData = {
                "userInput": {
                    firstName: "User1FirstName",
                    lastName: "User1LastName"
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
            done()
                })
        })//above user was created without assertions
        it('Update user by ID', (done) => {
            const arq = {
                "userInput": {
                    firstName: "UpdateData",
                    lastName: "Mocka",
                    _id: userId
                }
            }
            const resBody = {
                query: `mutation UserUpdateById($userInput: UserFields) {
                    userUpdateById(userInput: $userInput) {
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

                    const responseData = res.body.data
                    console.log("UPDATED USER ===", responseData.userUpdateById)

                    expect(responseData.userUpdateById.firstName).eq('"UpdateData"')
                    done()
                })
        })

    })
})
