# Youcast

A service that converts public Youtube playlists into podcasts

## Plugins

Plugins handle the various formats and sources available

There are two 'types' of plugin, 'sources' and 'formats', but they are almost identical at this stage.

### universal attributes

Format and Source plugins must share the following properties

| key            | type         | description                                                     |
| :------------- | :------------ | :-------------------------------------------------------------- |
| name           | string       | the human readable name of this plugin                          |
| shortcode      | string       | the value used to refer to this plugin in the registry          |
| messageChannel | EventEmitter | the EventEmitter being used to passe messages in the middleware |


### Source Methods
All sources should have the following methods, 
| method | event trigger      | returns            | description                                              |
| :----- | ------------------ | ------------------ | :------------------------------------------------------- |
| mp3    | {shortcode}-mp3    | todo:figurethisout | returns the MP3 of the requested resource                |
| mp3Url | {shortcode}-mp3url | string             | returns the URL to get the MP3 of the requested resource |

### Source event replies.
When a source emits an event, it will include an object with at least the property `error`.  
if no error occured, then error will be `null`.

Other properties will vary depending upon the thing being returned

#### mp3
| key      | type   | description                    |
| -------- | ------ | ------------------------------ |
| filepath | string | full path to the mp3 requested |

### mp3url
| key | type   | description             |
| --- | ------ | ----------------------- |
| url | string | url to request this mp3 |