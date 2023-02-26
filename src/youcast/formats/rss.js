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
        
    }
}



module.exports = RSSFormat;
