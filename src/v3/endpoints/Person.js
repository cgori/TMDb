import Util from '../../Util';

import ID from '../ID';
import SearchEndpoint from './Search';

import paths from '../paths/person';

/**
 * Person endpoint.
 * @see https://developers.themoviedb.org/3/people
 *
 * @prop {number} id TMDb ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class PersonEndpoint extends Util {
    /**
     * Creates an instance of MovieEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        super(version, defaultOptions);

        this.id = null;

        this.paths = paths;
        this.externalSources = { imdb_id: /nm\d+/ };
    }

    /**
     * Set the TMDb ID.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {PersonEndpoint}
     */
    async setId(method) {
        if (this.id) return Promise.reject(Error(this.message.idAlreadySet));

        const search = new SearchEndpoint(this.version, this.defaultOptions);
        const helper = new ID(
            this.version,
            this.defaultOptions,
            this.externalSources,
            'person_results',
            search.getPeople
        );

        try {
            this.id = await helper.getId(method);

            return this;
        } catch (error) {
            Promise.reject(error);
        }
    }

    /**
     * Create path for an endpoint.
     *
     * @param {string} value Endpoint path
     * @returns {string}
     */
    createPath(value) {
        return this.paths.base + value.replace('{id}', this.id);
    }

    /**
     * Get the primary information about a person.
     * @see https://developers.themoviedb.org/3/people/get-person-details
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getDetails(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.details), options);
    }

    /**
     * Get the changes for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-changes
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getChanges(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.changes), options);
    }

    /**
     * Get the movie credits for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-movie-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getMovieCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.movieCredits), options);
    }

    /**
     * Get the TV show credits for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-tv-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTVCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.tvCredits), options);
    }

    /**
     * Get the movie and TV credits together for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-combined-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getCombinedCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.combinedCredits), options);
    }

    /**
     * Get the external IDs for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-external-ids
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getExternalIds(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.externalIds), options);
    }

    /**
     * Get the images for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getImages(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.images), options);
    }

    /**
     * Get the images that this person has been tagged in.
     * @see https://developers.themoviedb.org/3/people/get-tagged-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTaggedImages(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.taggedImages), options);
    }

    /**
     * Get a list of translations that have been created for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTranslations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.translations), options);
    }
}

/**
 * Person endpoint simple.
 * @see https://developers.themoviedb.org/3/people
 *
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class PersonEndpointSimple extends Util {
    /**
     * Creates an instance of MovieEndpointSimple.
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
     * Get the most newly created person.
     * @see https://developers.themoviedb.org/3/people/get-latest-person
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getLatest(options = {}) {
        return this.request('GET', this.createPath(this.paths.latest), options);
    }

    /**
     * Get a list of the current popular people on TMDb. This list updates daily.
     * @see https://developers.themoviedb.org/3/people/get-popular-people
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getPopular(options = {}) {
        return this.request('GET', this.createPath(this.paths.popular), options);
    }
}
