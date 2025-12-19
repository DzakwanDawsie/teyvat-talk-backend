require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser'),
    cors = require('cors');

global.__basedir = __dirname;

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/api');
routes(app);

app.listen(port, () => {
    console.log(`🎮 Genshin Character API listening on port ${port}`);
    console.log(`📖 Visit http://localhost:${port}/ for API info`);
});
