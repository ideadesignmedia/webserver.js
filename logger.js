const { createWriteStream } = require('fs')
class Log {
    constructor(doc) {
        this.doc = doc
        this.stream = createWriteStream(this.doc);
    }
    write(message) {
        this.stream.write(`${new Date().toISOString()} - ${message}\n`, 'utf-8');
    }
}

module.exports = Log