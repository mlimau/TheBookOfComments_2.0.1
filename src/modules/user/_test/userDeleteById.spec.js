const request = require ('supertest')
const { expect } = require('chai')
const graphqlEndPoint = 'http://localhost:5000/graphql'


describe('Positives user tests', () => {
    describe('USER GET BY ID', () => {
        let userId
        it('Create user', (done) => {

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
                    console.log("USER ID ===", responseData.userCreate._id)
                    done()
                })
        })//above user was created without assertions


        it('Delete user by ID', (done) => {
            const arq = {
                userId: userId
            }

            const resBody = {
                query: `mutation UserDeleteById($userId: ID!) {
                        userDeleteById(userId: $userId)
       
}`,
             variables: arq
            }
            request(graphqlEndPoint)
                .post('/')
                .send(resBody)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const respon = res.body.data
                    console.log("USER DELETE ===", respon)
                    expect(respon.userDeleteById).to.eq(true)
                    done()
                })
        })

    })
})
