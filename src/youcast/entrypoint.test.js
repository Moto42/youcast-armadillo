const {mwsupertest} = require('middleware-supertest');

describe('api/formats', () => {
    let entrypoint, youcastEventChannel;
    let request;
    beforeEach(()=>{
        ({entrypoint, youcastEventChannel} = require('./entrypoint'));
        request = mwsupertest(entrypoint);
    });

    it('returns an array listing only itself when no other formats are registered', async () => {
        const response = await request.get('/api/formats');
        expect(response.status).toBe(200);
        const data = JSON.parse(response.text);
        expect(data).toEqual(['api']);
    });
    it('event "registerFormat" adds a new format to the list',async () => {
        //emit event that registers new format
        youcastEventChannel.emit('registerFormat','test');

        const response = await request.get('/api/formats');
        expect(response.status).toBe(200);

        const actual = JSON.parse(response.text);
        const correct = ['api','test'];

        expect(actual).toEqual(correct);
    })

    it('returns an error when an unregistered format is requested', async () => {
        const response = await request.get('/herp/derp');
        expect(response.status).toBe(404);
    });
});