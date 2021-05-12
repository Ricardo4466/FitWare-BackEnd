const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required().min(4).max(255),
      surname: Joi.string().required().min(4).max(255),
      email: Joi.string().required().min(4).max(255).email(),
      password: Joi.string().required().min(6).max(255),
      weight: Joi.string().max(255),
      height: Joi.string().max(255),
      cpf: Joi.string().required().min(14).max(255),
      birth_date: Joi.string().required().max(255),
      celular: Joi.string().required().min(11).max(255),
      cep: Joi.string().required().min(8),
      street: Joi.string().required().min(4),
      state: Joi.string().required().min(2).max(2),
      city: Joi.string().required().min(4),
      image_profile: Joi.string().required().min(4),
    }),
  }),
};
