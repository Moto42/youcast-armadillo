const fs = require('fs');
const EventEmitter  = require('node:events');

/**
 * 
 * @param {EventEmitter} messageChannel 
 * @param {YoutubeSourceOptions} options
 * @returns YoutubeSource;
 */
const YoutubeSource = function(messageChannel, options) {
    this.messageChannel = messageChannel;
    this.name = 'YouTube';
    this.shortcode = 'youtube';
    
    fs.mkdirSync('./cache',{recursive:true});

    this.downloadVideo = (id) => {
        const filepath = `youtube-${id}.mp3`;
        fs.writeFileSync(filepath, "bar");
        return filepath;
    }
}

/**
 * @typedef YoutubeSourceOptions
 * @property cachepat {string} - full path of directory to save cached mp3s to.
 */

module.exports = YoutubeSource;