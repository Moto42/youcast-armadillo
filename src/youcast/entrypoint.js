/**
 * Entrypoint is responsibler for accepting things and emitting the inital event to the format
 * it is also where the various plugins (formats and sources) register, so an error can be returned 
 * if a requested plugin does not exist
 */

function entrypoint(req, res, next){
    res.status(501);
    res.send('toots');
}

module.exports = entrypoint;