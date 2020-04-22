import Util from '../../Util';
import paths from '../paths/find';

/**
 * Find endpoint.
 * @see https://developers.themoviedb.org/3/find
 *
 * @prop {number} externalId External ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
class FindEndpoint extends Util {
    /**
     * Creates an instance of FindEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        super(version, defaultOptions);

        this.externalId = null;

        this.paths = paths;
    }

    /**
     * Set the external ID.
     *
     * @param {string} externalId External ID
     * @returns {FindEndpoint}
     */
    setExternalId(externalId) {
        if (this.externalId) return Promise.reject(Error(this.message.idAlreadySet));

        this.externalId = externalId;

        return this;
    }

    /**
     * Create path for an endpoint.
     *
     * @param {string} value Endpoint path
     * @returns {string}
     */
    createPath(value) {
        return this.paths.base + value.replace('{externalId}', this.externalId);
    }

    /**
     * Get TMDb ID from external ID for all media types.
     * @see https://developers.themoviedb.org/3/find/find-by-id
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async byExternalId(options = {}) {
        if (!this.externalId) return Promise.reject(Error(this.message.externalIdRequired));

        return this.request('GET', this.createPath(this.paths.byExternalId), options);
    }
}

export default FindEndpoint;
