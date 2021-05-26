const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      hour: Joi.string().max(255),
      date: Joi.string().required().max(255),
      limit_person: Joi.string().max(255),
      duration: Joi.string().required().max(255),
      traningCategory: Joi.required(),
    }),
  }),
};
