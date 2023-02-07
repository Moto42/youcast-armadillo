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

    this.downloadVideo = async (id) => {
        const filepath = `${this.cachefolder}/youtube-${id}.mp3`;

        const y = new Ymp3();

        await y.Download(id,filepath);

        y.on('start',  function (commandLine) {
            console.log(commandLine)
        })

        y.on('progress',  function (progress) {
            console.log(progress)
        })

        y.on('finish',  function (fileName) {
            console.log(fileName)
        })

        y.on('error', function (e) {
            console.log(e)
        })

        return filepath;
    }
}

/**
 * @typedef YoutubeSourceOptions
 * @property cachepat {string} - full path of directory to save cached mp3s to.
 */

module.exports = YoutubeSource;