/**
 * Entrypoint is responsibler for accepting things and emitting the inital event to the format
 * it is also where the various plugins (formats and sources) register, so an error can be returned 
 * if a requested plugin does not exist
 */

const {EventEmitter} = require('node:events');
const FormatRegistry = require('./formats/FormatsRegistry');

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
    console.log(req.path);
    youcastEventChannel.emit(req.path, req, res);
}

module.exports = {entrypoint, YoucastEventEmitter, youcastEventChannel};