const {expect} = require('chai');
const supertest = require('supertest');``
const {startServer} = require("./server");

describe('Server basic tests',()=>{
    it("Doesn't immedietly fail",()=>{
        expect(()=>{
            const server = startServer();
            server.close();
        }).not.to.throw();
    });
    it("passes requests to my middleware", (done)=>{

    });
});