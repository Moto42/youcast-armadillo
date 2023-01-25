const {expect} = require('chai');
const server = require("./server");

describe('Server basic tests',()=>{
    it("Doesn't immedietly fail",()=>{
        expect(server).to.be.ok;
    });
});