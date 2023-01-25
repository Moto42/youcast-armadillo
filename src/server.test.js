const {expect} = require('chai');
const supertest = require('supertest');``
const {app} = require("./server");

describe('Server basic tests',()=>{
    it("passes requests to my middleware", async ()=>{
        const request = supertest(app);
        const response = await request.get("/")
        expect(response.status).to.eql(200);
    });
});