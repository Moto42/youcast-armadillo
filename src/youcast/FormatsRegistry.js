module.exports =  function FormatRegistry(messageChannel){
    this.formats = [];
    
    this.includesByShortcode = shortcode => {
        return this.formats.some(f => f.shortcode = shortcode);
    };

    this.registerFormat = (shortcode) => {
        //check ./formats folder for a subfolder with shortcode as it's name
        const newFormat = require(`./formats/${shortcode}`);
        this.formats.push(new newFormat(messageChannel));
    }
    messageChannel.on('registerFormat',this.registerFormat);

    this.listFormats = () => {
        const list = this.formats.map(f=>f.shortcode);
        messageChannel.emit('formatsList',list);
    }
    messageChannel.on('listFormats', this.listFormats);

}

