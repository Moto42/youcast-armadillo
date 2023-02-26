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

}



module.exports = RSSFormat;
