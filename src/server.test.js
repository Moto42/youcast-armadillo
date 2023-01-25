const supertest = require('supertest');
const {app} = require("./server");


describe('Server basic tests',()=>{
    
    jest.mock('./youcast');
    const youcast = require('./youcast');
    youcast.mockImplementation((req,res,next)=> res.send(200));

    it("passes requests to my middleware", async ()=>{
        const request = supertest(app);
        const response = await request.get("/");
        expect(youcast).toHaveBeenCalledTimes(1);
    });
});