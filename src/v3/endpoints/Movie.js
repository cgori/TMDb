import Util from '../../Util';

import SearchEndpoint from './Search';
import ID from '../ID';

import paths from '../paths/movie';

/**
 * Movie endpoint.
 * @see https://developers.themoviedb.org/3/movies
 *
 * @prop {number} id TMDb ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class MovieEndpoint extends Util {
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
        this.externalSources = { imdb_id: /^tt\d+$/ };
    }

    /**
     * Set the TMDb ID.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {MovieEndpoint}
     */
    async setId(method) {
        if (this.id) return Promise.reject(Error(this.message.idAlreadySet));

        const search = new SearchEndpoint(this.version, this.defaultOptions);
        const helper = new ID(
            this.version,
            this.defaultOptions,
            this.externalSources,
            'movie_results',
            search.getMovies
        );

        try {
            this.id = await helper.getId(method);

            return this;
        } catch (error) {
            return Promise.reject(error);
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
     * Get the primary information about a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-details
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getDetails(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.details), options);
    }

    /**
     * Get all of the alternative titles for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-alternative-titles
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAlternativeTitles(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.alternativeTitles), options);
    }

    /**
     * Get the changes for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-changes
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getChanges(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.changes), options);
    }

    /**
     * Get the credits (cast and crew) for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.credits), options);
    }

    /**
     * Get the external ids for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-external-ids
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getExternalIds(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.externalIds), options);
    }

    /**
     * Get the images that belong to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getImages(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.images), options);
    }

    /**
     * Get the keywords that have been added to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getKeywords(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.keywords), options);
    }

    /**
     * Get the release date along with the certification for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-release-dates
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getReleaseDates(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.releaseDates), options);
    }

    /**
     * Get the videos that have been added to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-videos
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getVideos(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.videos), options);
    }

    /**
     * Get a list of translations that have been created for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTranslations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.translations), options);
    }

    /**
     * Get a list of recommended movies for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-recommendations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getRecommendations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.recommendations), options);
    }

    /**
     * Get a list of similar movies.
     * @see https://developers.themoviedb.org/3/movies/get-similar-movies
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getSimilar(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.similar), options);
    }

    /**
     * Get the user reviews for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-reviews
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getReviews(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.reviews), options);
    }

    /**
     * Get a list of lists that this movie belongs to.
     * @see https://developers.themoviedb.org/3/movies/get-movie-lists
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getLists(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('GET', this.createPath(this.paths.lists), options);
    }

    /**
     * Rate a movie.
     * @see https://developers.themoviedb.org/3/movies/rate-movie
     *
     * @param {Object} [options] Request options
     * @param {Object} [content] Request content
     * @returns {Promise<Object>}
     */
    async addRating(options = {}, content = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('POST', this.createPath(this.paths.rating), options, content);
    }

    /**
     * Remove a rating for a movie.
     * @see https://developers.themoviedb.org/3/movies/delete-movie-rating
     *
     * @param {Object} options Request options
     * @returns {Promise<Object>}
     */
    async removeRating(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('DELETE', this.createPath(this.paths.rating), options);
    }
}

/**
 * Movie endpoint simple.
 * @see https://developers.themoviedb.org/3/movies
 *
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class MovieEndpointSimple extends Util {
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
     * Grab movie related account states for a session.
     * @see https://developers.themoviedb.org/3/movies/get-movie-account-states
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAccountStates(options = {}) {
        return this.request('GET', this.createPath(this.paths.accountStates), options);
    }

    /**
     * Get the most newly created movie.
     * @see https://developers.themoviedb.org/3/movies/get-latest-movie
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getLatest(options = {}) {
        return this.request('GET', this.createPath(this.paths.latest), options);
    }

    /**
     * Get a list of movies in theatres.
     * @see https://developers.themoviedb.org/3/movies/get-now-playing
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getNowPlaying(options = {}) {
        return this.request('GET', this.createPath(this.paths.nowPlaying), options);
    }

    /**
     * Get a list of the current popular movies on TMDb.
     * @see https://developers.themoviedb.org/3/movies/get-popular-movies
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getPopular(options = {}) {
        return this.request('GET', this.createPath(this.paths.popular), options);
    }

    /**
     * Get the top rated movies on TMDb.
     * @see https://developers.themoviedb.org/3/movies/get-top-rated-movies
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTopRated(options = {}) {
        return this.request('GET', this.createPath(this.paths.topRated), options);
    }

    /**
     * Get a list of upcoming movies in theatres
     * @see https://developers.themoviedb.org/3/movies/get-upcoming
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getUpcoming(options = {}) {
        return this.request('GET', this.createPath(this.paths.upcoming), options);
    }
}
