import Util from '../../Util';
import paths from '../paths/search';

/**
 * Search endpoint.
 * @see https://developers.themoviedb.org/3/search
 *
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
class SearchEndpoint extends Util {
    /**
     * Creates an instance of MovieEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        super(version, defaultOptions);

        this.paths = paths;
    }

    /**
     * Create path for an endpoint.
     *
     * @param {string} value Endpoint path
     * @returns {string}
     */
    createPath(value) {
        return this.paths.base + value;
    }

    /**
     * Search for companies.
     * @see https://developers.themoviedb.org/3/search/search-companies
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getCompanies(options = {}) {
        return this.request('GET', this.createPath(this.paths.companies), options);
    }

    /**
     * Search for collections.
     * @see https://developers.themoviedb.org/3/search/search-collections
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getCollections(options = {}) {
        return this.request('GET', this.createPath(this.paths.collections), options);
    }

    /**
     * Search for keywords.
     * @see https://developers.themoviedb.org/3/search/search-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getKeywords(options = {}) {
        return this.request('GET', this.createPath(this.paths.keywords), options);
    }

    /**
     * Search for movies.
     * @see https://developers.themoviedb.org/3/search/search-movies
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getMovies(options = {}) {
        return this.request('GET', this.createPath(this.paths.movies), options);
    }

    /**
     * Search for movies, TV shows and people in a single request.
     * @see https://developers.themoviedb.org/3/search/multi-search
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async multi(options = {}) {
        return this.request('GET', this.createPath(this.paths.multi), options);
    }

    /**
     * Search for people.
     * @see https://developers.themoviedb.org/3/search/search-people
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getPeople(options = {}) {
        return this.request('GET', this.createPath(this.paths.people), options);
    }

    /**
     * Search for TV shows.
     * @see https://developers.themoviedb.org/3/search/search-tv-shows
     *
     * @param {Object} options Request options
     * @returns {Promise<Object>}
     */
    async getTVShows(options = {}) {
        return this.request('GET', this.createPath(this.paths.tv), options);
    }
}

export default SearchEndpoint;
