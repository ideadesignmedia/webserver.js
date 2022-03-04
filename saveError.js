const Log = require('./logger')
const log = new Log('./errors')
module.exports = e => {
    console.log(e)
    log.write(e)
}