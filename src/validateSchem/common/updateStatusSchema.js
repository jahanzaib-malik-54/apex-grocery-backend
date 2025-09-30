import Joi from 'joi';

export const updateStatusSchema = Joi.object({
    status: Joi.string().valid('active', 'inactive'),
});

export default updateStatusSchema;
