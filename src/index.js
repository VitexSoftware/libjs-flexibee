
const url = require('url');

/**
 * Current library version
 */
exports.packagename = 'libjs-flexibee';
exports.version = '0.0.1';
exports.url = null;
exports.login = null;
exports.password = null;
exports.company = null;
exports.port = 5434;
exports.method = 'GET';
exports.format = 'json';
exports.apiURL = '/';




/**
 * Take configuration values from JSON Object
 *
 * @param JSON configuration
 * @returns boolen configuration success
 */
exports.configure = function (configuration) {
    configured = true;
    if (configuration.hasOwnProperty('FLEXIBEE_URL') && typeof configuration['FLEXIBEE_URL'] === 'string' && configuration['FLEXIBEE_URL'].length) {
        this.url = configuration.FLEXIBEE_URL;
    } else {
        configured = false;
    }
    if (configuration.hasOwnProperty('FLEXIBEE_LOGIN') && typeof configuration['FLEXIBEE_LOGIN'] === 'string' && configuration['FLEXIBEE_LOGIN'].length) {
        this.login = configuration.FLEXIBEE_LOGIN;
    } else {
        configured = false;
    }

    if (configuration.hasOwnProperty('FLEXIBEE_PASSWORD') && typeof configuration['FLEXIBEE_PASSWORD'] === 'string' && configuration['FLEXIBEE_PASSWORD'].length) {
        this.login = configuration.FLEXIBEE_PASSWORD;
    } else {
        configured = false;
    }
    this.company = configuration.FLEXIBEE_COMPANY;
    return configured;
}

exports.printMsg = function () {
    console.log( this.packagename + " " + this.version + " " + this.url);
}

exports.prepareRequestOptions = function (uri) {
    var flexiURL = url.parse(uri);

    if(flexiURL.hostname == undefined){
        var defaultURL = url.parse(this.url + uri);
        hostname = defaultURL.hostname;
        path = defaultURL.path;
        protocol = defaultURL.protocol;
    } else {
        hostname = flexiURL.hostname;
        protocol = flexiURL.protocol;
    }

    if(flexiURL.port == undefined){
        port = this.port;
    } else {
        port = flexiURL.port;
    }

    this.requestOptions = {
        hostname: hostname,
        protocol: protocol,
        port: port,
        path: path,
        auth: this.login + ":" + this.password,
        agent: false, // create a new agent just for this one request
        method: this.method,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'libjs-flexibee ' + this.version
        }
    };
    return this.requestOptions;
}

/**
 * Get FlexiBee response
 *
 * @param string url
 * @returns {Promise}
 */
exports.getContent = function (url) {

    // return new pending promise
    return new Promise((resolve, reject) => {
        var requestOptions = this.prepareRequestOptions(url);
        // select http or https module, depending on reqested url
        const lib = requestOptions.protocol.startsWith('https') ? require('https') : require('http');
        const request = lib.request(requestOptions, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page ' + url +  ' , status code: ' + response.statusCode));
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
        });
        // handle connection errors of the request
        request.on('error', (err) => reject(err))
    })
};
