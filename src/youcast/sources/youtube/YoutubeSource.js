const Ymp3 = require('ymp3d')

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
    this.cachefolder = `${__dirname}/cache`;
    fs.mkdirSync(this.cachefolder,{recursive:true});

    this.downloadVideo = (id) => {
        const eventName = `youtube-${id}`;
        const filepath = `${this.cachefolder}/youtube-${id}.mp3`;

        //Is it already cached?
        if(fs.existsSync(filepath)) return filepath;

        const y = new Ymp3();

        y.Download(id,filepath);

        y.on('finish',  function (fileName) {

        })

        y.on('error', function (e) {
            const message = {
                error: 'Error occured',
                filepath: null,
            };
            this.messageChannel.emit(eventName, message)
        })

        return filepath;
    }
}

/**
 * @typedef YoutubeSourceOptions
 * @property cachepat {string} - full path of directory to save cached mp3s to.
 */

module.exports = YoutubeSource;