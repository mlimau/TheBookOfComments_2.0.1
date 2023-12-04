const request = require("supertest");
const { expect } = require("chai");
const graphQLEndpoint = "http://localhost:5000/graphql";

describe("USERS GET ALL", () => {
    describe("USERS GET ALL - POSITIVE", () => {
        it("users get all", (done) => {
            const arg = {
                userId: null
            };
            const postData = {
                query: `query UsersGetAll {
  usersGetAll {
    _id
    firstName
    lastName
  }
}`,
                variables: arg,
            };
            request(graphQLEndpoint)
                .post("/")
                .send(postData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    const respData = res.body.data;
                    console.log("RESP BODY ===", respData);
                    // expect(respData.userCreate.firstName).eq('firstName1')
                    // expect(respData.userCreate.lastName).eq('lastName1')
                    done();
                });
        });
    });
    describe("USERS GET ALL - NEGATIVE", () => {});
});
