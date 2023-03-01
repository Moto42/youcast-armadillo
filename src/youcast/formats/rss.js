const {Podcast} = require('podcast');
const {Playlist} = require("../common/Playlist");
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
                categories: item.categories,
                guid: uuidv5(`${item.source}-${item.id}`, UUID_NAMESPACE),
                author: item.author,
                itunesAuthor: item.author,
                itunesExplicit: item.explicit,
                itunesDuration: item.duration,
                itunesImage: item.imageUrl,
                enclosure: {
                    url: item.mp3url,
                    size: item.duration * 24000, //we save our mp3s at 24000 byte/sec
                    type: "audio/mpeg",
                },
            });
        });
        return rssFeed.buildXml();
    }
    this.handleRSSFeedRequest = (req,res,source,id) => { 

        if(id.slice(-4)=='.xml') id = id.slice(0,-4);

        // do we want to pre-load the mp3's for this, or lazy load them?
        const precache = req.query['precache'] == '' || req.query['precache']== 'true' || ( process.env.PRECACHE_DEFAULT == true && req.query['precache'] !== false);
        /**
         * 
         * @param {Playlist} playlist 
         */
        function doPrecache(playlist) {
            playlist.list.forEach(item => messageChannel.emit(`${source}.mp3`,item.id));
        }

        // set up what we do when we get the playlist
        messageChannel.once(`playlist-${source}-${id}`, (sourceResponce)=>{
            const {playlist} = sourceResponce;
            if(precache) doPrecache(playlist);
            const fileName = playlist.title.replace(/[^0-9a-zA-z]/g,'');
            res.setHeader("Content-Type",' application/rss+xml');
            res.setHeader("Link",'<https://google.com>');
            res.setHeader("Content-Disposition", "inline;filename=" + fileName +'.xml');
            res.send(this.buildRSSFeed(playlist,source,id));
        });
        // request the playlist.
        messageChannel.emit(`${source}-playlist`,id);
    };
    messageChannel.on('rss', this.handleRSSFeedRequest);
}

module.exports = RSSFormat;
