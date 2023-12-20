const { expect } = require ('chai')
const {requestGqL} = require('../../helper')
const {userCreateQuery, userDeleteByIdM, userDeleteByIdQ, errorMassage} = require('./queries')
const {arg} = require('./data')
const User = require('../User')
const generatedId = require ('../../../utils/generateId')

describe('USER DELETE BY ID', () => {
   describe('USER DELETE BY ID positive', () => {
        let userId
        it('User create', (done) => {
            const createdUser =  {
                query: userCreateQuery,
                variables: arg
            }
        requestGqL(createdUser)//также вставили тот же Helper и внесли в него наши параметры to open page
        .expect(200)
        .end((err, res) => {
            if(err) return done(err)
            const resData = res.body.data
            userId = resData. userCreate._id
            console.log("USER ID ===", userId)
            console.log("RESPONSE ===", resData)
            done()
        })

   })

        it('Delete created User by Id', (done) => {
            const delUser = {
                 userId: userId
            }
            const responseOfDelete = {
                query: userDeleteByIdM ,
                variables: delUser
            }
            requestGqL(responseOfDelete)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                const respData = res.body.data
                console.log(respData)
                expect(respData.userDeleteById).to.eq(true)
                    expect()
                done()
                })

    })

       it('Get deleted User by Id', (done) => {
           const delUser = {
               userId: userId
           }
           const responseOfDelete = {
               query: userDeleteByIdM ,
               variables: delUser
           }
           requestGqL(responseOfDelete)
               .expect(200)
               .end((err, res) => {
                   if(err) return done(err)

                  const respData = res.body
                   console.log(respData)
                   expect(respData.data.userDeleteById).to.eq(false)
                   done()
               })

       })
        })

    describe('USER DELETE BY ID negative', () => {
        it('User delete by fake Id', (done) => {
            const delUser = {
                userId: generatedId()
            }
            const postData = {
                query: userDeleteByIdM,
                variables: delUser
            }
            requestGqL(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done (err)

                    const resData = res.body.data
                    console.log("RESBODY ===", resData)
                    done()
                    expect(resData.userDeleteById).to.equal(false)
            })
        })

        it('User delete by empty string Id', (done) => {
            const wrongArg = {
                userId: ''
            }
            const postData = {
                query: userDeleteByIdM,
                variables: wrongArg
            }
            requestGqL(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                    const resData = res.body
                    console.log("RESBODY EMPTY INPUT", resData)
            expect(resData.errors[0].message).to.equal(errorMassage[6])
            expect(resData.data.userDeleteById).to.equal(null)
                    done()

                })
        })
    })
})








