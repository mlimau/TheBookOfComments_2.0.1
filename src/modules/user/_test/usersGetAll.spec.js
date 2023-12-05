const { expect } = require('chai')
const { requestGqL } = require ('../../helper')
const { userCreateQuery, getAllUsers } = require ('./queries')
const { arg } = require ('./data')


describe('USERS GET ALL', () => {
    describe('Users get all positive', () => {
//user creating first:
        it('Users create', (done) => {
           const postData = {
               query: userCreateQuery,
               variables: arg
            }
            requestGqL(postData)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)
            const resBody = res.body.data
            console.log("RES DATA", resBody)
            done()
                })
           })

        it('Get all users', (done) => {

            const amount = {
                amount: 5
            }
            const respData = {
                query: getAllUsers,
                variables: amount
            }
            requestGqL(respData)//helper.js for open page
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err)

                    const resBody = res.body.data.usersGetAll

                    console.log("RES ALL USERS length", resBody)
                    expect(resBody).to.have.lengthOf(5)

                    console.log(resBody[0].firstName)
                    expect(resBody[0].firstName).to.equal('firstTestFName')
                    expect(resBody[0].lastName).to.equal('firstTestLName')

                    done()
                })
        })

    })

    describe('Users get all negative', () => {

    })
})