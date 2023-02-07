const fs = require('fs');
const EventEmitter  = require('node:events');

/**
 * 
 * @param {EventEmitter} messageChannel 
 * @returns YoutubeSource;
 */
const YoutubeSource = function(messageChannel) {
    this.messageChannel = messageChannel;
    this.name = 'YouTube';
    this.shortcode = 'youtube';


    this.downloadVideo = (id) => {
        const filepath = `youtube-${id}.mp3`;
        fs.writeFileSync(filepath, "bar");
        return filepath;
    }
}

module.exports = YoutubeSource;