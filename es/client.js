'use strict'

var config = require('./config')
var fs = require('fs-extra')

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config)

    var apiCalls = {
        graph: ({ title, fileName, filePath }) => {
            return fs
                .readJson(`${filePath}${fileName}`)
                .then(data => {
                    return data
                })
                .catch(err => {
                    console.error(err)
                })
        },
    }

    return apiCalls
}

module.exports = client
