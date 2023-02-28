const RSSFormat = require('./rss');
const {EventEmitter} = require('node:events');
const {Playlist} = require('../common/Playlist');
const X2JS = require("x2js")
const converter = new X2JS();



describe('RSSFormat', () => {

    let rssFormat, emitter;

    beforeEach(() => {
        emitter = new EventEmitter();
        rssFormat = new RSSFormat(emitter);
    });

    it('returns valid xml', () => {
        const playlist = new Playlist();
        const xml = rssFormat.buildRSSFeed(playlist);
        let result;
        expect(() => {
            result = converter.xml2js(xml);
        }).not.toThrow();
    });

});