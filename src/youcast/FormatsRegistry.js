const {existsSync, readdirSync} = require('fs');

/**
 * The registry that starts and tracks the active Format plugins
 * @param {*} messageChannel 
 * @returns FormatRegistry
 */
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
    
    this.registerAll = () => {
        // get list of all things in the formats folder
        const formatsList =  readdirSync(`${__dirname}/formats`).map(fn => fn.split('.')[0]);
        for(let f of formatsList){
            //register them all
            this.registerFormat(f);
        }
    }
    messageChannel.on('registerAllFormats',this.registerAll);

    this.listFormats = () => {
        const list = this.formats.map(f=>f.shortcode);
        return list;
    }
    messageChannel.on('listFormats',()=> messageChannel.emit('formatsList',this.listFormats()));

}

module.exports = FormatRegistry;
