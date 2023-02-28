/**
 * Internal representation of a list of things to play.
 * 
 * when a playlist is requested from a source, this is what is returned.
 * 
 * @class
 * title {string} 'untitled' ; 
 * author {string} 'no author';
 * list {PlaylistItem[]}  {Array}  the list of items on this playlist 
 * description  {string};  optional string Description of this playlist 
 * imageUrl {string};  optional *url string Small image for feed readers to use. 
 * categories {string[]}  optional array of strings One or more categories this feed belongs to. 
 * pubDate {Date|dateString}  optional Date object or date string The publication date for content in the feed 
 * explicit {boolean} optional, boolean Is this playlist explicit? 
 */
class Playlist {
    /**
     * 
     * @param {Object} options 
     * @param options.title? {string}
     * @param options.author? {string}
     * @param options.description? {string}
     * @param options.imageUrl? {string}
     * @param options.categories? {string}
     * @param options.pubDate? {string[]}
     * @param options.explicit? {boolean}
    */
   constructor(options){
        //check for required properties. I wish I had started this in typescript.
        Object.assign(this,options);
    }

    title= 'untitled' ; 
    author= 'no author';
    list = [];

    description = null;
    imageUrl= null;
    categories= null;
    pubDate= null;
    explicit = false;

    /**
     * Add an item to this playlist.
     * @param {PlaylistItemOptions} options 
     */
    addItem(options){
        const newItem = new PlaylistItem(options);
    }
}

/**
 * @typedef PlaylistItemOptions
     * @property title  {string} Title of this particular item.
     * @property description  {string} Content for the item. Can contain html but link and image urls must be absolute path including hostname.
     * @property duration {number} duration of video in seconds
     * @property source {string} the shortcode of the source of this item
     * @property id {string} the unique id of this item at the source
     * @property date  {Date} object or date string The date and time of when the item was created. Feed readers use this to determine the sort order. Some readers will also use it to determine if the content should be presented as unread.
     * @property categories {array} optional  of strings If provided, each array item will be added as a category element
     * @property author {string} optional  If included it is the name of the item's creator. If not provided the item author will be the same as the feed author. This is typical except on multi-author blogs.
     * @property explicit {boolean} optional,  Is this playlist explicit? 
     * @property imageUrl {string} url to image for this item
     * 
 */

/**
 * Internal representation of a specific item on a playlist
 * @class
 * 
 * @param title  {string} Title of this particular item.
 * @property description  {string} Content for the item. Can contain html but link and image urls must be absolute path including hostname.
 * @property source {string} the shortcode of the source of this item
 * @property id {string} the unique id of this item at the source
 * @property date  {Date} object or date string The date and time of when the item was created. Feed readers use this to determine the sort order. Some readers will also use it to determine if the content should be presented as unread.
 * @property categories {array} optional  of strings If provided, each array item will be added as a category element
 * @property author {string} optional  If included it is the name of the item's creator. If not provided the item author will be the same as the feed author. This is typical except on multi-author blogs.
 * @property explicit {boolean} optional,  Is this playlist explicit? 
 * 
*/
class PlaylistItem {
    /**
     * 
     * @param {PlaylistItemOptions} options 
     */
    constructor(options){
        Object.assign(this, options);
    }

    title = 'untitled';
    description = 'undescribed';
    source = '';
    id = '';
    date = '';
    
    categories = null;
    author = '';
    explicit = false;
    imageUrl= null;
}

module.exports = {Playlist,PlaylistItem};