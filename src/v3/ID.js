import message from '../message';

import FindEndpoint from './endpoints/Find';
import SearchEndpoint from './endpoints/Search';

/**
 * Identifier helper.
 *
 * @prop {string} resultsObject Results Object to get results from for external ID
 * @prop {Function} searchFunction Search function to get results for query
 */
class ID {
    /**
     * Creates an instance of ID.
     *
     * @param {Object} externalSources External sources
     * @param {string} resultsObject Results Object to get results from for external ID
     * @param {Function} searchFunction Search function to get results for query
     */
    constructor(version, defaultOptions, externalSources, resultsObject, searchFunction) {
        this.version = version;
        this.defaultOptions = defaultOptions;

        this.externalSources = externalSources;

        this.resultsObject = resultsObject;
        this.searchFunction = searchFunction.bind(
            new SearchEndpoint(this.version, this.defaultOptions)
        );

        this.defaultId = /t(\d+)/;
    }

    /**
     * Get the external source from an external ID.
     *
     * @param {string} externalId External ID
     * @returns {string}
     */
    getExternalSource(externalId) {
        const sources = Object.keys(this.externalSources);
        const sourceValues = Object.values(this.externalSources);

        for (let i = 0; i < sources.length; i += 1) {
            const source = sources[i];
            const validate = sourceValues[i];

            if (validate.test(externalId)) return source;
        }

        return false;
    }

    /**
     * Get the TMDb ID from an external ID.
     *
     * @param {string} externalId External ID
     * @returns {Promise<number>}
     */
    async getIdFromExternalSource(externalId) {
        const source = this.getExternalSource(externalId);
        if (!source) return Promise.reject(Error());

        const find = new FindEndpoint(this.version, this.defaultOptions).setExternalId(externalId);

        try {
            const response = await find.byExternalId({ external_source: source });

            const results = response[this.resultsObject];
            if (results.length === 0) throw new Error(message.noResults);

            return results[0].id;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Get the TMDb ID from a query.
     *
     * @param {string} query Query
     * @returns {Promise<number>}
     */
    async getIdFromQuery(query) {
        try {
            const response = await this.searchFunction({ query });
            if (response.total_results === 0) return Promise.reject(Error(message.noResults));

            return response.results[0].id;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Get TMDb ID from a method.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {Promise<number>}
     */
    async getId(method) {
        if (method.id) return method.id;

        if (method.externalId) {
            const isDefault = method.externalId.match(this.defaultId);

            if (isDefault) return isDefault[1];

            try {
                return await this.getIdFromExternalSource(method.externalId);
            } catch (error) {
                if (!method.query) return Promise.reject(error);
            }
        }

        if (method.query) return this.getIdFromQuery(method.query);

        return Promise.reject(Error(message.methodRequired));
    }
}

export default ID;
