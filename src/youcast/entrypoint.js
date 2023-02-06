/**
 * Entrypoint is responsible for accepting things and emitting the inital event to the format
 * it is also where the various plugins (formats and sources) register, so an error can be returned 
 * if a requested plugin does not exist
 */

const {EventEmitter} = require('node:events');
const FormatRegistry = require('./FormatsRegistry');

/**
 * 
 * @returns EventEmmitter
 */
function YoucastEventEmitter(){
    const emmiter = new EventEmitter();
    return emmiter;
}
const youcastEventChannel = new YoucastEventEmitter();
youcastEventChannel.emit('plugins-register');

const formatRegistry = new FormatRegistry(youcastEventChannel);

function entrypoint(req, res, next){
    const [format,source,identifier] = req.path.split(/\//g).slice(1);
    if(formatRegistry.includesByShortcode(format)) youcastEventChannel.emit(req.path, req, res);
    else {
        res.status(404).json({status:404,message:`Format ${format} not found.`});
    }
}

module.exports = {entrypoint, YoucastEventEmitter, youcastEventChannel};