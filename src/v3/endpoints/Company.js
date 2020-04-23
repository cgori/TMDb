import Util from '../../Util';

import ID from '../ID';
import SearchEndpoint from './Search';

import paths from '../paths/Company';

/**
 * Company endpoint.
 * @see https://developers.themoviedb.org/3/companies
 *
 * @prop {number} id TMDb ID
 * @prop {Object} paths Endpoint paths
 * @extends {Util}
 */
class CompanyEndpoint extends Util {
    /**
     * Creates an instance of CompanyEndpoint.
     *
     * @param {number} version API version
     * @param {Object} defaultOptions Default request options
     */
    constructor(version, defaultOptions) {
        super(version, defaultOptions);

        this.id = null;

        this.paths = paths;
        this.externalSources = { imdb_id: /co\d+/ };
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
            'company_results',
            search.getCompanies
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
     * Get a companies details by id.
     * @see https://developers.themoviedb.org/3/companies/get-company-details
     *
     * @param {Object} [options] Request options
     * @returns {Promise<CompanyEndpoint>}
     */
    async getDetails(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        try {
            this.details = await this.request('GET', this.createPath(this.paths.details), options);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get the alternative names of a company.
     * @see https://developers.themoviedb.org/3/companies/get-company-alternative-names
     *
     * @param {Object} [options] Request options
     * @returns {Promise<CompanyEndpoint>}
     */
    async getAlternativeNames(options = {}) {
        if (!this.id) return Promise.reject(Error(this.message.idRequired));

        const values = ['GET', this.createPath(this.paths.alertnativeNames), options];

        try {
            this.alertnativeNames = await this.request(...values);
        } catch (error) {
            return Promise.reject(error);
        }

        return this;
    }

    /**
     * Get a companies logos by id..
     * @see https://developers.themoviedb.org/3/companies/get-company-images
     *
     * @param {Object} [options] Request options
     * @returns {Promise<CompanyEndpoint>}
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
}

export default CompanyEndpoint;
