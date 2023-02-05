const {mwsupertest} = require('middleware-supertest');

describe('api/formats', () => {

    it('returns 404 when no formats are registerd', async () => {
        const {entrypoint,youcastEventChannel} = require('./entrypoint');
        const request = mwsupertest(entrypoint);
        const response = await request.get('/api/formats');
        expect(response.status).toBe(404);
    });
    it('event "registerFormat" adds a new format to the list',async () => {
        const {entrypoint,youcastEventChannel} = require('./entrypoint');
        const request = mwsupertest(entrypoint);
        //emit event that registers new format
        youcastEventChannel.emit('registerFormat','api');

        const response = await request.get('/api/formats');
        expect(response.status).toBe(200);
        
        const actual = JSON.parse(response.text);
        const correct = ['api'];
        
        expect(actual).toEqual(correct);
    })
    
    it('does not crash after the first request for a format list',async () => {
        const {entrypoint,youcastEventChannel} = require('./entrypoint');
        const request = mwsupertest(entrypoint);
        //emit event that registers new format
        youcastEventChannel.emit('registerFormat','api');

        const response = await request.get('/api/formats');
        expect(response.status).toBe(200);
        // second request
        const response2 = await request.get('/api/formats');
        expect(response2.status).toBe(200);
        
        const actual = JSON.parse(response.text);
        const correct = ['api'];
    })

    it('event "returns 404 when an unregistered format is requested',async () => {
        const {entrypoint,youcastEventChannel} = require('./entrypoint');
        const request = mwsupertest(entrypoint);
        //emit event that registers new format
        youcastEventChannel.emit('registerFormat','api');

        const response = await request.get('/api/formats');
        expect(response.status).toBe(200);
        
        const actual = JSON.parse(response.text);
        const correct = ['api'];
        
        expect(actual).toEqual(correct);
        
        const response2fail = await request.get('/error/notfound');
        expect(response2fail.status).toBe(404);

    })
});