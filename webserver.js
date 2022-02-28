const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sanitize = require('sanitize')

/* Additional Dependencies & Middleware Functions */

app.set('trust proxy', true)
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.HOST || '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Content-Length, Authorization, userID, appId')
    next()
})
app.options('*', (req, res) => res.status(200).json({ methods: 'PUT, GET, POST, DELETE, OPTIONS' }))
app.use(sanitize.middleware);

/* Routes */

app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({ error: true, message: error.message })
});
const server = http.createServer(app)
server.listen(process.env.PORT || 3000)