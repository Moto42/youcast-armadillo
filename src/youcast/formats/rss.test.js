const RSSFormat = require('./rss');
const {EventEmitter} = require('node:events');

describe('RSSFormat', () => {

    let rssFormat, emitter;

    beforeEach(() => {
        emitter = new EventEmitter();
        rssFormat = new RSSFormat(emitter);
    });

    it('returns valid xml', () => {
        const xml = rssFormat.buildRSSFeed();
        expect(xml).toBeTruthy();
    });

});