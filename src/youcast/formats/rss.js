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
    this.buildRSSFeed = (source,id) => {
        //gather info i need to know to build this thing
        //build rssfeed
        
        const rssFeed = new Podcast({            
            title: 'temptitle' ,  /*string Title of your site or feed */
            author: 'Riley Anne',  /*string Who owns this feed. */
            feedUrl: 'https://nope.not',  /*url string Url to the rss feed. */
            siteUrl: 'https://epon.ton',  /*url string Url to the site that the feed is for. */
            //description: ,  /*optional string A short description of the feed. */
            //generator: ,  /*optional string Feed generator. */
            //imageUrl: ,  /*optional *url string Small image for feed readers to use. */
            //docs: ,  /*optional url string Url to documentation on this feed. */
            //managingEditor: ,  /*optional string Who manages content in this feed. */
            //webMaster: ,  /*optional string Who manages feed availability and technical support. */
            //copyright: ,  /*optional string Copyright information for this feed. */
            //language: ,  /*optional string The language of the content of this feed. */
            //categories: ,  /*optional array of strings One or more categories this feed belongs to. */
            //pubDate: ,  /*optional Date object or date string The publication date for content in the feed */
            //ttl: ,  /*optional integer Number of minutes feed can be cached before refreshing from source. */
            //itunesAuthor: ,  /*optional string (iTunes specific) author of the podcast */
            //itunesSubtitle: ,  /*optional string (iTunes specific) subtitle for iTunes listing */
            //itunesSummary: ,  /*optional string (iTunes specific) summary for iTunes listing */
            //itunesOwner: ,  /*optional object (iTunes specific) owner of the podcast ( {name:String, email:String} ) */
            //itunesExplicit: ,  /*optional boolean (iTunes specific) specifies if the podcast contains explicit content */
            //itunesCategory: ,  /*optional array of objects (iTunes specific) Categories for iTunes ( [{text:String, subcats:[{text:String, subcats:Array}]}] ) */
            //itunesImage: ,  /*optional string (iTunes specific) link to an image for the podcast */
            //itunesType: ,  /*optional string (iTunes specific) type of podcast (episodic or serial) */
            //customNamespaces: ,  /*optional object Put additional namespaces in element (without 'xmlns:' prefix) */
            //customElements: , /*optional array Put additional elements in the feed (node-xml syntax)*/
        });
        console.log(rssFeed.buildXml());
        return rssFeed.buildXml();
    }
}



module.exports = RSSFormat;
