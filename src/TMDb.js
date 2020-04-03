import V3 from './v3/V3';
// import V4 from './v4/V3';

/**
 * TMDb wrapper.
 *
 * @prop {Object} defaultOptions Default request options
 * @prop {V3} v3 Version 3
 * @prop {V4} v4 Version 4 WIP
 * @extends {Util}
 */
class TMDb {
    /**
     * Creates an instance of TMDb.
     *
     * @param {Object} defaultOptions Default request options
     */
    constructor(defaultOptions) {
        this.defaultOptions = {
            api_key: null,
            language: 'en',
            region: 'us',

            ...defaultOptions,
        };

        if (!this.defaultOptions.api_key) throw Error('API key required.');

        this.v3 = new V3(this.defaultOptions);
        // this.v4 = new V4(this.defaultOptions);
    }
}

export default TMDb;
