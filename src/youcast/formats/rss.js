const {Podcast} = require('podcast');
const {Playlist, PlaylistItem} = require("../common/Playlist");
const { v5:uuidv5 } = require('uuid');

// Used to generate deterministic UUIDs for episodes
const UUID_NAMESPACE = 'b1639c0a-b20d-4bad-8d1a-90eeb8c333b8';
// yes, hardcoding is bad, but this will ensure that V5 UUIDS with the nameing scheme "source-id" will be the same, no matter where I move this code too.

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
     * @param {Playlist} playlist
     */
    this.buildRSSFeed = (playlist, source, id) => {
        const rssFeed = new Podcast({            
            title: playlist.title ,  /*string Title of your site or feed */
            author: playlist.author,  /*string Who owns this feed. */
            feedUrl: `http://${process.env.SERVER_URL}/rss/${source}/${id}`,  /*url string Url to the rss feed. */
            description: playlist.description,
            imageUrl: playlist.imageUrl,
            itunesAuthor: playlist.author,
            itunesSummary: playlist.description,
            itunesExplicit: playlist.explicit,
            categories: playlist.categories,
            itunesCategory: playlist.categories,
            itunesImage: playlist.imageUrl,
        });
        // add episodes to the feed
        playlist.list.forEach(item => {
            rssFeed.addItem({
                title: item.title,
                description: item.description,
                url: item.mp3Url,
                categories: item.categories,
                guid: uuidv5(`${item.source}-${item.id}`, UUID_NAMESPACE),
                author: item.author,
                itunesAuthor: item.author,
                itunesExplicit: item.explicit,
                itunesDuration: item.duration,
                itunesImage: item.imageUrl,
            });
        });
        return rssFeed.buildXml();
    }
    this.deliverRssFeed = (req,res,source,id) => {
        res.status(501);
        res.send("not implimented");
    };
    messageChannel.on('rss', this.deliverRssFeed);
}

module.exports = RSSFormat;
