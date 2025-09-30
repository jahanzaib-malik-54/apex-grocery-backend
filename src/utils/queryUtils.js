import { createError } from "./errorUtils.js";

export const sortOrder = Object.freeze({ ASC: 'asc', DESC: 'desc' });
export const userStatus = ['active', 'inactive'];

/**
 * Build MongoDB query object for filtering, sorting, and pagination.
 * @param {Object} queryParams - The query parameters from the request.
 * @param {Object} filterableFields - Configuration for filterable fields.
 * @param {Object} sortableFields - List of sortable fields.
 * @returns {Object} - MongoDB query, sort object, pagination metadata.
 */
export const buildQuery = (queryParams, filterableFields, sortableFields) => {
    const {
        page = 0,
        rowsPerPage = 25,
        sortBy,
        order = 'desc',
        filters,
    } = queryParams;

    let query = {};

    let parsedFilters;
    if (filters) {
        try {
            parsedFilters = JSON.parse(filters);
        } catch (error) {
            console.log("🚀 ~ buildQuery ~ error:", error)
            const _error = createError({
                message: 'Filters must be a valid JSON string.',
                statusCode: 400,
                param: 'query-params',
            });
            throw _error;
        }

        // Process parsed filters
        Object.entries(parsedFilters).forEach(([field, value]) => {
            const fieldConfig = filterableFields[field];
            if (!fieldConfig) return;
            if (fieldConfig?.options && !fieldConfig.options.includes(value)) {
                const e = createError({
                    message: `The provided value "${value}" is not valid. Allowed values are: ${fieldConfig.options.join(
                        ', '
                    )}`,
                    statusCode: 400,
                });
                throw e;
            }

            if (fieldConfig.type === 'text') {
                if (fieldConfig?.options) {
                    query[field] = value; // exact match to handle fields like role, status etc.
                } else {
                    query[field] = { $regex: value, $options: 'i' }; // Case-insensitive match to handle search like name, email etc.
                }
            } else if (fieldConfig.type === 'number') {
                query[field] = { $gte: value.from, $lte: value.to };
            } else if (fieldConfig.type === 'date') {
                query[field] = {
                    $gte: new Date(value.from),
                    $lte: new Date(value.to),
                };
            } else if (
                fieldConfig.type === 'list' &&
                fieldConfig.options.includes(value)
            ) {
                query[field] = value;
            }
        });
    }

    // Handle sorting
    let sort = {};
    const _order = order?.toLowerCase();
    if (
        _order &&
        sortableFields?.includes(sortBy) &&
        [sortOrder.ASC, sortOrder.DESC]?.includes(_order)
    ) {
        sort[sortBy] = Number(_order === 'desc' ? -1 : 1);
    } else {
        sort = { createdAt: -1 };
    }

    // Handle pagination
    const skip = page * rowsPerPage;
    const limit = Number(rowsPerPage);

    return { query, sort, skip, limit };
};

/**
 * Format the response for pagination metadata.
 * @param {number} total - Total number of records.
 * @param {number} page - Current page.
 * @param {number} rowsPerPage - Rows per page.
 * @returns {Object} - Pagination metadata.
 */
export const getPaginationMetadata = (total, page, rowsPerPage) => {
    return {
        total,
        page: Number(page),
        rowsPerPage: Number(rowsPerPage),
        pageCount: Math.ceil(total / rowsPerPage),
    };
};
