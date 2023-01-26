/**
 * Entrypoint is responsibler for accepting things and emitting the inital event to the format
 * it is also where the various plugins (formats and sources) register, so an error can be returned 
 * if a requested plugin does not exist
 */

const {EventEmitter} = require('node:events');

/**
 * 
 * @returns EventEmmitter
 */
function YoucastEventEmitter(){
    const emmiter = new EventEmitter();
    emmiter.on('register-plugin',register_plugin);

    return emmiter;
}

function register_plugin(){
    console.log('plugin registered');
}

const youcastEventChannel = new YoucastEventEmitter();
youcastEventChannel.emit('plugins-register');

function entrypoint(req, res, next){
    res.status(501);
    res.send('toots');
}

module.exports = {entrypoint, YoucastEventEmitter, youcastEventChannel};