// api is a special format for gettings information about the app.

module.exports = function Api(messageChannel) {
    this.name = 'api';
    this.shortcode = 'api';

    this.api_formats = (req, res) => {
        function respondWithList(formats){
            res.status(200);
            res.json(formats);
        }
        messageChannel.once("formatsList",respondWithList);
        messageChannel.emit("listFormats");
    }
    messageChannel.on('/api/formats',this.api_formats);
}