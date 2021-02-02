const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const webSocketsHandler = require('./utils/webSocketsHandler');

const app = express()
const server = require('http').createServer(app);
webSocketsHandler.initialize(server);

app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: "somesecret",
	resave: true,
	saveUninitialized: true
}));

// app.use(express.static(require('path').join(__dirname, '../upload')));
app.use(express.static('upload'));
app.use('/api', require('../server/apiRouter'));

const PORT = 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`))
server.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${port}`))