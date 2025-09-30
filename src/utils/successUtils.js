export const sendSuccessResponse = (res, data = null, options = {}) => {
    const {
        status = 200,
        pagination,
        message = 'success',
    } = options;

    return res.status(status).json({
        message,
        data,
        pagination,
    });
};

export const normalizeSingleProduct = (product) => {
    if (!product) return null;

    // eslint-disable-next-line no-unused-vars
    const { __v, _id, images, ...rest } = product?.toObject
        ? product.toObject()
        : product;

    return {
        id: _id,
        images: images.map(({ id, fileName, url }) => ({
            id,
            fileName,
            url,
        })),
        ...rest,
    };
};

export const normalizeProductResponse = (data) => {
    if (!data) return null;

    if (Array.isArray(data)) {
        // Normalize each product in the array
        return data.map(normalizeSingleProduct);
    }

    // Normalize a single product object
    return normalizeSingleProduct(data);
};