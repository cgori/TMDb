import V3 from './v3/V3';
// import V4 from './v4/V4';

/**
 * TMDb API wrapper.
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
     * @param {string} apiKey API key
     * @param {Object} [defaultOptions] Default request options
     * @param {string} [defaultOptions.language=en] Default API response language
     * @param {string} [defaultOptions.region=us] Default API response region
     */
    constructor(apiKey, defaultOptions) {
        if (!apiKey) throw Error('API key required.');

        this.defaultOptions = {
            api_key: apiKey,
            language: 'en',
            region: 'us',

            ...defaultOptions,
        };

        this.v3 = new V3(this.defaultOptions);
        // this.v4 = new V4(this.defaultOptions);
    }
}

export default TMDb;
