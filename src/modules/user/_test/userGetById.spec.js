const { expect } = require ('chai')
const { requestGqL } = require ('../../helper')
const { userCreateQuery, userGetById} = require ('./queries')
const { arg } = require ('./data')

describe('Positives user tests', () => {
    describe('USER GET BY ID positive', () => {
        let userId

    it('Created user get by ID', (done) => {

        const respData = {
                query: userCreateQuery,
                variables: arg
            }
        requestGqL(respData)
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
               userId: userId//зашит в переменную в начале теста
            }
            const resData = {
                query: userGetById,//in queries.js
                variables: requestData
            }

           requestGqL(resData)
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