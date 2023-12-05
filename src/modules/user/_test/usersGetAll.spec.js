const request = require("supertest");
const { expect } = require("chai");
const graphQLEndpoint = "http://localhost:5000/graphql";
const {userGetAllQuery} = require('./queries');

describe("USERS GET ALL", () => {
    describe("USERS GET ALL - POSITIVE", () => {
        it("users get all", (done) => {
            const arg = {
                userId: null
            };
            const postData = {
                query: userGetAllQuery,
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
