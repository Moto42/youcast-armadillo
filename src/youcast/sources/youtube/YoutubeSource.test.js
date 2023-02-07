const YoutubeSource = require('./YoutubeSource');
const EventEmitter = require('node:events');
const fs = require('fs');
const mockfs = require('mock-fs');


describe('can download a video', () => {

    let source, messageChannel;

    beforeEach(() => {
        messageChannel = new EventEmitter();
        source = new YoutubeSource(messageChannel);
        const fileSytem = {}
        fileSytem[__dirname] = {};
        mockfs(fileSytem);
    });
    afterEach(() => {
        mockfs.restore();
    });
    afterAll(() => {
        mockfs.restore();
    });

    it('can download a video to a file named `youtube-<id>.mp3, and returns the filepath`',  () => {
        const filepath = source.downloadVideo('G-ShmHzJJY0');
        expect(filepath).toInclude('G-ShmHzJJY0');
    });

});