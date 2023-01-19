# Kernel

Basicly just express and an event emitter/handler or two.

Will need some way to detect what formats and sources are installed, and make 
that information available.
# Formats

Formats handle a request for a type of data (mp3/rss/etc), emit events to 
request the resources required from Sources, compiles the resources into 

*note*: The request is handed to the Format by Express. The Format handles
responding and does not hand off the response to another module.

Formats listen for the folowing events

Format Request
```js
// Event name is the id of this format
{
    source: String, The id of the source to pull from
    id: String, the 'identifying string' the source uses to determine exactly what resources from <source> is being requested.
    req: the Node/Express request object
    res: the Node/Express response object
}
```
## mp3

**MVP Component**

*id*: mp3

Get request for MP3 pulls the audio requested, converts it to .mp3, and returns 
a response the requested mp3.

The `id` given must be for a single piece of media, not a playlist or other 
'multiple choice' entity.

## Podcast

*id*: podcast

*depends on*: 
- \<source\>:playlist

Given a source/id to a playlist or other collection, returns an XML document
representing that collection as a podcast RSS feed. Given the id of a single 
item it returns a 'podcast' with only one episode.

# Sources

Sources are event listeners/emitters that handle extracting information or
resources from various data sources such as soundcloud, youtube, or a
radiotelescope.

## Source Interface:  
## mp3 
given a resource `id` representing a single item, returns a .mp3 file of
the requested resource.

## mp3url
given a resource `id` representing a single item, returns the string 
url to request the .mp3 of this resource.  
This may be a direct link to the source of the item, or a link to request it via
the `mp3` method above.

## playlist
given a recource `id` representign a collection of items, returns an
array with the information about each of those items.

## Youtube

Gets things from Youtube! yay!
