/**
 * Express server that just hands requests off to the middleware.
 */

const express = require('express');
const app = express();


function startServer() {
    return app.listen(8080);
}

if (require.main === module) {
    startServer();
}

module.exports = {
    startServer: startServer,
}