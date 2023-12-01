const request = require ('supertest')
const { expect } = require ('chai')
const graphQlEndPoint = 'http://localhost:5000/graphql'


describe('USER DELETE BY ID', () => {
    describe('USER DELETE BY ID positive', () => {
        let userId
        it('User create', (done) => {

            const arq =  {//2 с Appolo Variables параметры для request wothout quotes
                "userInput": {
                    firstName: 'UserDeleteFN',//type names for tests, in Appolo were null
                    lastName: 'UserDeleteLN'
                }
            }

            const createdUser =  {
                query: `mutation UserCreate($userInput: UserItems) {
            userCreate(userInput: $userInput) {
             _id
            firstName
            lastName
  }
}`, variables: arq
            }
    request(graphQlEndPoint)
        .post('/')
        .send(createdUser)
        .expect(200)
        .end((err, res) => {
            if(err) return done(err)

            const responData = res.body.data
            userId = responData. userCreate._id
            console.log(" USER ID ===", userId)
            console.log("RESPONSE ===", responData)
            done()
        })

        })

        it('User delete', (done) => {

            const arq = {
                 userId: userId
            }
            const responseOfDelete = {
                query: `
                mutation UserDeleteById($userId: ID!) {
                userDeleteById(userId: $userId)
                }
            `,
                variables: arq
            }

            request(graphQlEndPoint)
                .post('/')
                .send(responseOfDelete)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                const respData = res.body.data
                console.log(respData)

                expect(respData.userDeleteById).to.eq(true)
                done()
                })

    })
        })




    describe('USER DELETE BY ID negative', () => {

    })
})


