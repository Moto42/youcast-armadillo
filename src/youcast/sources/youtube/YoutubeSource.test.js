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

    it('can download a video to a file named `youtube-<id>.mp3, and returns the filepath`', () => {
        const filepath = source.downloadVideo('G-ShmHzJJY0');
        expect(filepath).toEqual('youtube-G-ShmHzJJY0.mp3');
    });

});