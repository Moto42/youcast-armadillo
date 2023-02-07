/**
 * api is a special format for gettings information about the app.
 * 
 * @param {*} messageChannel 
 * @listens api
 */
module.exports = function Api(messageChannel) {
    this.name = 'api';
    this.shortcode = 'api';

    /**
     * build a list of the registered formats and send it to the client
     * @param {Resquest} req 
     * @param {Response} res 
     * @fires listFormats
     * @listens formatsList
     */
    this.api_formats = (req, res) => {
        function respondWithList(formats){
            res.status(200);
            res.json(formats);
        }
        messageChannel.once("formatsList",respondWithList);
        messageChannel.emit("listFormats");
    }

    //listen for the format to be called, then to the appropriate thing.
    messageChannel.on('api',(req,res,source,id)=>{
        // `source` is the second position of the urlpath.
        const lib = {
            formats: (req,res) => this.api_formats(req,res),
        }
        lib[source](req,res,source,id);
    });
}