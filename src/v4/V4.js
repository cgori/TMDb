/**
 * Version 4 WIP.
 *
 * @prop {number} version API version
 * @prop {Object} defaultOptions Default request options
 */
class V4 {
    /**
     * Creates an instance of V4.
     *
     * @param {Object} defaultOptions Default request options
     */
    constructor(defaultOptions) {
        this.version = 4;
        this.defaultOptions = defaultOptions;
    }
}

export default V4;
