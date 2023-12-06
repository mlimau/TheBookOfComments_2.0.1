//const request = require('supertest')//removed since in helper, query.js, data.js assigned
//const graphQLEndpoint = 'http://localhost:5000/graphql'//removed since in helper, query.js, data.js
const { expect } =  require('chai')
const { requestGqL } = require ('../../helper')
const { userCreateQuery} = require ('./queries')
const { arg } = require ('./data')//second arg with faker created, uses here

describe('USER CREATE', () => {
    let userId;
    describe('USER CREATE - POSITIVE', () => {
        it('user creating with correct parameters', (done) => {//6 enter done
            const postData = {//создали переменную для того чтобы внести данные для res
                query: userCreateQuery,//queries.js for response structure Operaion
                variables: arg//data.js - request, input data
            }
             requestGqL(postData)//06 branch with helper for start page helper.js
                .end((err, res) => {//call back function with 2 parameters: if error = null, function goes further to res
                    if (err) return done(err);

                    const respData = res.body.data//5 что придёт response.body помещаем в переменную respData
                    userId = respData.userCreate._id

                    console.log("RESP BODY ===", res.body)//data выйдет сюда используем в следующих тестах

                    //path for arg input in data.js helper faker:
                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)//path from Operation Appolo and expected parameters
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)//path for arg input in data.js helper faker
                    expect(respData.userCreate._id).to.be.a('string')
                    expect(respData.userCreate._id).eq(userId)
                    done()//6
                })
        })
    })
    describe('USER CREATE - NEGATIVE', () => {
        before('User delete all', ()=> {
            User.deleteMany({})
            return done()
        })
        it('user creating with correct parameters', (done) => {
            const postData = {
                query: userCreateQuery,
                variables: arg
            }
            requestGqL(postData)
                .end((err, res) => {
                    if (err) return done(err);

                    const respData = res.body.data
                    userId = respData.userCreate._id

                    console.log("RESP BODY ===", res.body)

                    expect(respData.userCreate.firstName).eq(arg.userInput.firstName)
                    expect(respData.userCreate.lastName).eq(arg.userInput.lastName)
                    expect(respData.userCreate._id).to.be.a('string')
                    expect(respData.userCreate._id).eq(userId)
                    done()//6
                })
        })

    })
})







