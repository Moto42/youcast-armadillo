/**
 * Entrypoint is responsible for accepting things and emitting the inital event to the format
 * it is also where the various plugins (formats and sources) register, so an error can be returned 
 * if a requested plugin does not exist
 */

const {EventEmitter} = require('node:events');
const FormatsRegistry = require('./FormatsRegistry');
const SourcesRegistry = require('./SourcesRegistry');

/**
 * 
 * @returns EventEmmitter
 */
function YoucastEventEmitter(){
    const emmiter = new EventEmitter();
    return emmiter;
}
const youcastEventChannel = new YoucastEventEmitter();

const formatRegistry = new FormatsRegistry(youcastEventChannel);
formatRegistry.registerAll();
// This is being used, it's just caled by even emitters later.
const sourcesRegistry = new SourcesRegistry(youcastEventChannel);
sourcesRegistry.registerAll();

function entrypoint(req, res, next){


    const [format,source,identifier] = req.path.split(/\//g).slice(1);
    if(formatRegistry.includesByShortcode(format)) youcastEventChannel.emit(req.path, req, res);
    else {
        res.status(404).json({status:404,message:`Format ${format} not found.`});
    }
}

module.exports = {entrypoint, YoucastEventEmitter, youcastEventChannel};