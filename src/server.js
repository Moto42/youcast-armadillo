/**
 * Express server that just hands requests off to the middleware.
 */

const express = require('express');
const app = express();
const youcast = require('./youcast');

console.log('Server starting...')

process.on('uncaughtException', err => console.log(err));

app.use(youcast);
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


if (require.main === module) {
    app.listen(8080, ()=>console.log(`Server started on port 8080`));
}

module.exports = {
    app: app,
}