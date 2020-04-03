import FindEndpoint from './endpoints/Find';
import MovieEndpoint from './endpoints/Movie';
import TVEndpoint from './endpoints/TV';
import PersonEndpoint from './endpoints/Person';
import SearchEndpoint from './endpoints/Search';

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
     * @param {string} [externalId] External ID
     * @returns {FindEndpoint}
     */
    find(externalId) {
        return new FindEndpoint(this.version, this.defaultOptions, externalId);
    }

    /**
     * Movie endpoint.
     *
     * @param {number} [id] TMDb ID
     * @returns {MovieEndpoint}
     */
    movie(id) {
        return new MovieEndpoint(this.version, this.defaultOptions, id);
    }

    /**
     * TV endpoint.
     *
     * @param {number} [id] TMDb ID
     * @returns {TVEndpoint}
     */
    tv(id) {
        return new TVEndpoint(this.version, this.defaultOptions, id);
    }

    /**
     * Person endpoint.
     *
     * @param {number} [id] TMDb ID
     * @returns {PersonEndpoint}
     */
    person(id) {
        return new PersonEndpoint(this.version, this.defaultOptions, id);
    }

    /**
     * Search endpoint.
     *
     * @returns {PersonEndpoint}
     */
    search() {
        return new SearchEndpoint(this.version, this.defaultOptions);
    }
}

export default V3;
