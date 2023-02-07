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
        console.log(`youtube - downloadVideo fired for video id ${id}`);
        const eventName = `youtube-${id}`;
        const filepath = `${this.cachefolder}/youtube-${id}.mp3`;

        // helper functions for if the DL fails/succeeds
        function success(fileName){
            const message = {
                error: null,
                filepath: filepath,
            };
            messageChannel.emit(eventName, message);
        }
        function failure(error){
            console.log(e);
            const message = {
                error: 'Error occured',
                filepath: null,
            };
            this.messageChannel.emit(eventName, message);
        }

        //Is it already cached?
        if(fs.existsSync(filepath)) {
            success(filepath);
            return filepath;
        }
        else {
            const y = new Ymp3();
            y.Download(id,filepath);
            y.on('progress',(progress)=>{
                console.log(progress);
            })
            y.on('finish',  success);
            y.on('error', failure);
            return null
        }
    }
    messageChannel.on('youtube.mp3', this.downloadVideo);
}

/**
 * @typedef YoutubeSourceOptions
 * @property cachepat {string} - full path of directory to save cached mp3s to.
 */

module.exports = YoutubeSource;