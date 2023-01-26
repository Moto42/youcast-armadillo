const supertest = require('supertest');
const {app} = require("./server");

jest.mock('./youcast');
const youcast = require('./youcast');
youcast.mockImplementation((req,res,next)=> res.sendStatus(200));

describe('Server basic tests',()=>{
    

    it("passes requests to my middleware", async ()=>{
        const request = supertest(app);
        const response = await request.get("/");
        expect(youcast).toHaveBeenCalledTimes(1);
    });
});