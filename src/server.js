/**
 * Express server that just hands requests off to the middleware.
 */

const express = require('express');
const server = express();


function startServer() {

}

if (require.main === module) {
    startServer();
}

module.exports = {
    startServer: startServer,
}