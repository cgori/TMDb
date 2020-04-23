import Util from '../../Util';

import ID from '../ID';
import SearchEndpoint from './Search';

import paths from '../paths/tv';

/**
 * TV endpoint.
 * @see https://developers.themoviedb.org/3/tv
 *
 * @prop {number} id TMDb ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class TVEndpoint extends Util {
    /**
     * Creates an instance of TVEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        super(version, defaultOptions);

        this.id = null;

        this.paths = paths;
        this.externalSources = { imdb_id: /tt\d+/ };
    }

    /**
     * Set the TMDb ID.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {TVEndpoint}
     */
    async setId(method) {
        if (this.id) return Promise.reject(Error(this.message.idAlreadySet));

        const search = new SearchEndpoint(this.version, this.defaultOptions);
        const helper = new ID(
            this.version,
            this.defaultOptions,
            this.externalSources,
            'tv_results',
            search.getTVShows
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
     * Get the primary information about a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-details
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getDetails(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.details), options];
        const append = options.append_to_response.split(',');

        try {
            const response = await this.request(...values);

            for (let i = 0; i < append.length; i += 1) {
                const endpoint = append[i];

                this[endpoint] = response[endpoint];
                delete response[endpoint];
            }

            this.details = response;
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get all of the alternative titles for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-alternative-titles
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getAlternativeTitles(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.alternativeTitles), options];

        try {
            this.alternativeTitles = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the changes for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-changes
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async changes(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.changes = await this.request('GET', this.createPath(this.paths.changes), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the list of content ratings (certifications) that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-content-ratings
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getContentRatings(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.contentRatings), options];

        try {
            this.contentRatings = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the credits (cast and crew) for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.credits = await this.request('GET', this.createPath(this.paths.credits), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get all of the episode groups that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-episode-groups
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getEpisodeGroups(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.episodeGroups), options];

        try {
            this.episodeGroups = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the external IDs for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-external-ids
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getExternalIds(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.externalIds), options];

        try {
            this.externalIds = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the images that belong to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getImages(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.images = await this.request('GET', this.createPath(this.paths.images), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the keywords that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getKeywords(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.keywords), options];

        try {
            this.keywords = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get a list of recommended TV shows for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-recommendations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getRecommendations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.recommendations), options];

        try {
            this.recommendations = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the user reviews for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-reviews
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getReviews(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.reviews = await this.request('GET', this.createPath(this.paths.reviews), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get a list of seasons or episodes that have been screened in a film festival or theatre.
     * @see https://developers.themoviedb.org/3/tv/get-screened-theatrically
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getScreenedTheatrically(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.screenedTheartically), options];

        try {
            this.screenedTheartically = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get a list of similar TV shows.
     * @see https://developers.themoviedb.org/3/tv/get-similar-tv-shows
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getSimilar(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.similar = await this.request('GET', this.createPath(this.paths.similar), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get a list of translations that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getTranslations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.translations), options];

        try {
            this.translations = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the videos that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-videos
     *
     * @param {Object} [options] Request options
     * @returns {Promise<TVEndpoint>}
     */
    async getVideos(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.videos = await this.request('GET', this.createPath(this.paths.videos), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Rate a TV show.
     * @see https://developers.themoviedb.org/3/tv/rate-tv-show
     *
     * @param {Object} [options] Request options
     * @param {Object} [content] Request content
     * @returns {Promise<Object>}
     */
    async addRating(content = {}, options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('POST', this.createPath(this.paths.rating), options, content);
    }

    /**
     * Remove a rating for a TV show.
     * @see https://developers.themoviedb.org/3/tv/rate-tv-show
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async removeRating(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        return this.request('DELETE', this.createPath(this.paths.rating), options);
    }
}

/**
 * TV endpoint simple.
 * @see https://developers.themoviedb.org/3/tv
 *
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
export class TVEndpointSimple extends Util {
    /**
     * Creates an instance of TVEndpointSimple.
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
     * Grab TV related account states for a session.
     * @see https://developers.themoviedb.org/3/tv/get-tv-account-states
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAccountStates(options = {}) {
        return this.request('GET', this.createPath(this.paths.accountStates), options);
    }

    /**
     * Get the most newly created TV show.
     * @see https://developers.themoviedb.org/3/movies/get-latest-tv
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getLatest(options = {}) {
        return this.request('GET', this.createPath(this.paths.latest), options);
    }

    /**
     * Get a list of TV shows that are airing today.
     * @see https://developers.themoviedb.org/3/tv/get-tv-airing-today
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAiringToday(options = {}) {
        return this.request('GET', this.createPath(this.paths.airingToday), options);
    }

    /**
     * Get a list of shows that are currently on the air.
     * @see https://developers.themoviedb.org/3/tv/get-tv-airing-today
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getOnTheAir(options = {}) {
        return this.request('GET', this.createPath(this.paths.onTheAir), options);
    }

    /**
     * Get a list of the current popular TV shows on TMDb.
     * @see https://developers.themoviedb.org/3/tv/get-popular-tv-shows
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getPopular(options = {}) {
        return this.request('GET', this.createPath(this.paths.popular), options);
    }

    /**
     * Get the top rated TV shows on TMDb.
     * @see https://developers.themoviedb.org/3/tv/get-top-rated-tv
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTopRated(options = {}) {
        return this.request('GET', this.createPath(this.paths.topRated), options);
    }
}
