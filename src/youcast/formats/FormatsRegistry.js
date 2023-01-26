module.exports =  function FormatRegistry(messageChannel){
    this.formats = ['api'];
    
    this.includes = name => this.formats.includes(name);

    this.registerFormat = (name) => {
        this.formats.push(name);
    }
    messageChannel.on('registerFormat',this.registerFormat);

    this.api_formats = (req, res) => {
        res.status(200);
        res.json(this.formats);
    }
    messageChannel.on('/api/formats',this.api_formats);
}

