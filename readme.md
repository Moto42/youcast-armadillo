# Youcast

A service that converts public Youtube playlists into podcasts

## Enviromental vars

| var        | type   | description            | required                 |
| ---------- | ------ | ---------------------- | ------------------------ |
| SERVER_URL | string | full url of the server | no but prbably should be |

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

#### mp3url

| key | type   | description             |
| --- | ------ | ----------------------- |
| url | string | url to request this mp3 |

### Addressing events to formats

To send an event to a given format use {messageChannel}.emit({format shortcode}, req, res, source, id);

Because most calls to the server will take the form .../format/source/id; we just pull them out and pass them along from the start.

In the rare case that a format does different things, it will have to inspect the arguments passed to it by the event to decide what to do.  
(see the `api` format for one way to handle this);

### Addressing events to Sources

Sources have multiple functions, so it is nessisary to have a way to address them individualy.

The general pattern is to name the event `{shortcode}.{function}` and pass the args that method requires as normal.

