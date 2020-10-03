'use strict'
const AcceptedColors = require('./accepted_colors')

module.exports = {
    clone: function (data) {
        if (typeof data === "object") {
            return JSON.parse(JSON.stringify(data))
        } else {
            return data
        }
    },
    get acceptedColors() {
        return new AcceptedColors()
    }
}