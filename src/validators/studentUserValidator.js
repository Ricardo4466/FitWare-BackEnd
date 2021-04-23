const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            first_name: Joi.string()
            .required()
            .min(4)
            .max(255),

            surname: Joi.string()
            .required()
            .min(4)
            .max(255),
            
            email: Joi.string()
            .required()
            .min()
        })
    })
}