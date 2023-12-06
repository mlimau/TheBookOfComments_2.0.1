const { expect } = require("chai");
const { requestGql } = require ('../../helper')
const { userCreateM } = require ('./queries')
const {  userInput } = require ('./data')
describe("USER CREATE", () => {
  describe("USER CREATE - POSITIVE", () => {
    it("user create", (done) => {
        const postData = {
          query: userCreateM,
          variables: userInput,
        };
        requestGql(postData)
          .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data;
          console.log("RESP BODY ===", respData);
          expect(respData.userCreate.firstName).eq(userInput.userInput.firstName);
          expect(respData.userCreate.lastName).eq(userInput.userInput.lastName);
          done();
        });
    });
  });
  describe("USER CREATE - NEGATIVE", () => {});
});
