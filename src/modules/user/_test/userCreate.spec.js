const request = require('supertest')
const { expect } =  require('chai')
const graphQLEndpoint = 'http://localhost:5000/graphql'

describe('USER CREATE', () => {
    let userId;
    describe('USER CREATE POSITIVE', () => {

        it('user creating with correct parameters', (done) => {//6 enter done
            const arg = {//2 с Appolo Variables параметры для request wothout quotes
                "userInput": {
                    firstName: 'firstTestFName',//type names for tests, in Appolo were null
                    lastName: 'firstTestLName'
                }
            }
            const postData = {//3 создали переменную для того чтобы внести данные для response с Apollo Operation, use it in .send
                query: `mutation UserCreate($userInput: UserItems) {
            userCreate(userInput: $userInput) {
             _id
            firstName
            lastName
  }
}`,
                variables: arg//param for request (const name)
            }
            request(graphQLEndpoint)//1 call our cont with endpoint, open page
                .post('/')
                .send(postData)//4 from response structure
                .expect(200)//supertest library, not chai
                .end((err, res) => {//call back function with 2 parameters: if error = null, function goes further to res
                    if (err) return done(err);

                    const respData = res.body.data//5 что придёт response.body помещаем в переменную respData
                    userId = respData.userCreate._id

                    console.log("RESP BODY ===", res.body)//data выйдет сюда используем в следующих тестах
                    expect(respData.userCreate.firstName).eq('firstTestFName')//path from Operation Appolo and expected parameters
                    expect(respData.userCreate.lastName).eq('firstTestLName')
                    expect(respData.userCreate._id).to.be.a('string')
                    done()//6
                })
        })
    })
})







