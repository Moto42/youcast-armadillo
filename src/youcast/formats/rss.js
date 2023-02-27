const {Podcast} = require('podcast');

/**
 * handler for when a raw MP3 is requested
 * @param {EventEmitter}} messageChannel
 * @returns {Mp3Format}
 * @property {string} shortcode - the handle for referencing this api in the registry and events
 * @property {string} name - the human friendly name of this format
 * @listens rss
 */
function RSSFormat(messageChannel) {
    this.shortcode = 'rss';
    this.name = 'rss';

    /** build an rss feed of `id` from `source`
     * 
     * @param {string} source - shortcode of the source plugin to pull from
     * @param {string} id - the unique id to find the resource at source
     */
    this.buildRSSFeed = (playlist) => {
        //gather info i need to know to build this thing
        //build rssfeed
        
        const rssFeed = new Podcast({            
            title: 'temptitle' ,  /*string Title of your site or feed */
            author: 'Riley Anne',  /*string Who owns this feed. */
            feedUrl: 'https://nope.not',  /*url string Url to the rss feed. */
            siteUrl: 'https://epon.ton',  /*url string Url to the site that the feed is for. */
        });
        return rssFeed.buildXml();
    }
}

module.exports = RSSFormat;
