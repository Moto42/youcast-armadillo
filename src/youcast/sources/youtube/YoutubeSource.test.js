const YoutubeSource = require('./YoutubeSource');
const EventEmitter = require('node:events');
const {Playlist} = require('../../common/Playlist');
const fs = require('fs');
const mockfs = require('mock-fs');
const e = require('express');


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

    it.skip('can download a video to a file named `youtube-<id>.mp3, and returns the filepath`',  () => {
        const filepath = source.downloadVideo('G-ShmHzJJY0');
        expect(filepath).toContain('G-ShmHzJJY0');
    });

});


describe('mp3url', () => {

    let source, messageChannel;
    const env = process.env

    beforeEach(() => {
        messageChannel = new EventEmitter();
        source = new YoutubeSource(messageChannel);
        const fileSytem = {}
        fileSytem[__dirname] = {};
        mockfs(fileSytem);

        jest.resetModules()
        process.env = { ...env }

    });
    afterEach(() => {
        mockfs.restore();
        process.env = env
    });
    afterAll(() => {
        mockfs.restore();
    });


    it('return a relative URL when SERVER_URL is not set', () => {
        process.env.SERVER_URL = 'http://someurl.tld';
        const result = source.mp3url('falseid');
        const correct = 'http://someurl.tld/mp3/youtube/falseid';
        expect(result).toEqual(correct);
    });
    
    it('return a full URL when SERVER_URL is set', () => {
        process.env
        const result = source.mp3url('falseid');
        const correct = '/mp3/youtube/falseid';
        expect(result).toEqual(correct);
    });


});

describe('playlist', () => {

    let source, messageChannel;
    const env = process.env

    beforeEach(() => {
        messageChannel = new EventEmitter();
        source = new YoutubeSource(messageChannel);
    });

    it('throws on invalid input', async () => {
        await expect(async () => {await source.playlist()}).rejects.toThrow();
        await expect(async () => {await source.playlist('invalidId')}).rejects.toThrow();
    });

    it('returns playlist on valid input.', async () => {
        // await source.playlist(''); /*video*/
        const playlistFromList = await source.playlist('PLbpi6ZahtOH6eTD4bB5qJ50QQRHz2leKM'); /*playlist id*/
        expect(playlistFromList).toBeInstanceOf(Playlist);
        const playlistFromVideo = await source.playlist('QTGoBI6Vqto'); /*video id*/
        expect(playlistFromVideo).toBeInstanceOf(Playlist);
    });
    it('emits an event when it does generates a playlist', (done) => {
        messageChannel.once('playlist-youtube-PLbpi6ZahtOH6eTD4bB5qJ50QQRHz2leKM',(msg)=>{
            expect(msg.error).toBeNull();
            expect(msg.playlist).toBeInstanceOf(Playlist);
            done();
        })
        source.playlist('PLbpi6ZahtOH6eTD4bB5qJ50QQRHz2leKM'); /*playlist id*/
    });

});