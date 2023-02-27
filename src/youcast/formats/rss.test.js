const RSSFormat = require('./rss');
const {EventEmitter} = require('node:events');
const X2JS = require("x2js")
const converter = new X2JS();



describe('RSSFormat', () => {

    let rssFormat, emitter;

    beforeEach(() => {
        emitter = new EventEmitter();
        rssFormat = new RSSFormat(emitter);
    });

    it('returns valid xml', () => {
        const xml = rssFormat.buildRSSFeed();
        let result;
        expect(() => {
            result = converter.xml2js(xml);
        }).not.toThrow();
    });

});