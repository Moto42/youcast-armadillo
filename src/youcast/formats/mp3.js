/**
 * handler for when a raw MP3 is requested
 * @param {EventEmitter}} messageChannel
 * @returns {Mp3Format}
 * @property {string} shortcode - the handle for referencing this api in the registry and events
 * @property {string} name - the human friendly name of this format
 */
function Mp3Format(messageChannel) {
    this.shortcode = 'mp3';
    this.name = 'mp3';
}
module.exports = Mp3Format;