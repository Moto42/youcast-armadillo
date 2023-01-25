const supertest = require('supertest');
const {app} = require("./server");
const youcast = require('./youcast');

describe('Server basic tests',()=>{
    it("passes requests to my middleware", async ()=>{
        const request = supertest(app);
        const response = await request.get("/");
        expect(response.status).toBe(200);
    });
});