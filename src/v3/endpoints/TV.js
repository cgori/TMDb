import Util from '../../Util';
import paths from '../paths/tv';

/**
 * TV endpoint.
 * @see https://developers.themoviedb.org/3/tv
 *
 * @prop {number} id TMDb ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
class TVEndpoint extends Util {
    /**
     * Creates an instance of TVEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     * @param {number} [id] TMDb ID
     */
    constructor(version, defaultOptions, id) {
        super(version, defaultOptions);

        this.id = id;

        this.paths = paths;
    }

    /**
     * Set the TMDb ID.
     *
     * @param {number} id TMDb ID
     * @returns {TVEndpoint}
     */
    setId(id) {
        this.id = id;

        return this;
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
     * @returns {Promise<Object>}
     */
    async getDetails(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.details), options);
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
     * Get all of the alternative titles for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-alternative-titles
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAlternativeTitles(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.alternativeTitles), options);
    }

    /**
     * Get the changes for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-changes
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async changes(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.changes), options);
    }

    /**
     * Get the list of content ratings (certifications) that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-content-ratings
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getContentRatings(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.contentRatings), options);
    }

    /**
     * Get the credits (cast and crew) for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getCredits(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.credits), options);
    }

    /**
     * Get all of the episode groups that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-episode-groups
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getEpisodeGroups(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.episodeGroups), options);
    }

    /**
     * Get the external IDs for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-external-ids
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getExternalIds(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.externalIds), options);
    }

    /**
     * Get the images that belong to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getImages(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.images), options);
    }

    /**
     * Get the keywords that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getKeywords(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.keywords), options);
    }

    /**
     * Get a list of recommended TV shows for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-recommendations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getRecommendations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.recommendations), options);
    }

    /**
     * Get the user reviews for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-reviews
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getReviews(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.reviews), options);
    }

    /**
     * Get a list of seasons or episodes that have been screened in a film festival or theatre.
     * @see https://developers.themoviedb.org/3/tv/get-screened-theatrically
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getScreenedTheatrically(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.screenedTheartically), options);
    }

    /**
     * Get a list of similar TV shows.
     * @see https://developers.themoviedb.org/3/tv/get-similar-tv-shows
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getSimilar(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.similar), options);
    }

    /**
     * Get a list of translations that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTranslations(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.translations), options);
    }

    /**
     * Get the videos that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-videos
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getVideos(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('GET', this.createPath(this.paths.videos), options);
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
        if (!this.id) return Promise.reject(Error(this.error.noId));

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
        if (!this.id) return Promise.reject(Error(this.error.noId));

        return this.request('DELETE', this.createPath(this.paths.rating), options);
    }

    /**
     * Get the most newly created TV show.
     * @see https://developers.themoviedb.org/3/movies/get-latest-tv
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getLatest(options = {}) {
        if (!this.id) return Promise.reject(Error(this.error.noId));

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

export default TVEndpoint;
