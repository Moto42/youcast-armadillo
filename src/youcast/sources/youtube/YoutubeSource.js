const fs = require('fs');
const EventEmitter  = require('node:events');

/**
 * 
 * @param {EventEmitter} messageChannel 
 */
const YoutubeSource = function(messageChannel) {
    this.messageChannel = messageChannel;
    this.name = 'YouTube';
    this.shortcode = 'youtube';


    this.downloadVideo = (id) => {
        fs.writeFileSync("foo.txt", "bar");
    }
}

module.exports = YoutubeSource;