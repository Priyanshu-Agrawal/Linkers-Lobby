const fs = require("fs");
require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const morgan = require('morgan');

app.use(express.json()); // outdated: bodyParser.json()
app.use(helmet());
app.use(cors());
// app.use(app.static('public'));


// app.use((req, res, next) => {
//     const str = `hostname: ${req.hostname} \t hostIP: ${req.ip} \t protocol: ${req.protocol} \n${req.method} ${req.url} \t time: ${new Date()}\n\n`
//     fs.appendFile('./assets/private/log.txt', str, (err) => {
//         if (err) throw err
//         console.log('Logged!')
//     })
//     next()
// })



// Create a write stream for morgan to log to a file
const accessLogStream = fs.createWriteStream('./assets/private/log.txt', { flags: 'a' });

// Use morgan middleware for request logging
app.use(morgan('combined', { stream: accessLogStream }));


app.use('/api', require('./routes'));


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})