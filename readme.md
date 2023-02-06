# Youcast

A service that converts public Youtube playlists into podcasts

## Plugins

Plugins handle the various formats and sources available

There are two 'types' of plugin, 'sources' and 'formats', but they are almost identical at this stage.

### universal attributes

Format and Source plugins must share the following properties

| key            | type         | description                                                     |
| :------------- | ------------ | :-------------------------------------------------------------- |
| name           | string       | the human readable name of this plugin                          |
| shortcode      | string       | the value used to refer to this plugin in the registry          |
| messageChannel | EventEmitter | the EventEmitter being used to passe messages in the middleware |