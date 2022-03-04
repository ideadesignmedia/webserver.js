const Log = require('./logger')
const log = new Log('./visits')
const reqIP = req => (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim() || req.ip
module.exports = (req, res, next) => {
    let data = {
        ip: reqIP(req),
        path: req.path,
        method: req.method,
        params: req.params
    }
    if (!/^\/static/.test(data.path)) log.write(JSON.stringify(data))
    next()
}