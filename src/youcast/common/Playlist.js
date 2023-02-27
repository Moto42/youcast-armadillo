/**
 * Internal representation of a list of things to play.
 */
class Playlist {
    constructor() {
    }
    title= 'untitled' ; 
    author= 'no author';
    list = [];     /* the list of items on this playlist */

    description = null; /* optional string Description of this playlist */
    imageUrl= null;  /*optional *url string Small image for feed readers to use. */
    categories= null;  /*optional array of strings One or more categories this feed belongs to. */
    pubDate= null;  /*optional Date object or date string The publication date for content in the feed */
    explicit = false; /* optional, boolean Is this playlist explicit? */
}

/**
 * Internal representation of a specific item on a playlist
 * @class
 * 
 * @param title  {string} Title of this particular item.
 * @property description  {string} Content for the item. Can contain html but link and image urls must be absolute path including hostname.
 * @property url  {url} string Url to the item. This could be a blog entry.
 * @property date  {Date} object or date string The date and time of when the item was created. Feed readers use this to determine the sort order. Some readers will also use it to determine if the content should be presented as unread.
 * @property categories  {optional} array of strings If provided, each array item will be added as a category element
 * @property author  {optional} string If included it is the name of the item's creator. If not provided the item author will be the same as the feed author. This is typical except on multi-author blogs.
 * @property explicit  {optional}, boolean Is this playlist explicit? 
 * 
*/
class PlaylistItem {
    title = 'untitled';
    description = 'undescribed';
    url = '';
    date = '';
    
    categories = null;
    author = '';
    explicit = false;;
}

module.exports = {Playlist,PlaylistItem};