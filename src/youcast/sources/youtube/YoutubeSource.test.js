const YoutubeSource = require('./YoutubeSource');
const EventEmitter = require('node:events');
const mockfs = require('mock-fs');


describe('can download a video', () => {
    
    let source, messageChannel;

    beforeEach(() => {
        messageChannel = new EventEmitter();
        source = new YoutubeSource(messageChannel);
        mockfs();
    });
    afterEach(() => {
        mockfs.restore();
    });
    afterAll(() => {
        mockfs.restore();
    });

    it('can download a video', () => {

    });

});