const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(4).max(255),
      email: Joi.string().required().min(8).max(255).email(),
      password: Joi.string().required().min(6).max(255),
    }),
  }),
};
