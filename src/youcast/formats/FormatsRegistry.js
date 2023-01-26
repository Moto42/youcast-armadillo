module.exports =  function FormatRegistry(messageChannel){
    this.formats = ['api'];
    
    this.api_formats = (req, res) => {
        console.log(this.formats);
        res.status(200);
        res.json(this.formats);
    }
    messageChannel.on('/api/formats',this.api_formats);
}

