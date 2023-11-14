const bodyParser = require("express");
const fs = require("fs");
const apiRoutes = require('./routes/api')
require('dotenv').config();
const express = require("express");
const app = express();

app.use(bodyParser.json());
// app.use(app.static('public'));


app.use((req, res, next) => {
    const str = `hostname: ${req.hostname} \t hostIP: ${req.ip} \t protocol: ${req.protocol} \n${req.method} ${req.url} \t time: ${new Date()}\n\n`
    fs.appendFile('./assets/private/log.txt', str, (err) => {
        if (err) throw err
        console.log('Logged!')
    })
    next()
})


app.use('/api', apiRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})