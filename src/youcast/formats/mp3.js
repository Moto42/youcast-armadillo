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

    this.getMp3 = (req,res,source,id) => {
        function respondWithFile(sourceResponse) {
            res.sendFile(sourceResponse.filepath);
        }
        messageChannel.once(`${source}-${id}`, respondWithFile);
        messageChannel.emit(`${source}.mp3`,id);
    }
    messageChannel.on('mp3',this.getMp3);
}
module.exports = Mp3Format;