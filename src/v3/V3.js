import FindEndpoint from './endpoints/Find';
import SearchEndpoint from './endpoints/Search';

import { MovieEndpoint, MovieEndpointSimple } from './endpoints/Movie';
import { TVEndpoint, TVEndpointSimple } from './endpoints/TV';
import { PersonEndpoint, PersonEndpointSimple } from './endpoints/Person';

/**
 * Version 3.
 *
 * @prop {number} version API version
 * @prop {Object} defaultOptions Default request options
 */
class V3 {
    /**
     * Creates an instance of V3.
     *
     * @param {Object} defaultOptions Default request options
     */
    constructor(defaultOptions) {
        this.version = 3;
        this.defaultOptions = defaultOptions;
    }

    /**
     * Find endpoint.
     *
     * @param {Object} method Method
     * @param {string} [mehtod.externalId] External ID
     * @returns {FindEndpoint}
     */
    findEndpoint(method) {
        return new FindEndpoint(this.version, this.defaultOptions).setExternalId(method.externalId);
    }

    /**
     * Search endpoint.
     *
     * @returns {PersonEndpoint}
     */
    searchEndpoint() {
        return new SearchEndpoint(this.version, this.defaultOptions);
    }

    /**
     * Movie endpoint.
     *
     * @param {Object} [method] Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [mehtod.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {(MovieEndpoint | MovieEndpointSimple)}
     */
    async movieEndpoint(method) {
        return method
            ? new MovieEndpoint(this.version, this.defaultOptions).setId(method)
            : new MovieEndpointSimple(this.version, this.defaultOptions);
    }

    /**
     * TV endpoint.
     *
     * @param {Object} [method] Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [mehtod.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {(TVEndpoint | TVEndpointSimple)}
     */
    tvEndpoint(method) {
        return method
            ? new TVEndpoint(this.version, this.defaultOptions).setId(method)
            : new TVEndpointSimple(this.version, this.defaultOptions);
    }

    /**
     * Person endpoint.
     *
     * @param {Object} [method] Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [mehtod.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {(PersonEndpoint | PersonEndpointSimple)}
     */
    personEndpoint(method) {
        return method
            ? new PersonEndpoint(this.version, this.defaultOptions).setId(method)
            : new PersonEndpointSimple(this.version, this.defaultOptions);
    }
}

export default V3;
