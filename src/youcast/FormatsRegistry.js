const {existsSync} = require('fs');


function FormatRegistry(messageChannel){
    this.formats = [];
    
    this.includesByShortcode = shortcode => {
        return this.formats.some(f => f.shortcode == shortcode);
    };

    this.registerFormat = (shortcode) => {
        const path1 = `${__dirname}/formats/${shortcode}.js`;
        const path2 = `${__dirname}/formats/${shortcode}/index.js`;
        // if the file exists...
        const apiFound = existsSync(path1) || existsSync(path2);
        const isAlreadyRegistered = this.includesByShortcode(shortcode);
        if(isAlreadyRegistered) {
            return;
        }
        else if(apiFound){

            const location = path1 ? path1 : path2;
            const newFormat = require(location);
            this.formats.push(new newFormat(messageChannel));
        }
        else {
            throw new Error(`Format '${shortcode}' is not found in the formats folder`);
        }
    }
    messageChannel.on('registerFormat',this.registerFormat);

    this.listFormats = () => {
        const list = this.formats.map(f=>f.shortcode);
        messageChannel.emit('formatsList',list);
        return list;
    }
    messageChannel.on('listFormats', this.listFormats);

}

module.exports = FormatRegistry;
