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

    messageChannel.on('api',(req,res,source,id)=>{
        // `source` is the second position of the urlpath.
        const lib = {
            formats: (req,res) => this.api_formats(req,res),
        }
        lib[source](req,res,source,id);
    });
}