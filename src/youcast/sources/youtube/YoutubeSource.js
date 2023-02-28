const Ymp3 = require('ymp3d')
const ytdl = require('ytdl-core');
const ytdpl = require('ytpl');
const fs = require('fs');
const EventEmitter  = require('node:events');
const { fail } = require('assert');
const { Playlist, PlaylistItem } = require('../../common/Playlist');
const { emit } = require('process');

/**
 * handler for getting information and files from Youtube. 
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

    /**
     * convert a youtube video to mp3, save to filesystem and return full path to that file
     * 
     * will cache the files created so they can be pulled more quickly in the future.
     * 
     * @param {string} id Youtube video id
     * @returns {Object} source response with `filepath` (full path to the file, null on error)`error` (may be null)
     * @listens youtube.mp3
     * @emits youtube-<id>
     */
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
            y.on('progress',(progress)=>{
                console.log(progress);
            })
            y.on('finish',  success);
            y.on('error',failure);
            y.Download(id,filepath).catch(failure);
            return null
        }
    }
    messageChannel.on('youtube.mp3', this.downloadVideo);

    /** return the url to get an mp3 of some video 
     * @param {string} id - youtube video id
     * @listens youtube.mp3url
     * @fires mp3url.youtube.<id>
     */
    this.mp3url = (id) => {
        const url = `${process.env.SERVER_URL || ''}/mp3/youtube/${id}`;
        return url;
    }

    this.playlist = async (id) => {
        const isPlaylistId = ytdpl.validateID(id);
        const isVideoId = ytdl.validateID(id);
        let playlist;

        if(isPlaylistId) {
            const ytdplOptions = {
                limit: Infinity,
                pages: Infinity,
            };
            const info = await ytdpl(id,ytdplOptions);
            playlist =  new Playlist({
                title: info.title,
                author: info.author.name,
                imageUrl: info.bestThumbnail,
                description: info.description,
            });
            // add each item in info.list to playlist.list
            info.items.forEach(video => {
                const newItem = new PlaylistItem({
                    title: video.title,
                    author: video.author.name,
                    duration: video.durationSec,
                    description: video.description,
                    id: video.id,
                    source: this.shortcode,
                    imageUrl: video.bestThumbnail,
                    mp3url: this.mp3url(video.id),
                });
                playlist.list.push(newItem);
            });
            // playlist is returned after this if/else pile
        }
        else if(isVideoId) {
            //get video information 
            const info = await ytdl.getBasicInfo(id);
            // create playlist for just this video
            playlist =  new Playlist({
                title: info.videoDetails.title,
                author: info.videoDetails.author.name,
                imageUrl: info.videoDetails.bestThumbnail,
                description: info.videoDetails.description,
            });
            // add that video as the only item in this playlist
                playlist.list.push(new PlaylistItem({
                    title: info.videoDetails.title,
                    author: info.videoDetails.author.name,
                    duration: info.videoDetails.lengthSeconds,
                    description: info.videoDetails.description,
                    id: info.videoDetails.videoId,
                    source: this.shortcode,
                    imageUrl: info.thumbnail_url,
                    mp3url: this.mp3url(info.id),
                }));
            // playlist is returned after this if/else pile
        }
        else {
            throw new Error(`youtube ide ${id} is neither a video or playlist id`);
        }
        const plEvent = {
            error: null,
            playlist: playlist,
        };
        this.messageChannel.emit(`playlist-${this.shortcode}-${id}`,plEvent);
        return playlist;
    }
    this.messageChannel.on('youtube-playlist', (id)=> this.playlist(id));
}

/**
 * @typedef YoutubeSourceOptions
 * @property cachepath {string} - full path of directory to save cached mp3s to.
 */

module.exports = YoutubeSource;