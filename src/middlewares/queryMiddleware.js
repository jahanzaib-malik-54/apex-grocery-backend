// import buildQuery  from "../utils/quairyUtils.js";

import {buildQuery} from "../utils/queryUtils.js";

/**
 * Middleware for handling query processing.
 * @param {Object} filterableFields - Configuration for filterable fields.
 * @param {Array} sortableFields - List of sortable fields.
 */
export const queryMiddleware =
    (filterableFields, sortableFields) => (req, res, next) => {
        try {
            const { query, sort, skip, limit } = buildQuery(
                req.query,
                filterableFields,
                sortableFields
            );
            req.queryConfig = { query, sort, skip, limit };
            next();
        } catch (e) {
            console.log('🚀 ~ $$$ ~ queryMiddleware ~ e:', e);
            return next(e);
        }
    };

export default queryMiddleware;
