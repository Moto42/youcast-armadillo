/**
 * Express server that just hands requests off to the middleware.
 */

const express = require('express');
const app = express();
const youcast = require('./youcast');

app.use(youcast);


if (require.main === module) {
    app.listen(8080);
}

module.exports = {
    app: app,
}