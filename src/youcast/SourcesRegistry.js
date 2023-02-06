const {existsSync, readdirSync} = require('fs');


function SourcesRegistry(messageChannel){
    this.sources = [];
    
    this.includesByShortcode = shortcode => {
        return this.sources.some(f => f.shortcode == shortcode);
    };

    this.registerSource = (shortcode) => {
        const path1 = `${__dirname}/sources/${shortcode}.js`;
        const path2 = `${__dirname}/sources/${shortcode}/index.js`;
        // if the file exists...
        const onPath1 =  existsSync(path1);
        const onPath2 =  existsSync(path2);
        const apiFound = onPath1 || onPath2;
        const isAlreadyRegistered = this.includesByShortcode(shortcode);
        if(isAlreadyRegistered) {
            return;
        }
        else if(apiFound){

            const location = onPath1 ? path1 : path2;
            const newSource = require(location);
            this.sources.push(new newSource(messageChannel));
        }
        else {
            throw new Error(`Format '${shortcode}' is not found in the sources folder`);
        }
    }
    messageChannel.on('registerSource',this.registerSource);

    this.registerAll = () => {
        // get list of all things in the formats folder
        const sourcesList =  readdirSync(`${__dirname}/sources`).map(fn => fn.split('.')[0]);
        for(let f of sourcesList){
            //register them all
            this.registerSource(f);
        }
    }
    messageChannel.on('registerAllSources',this.registerAll);

    this.listSources = () => {
        const list = this.sources.map(f=>f.shortcode);
        messageChannel.emit('sourcesList',list);
        return list;
    }
    messageChannel.on('listSources', this.listSources);

}

module.exports = SourcesRegistry;
