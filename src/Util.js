import axios from 'axios';

import message from './message';

/**
 * Util.
 *
 * @prop {Object} message Common messages
 * @prop {string} baseUrl API base URL
 * @prop {number} version API version
 * @prop {Object} defaultOptions Default request options
 */
class Util {
    /**
     * Creates an instance of Util.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        this.message = message;

        this.baseUrl = `https://api.themoviedb.org/`;
        this.version = version;

        this.defaultOptions = defaultOptions;
    }

    /**
     * Send request to API.
     *
     * @param {string} method Request Method
     * @param {string} path Request endpoint path
     * @param {Object} [options] Request options
     * @param {Object} [content] Request content
     * @param {Object} [headers] Request headers
     * @returns {Promise<Object>}
     */
    async request(method, path, options = {}, content = {}, headers = {}) {
        if (!method) return Promise.reject(Error(this.message.methodRequired));
        if (!path) return Promise.reject(Error(this.message.pathRequired));

        method = method.toUpperCase();

        if (method === 'POST')
            headers = { 'Content-Type': 'application/json;charset=utf-8', ...headers };

        try {
            const { data: response } = await axios({
                method,
                url: this.baseUrl + this.version + path,
                params: { ...this.defaultOptions, ...options },
                body: content,
                headers,
            });

            return response;
        } catch (error) {
            if (error.response) return Promise.reject(error.response);
            if (error.request)
                return Promise.reject(Error('Request was made but no response was received.'));

            return Promise.reject(Error('Unknown error when sending request.'));
        }
    }
}

export default Util;
