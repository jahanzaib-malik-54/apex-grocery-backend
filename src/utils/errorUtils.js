export const createError = ({ message, param = null, statusCode = 500, value = null })=> {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.param = param ;
    error.value = value ;
    return error;
};


export const notFoundError = ({ value = null, param = null, message = 'Not Found!' } = {}) => {
    return createError({
        message,
        param,
        statusCode: 404,
        value,
    });
};


