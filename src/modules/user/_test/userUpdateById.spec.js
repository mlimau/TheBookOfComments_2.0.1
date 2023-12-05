const request = require ('supertest')
const { expect } = require('chai')
const {requestGqL} = require('../../helper')
const { userCreateQuery, userUpdateById} = require('./queries')



describe('Positives user tests', () => {
    describe('USER UPDATE by ID', () => {
        let userId
        let userToUpdate = {
            userInput: {
                firstName: "ToUpdateFirstName",
                lastName: "ToUpdateLastName"
            }
        }
        it('Created user', (done) => {
           const respData = {
                query: userCreateQuery,
                variables: userToUpdate
            }
        requestGqL(respData)
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
                userInput: {
                    _id: userId,
                    firstName: "Ivan1",
                    lastName: "Mockach"
                }
            }
            const resBody = {
                query: userUpdateById,
                variables: arq
            }
            requestGqL(resBody)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)

                    const updatedData = res.body.data
                    console.log("UPDATED USER ===", updatedData)

                    expect(updatedData.userUpdateById.firstName).eq(arq.userInput.firstName)
                    expect(updatedData.userUpdateById.lastName).eq(arq.userInput.lastName)
                    expect(updatedData.userGetById._id).to.eq(userId)
                    done()
                })
        })
    })
})


