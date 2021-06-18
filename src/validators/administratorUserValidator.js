const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(4).max(255),
      email: Joi.string().required().min(8).max(255).email(),
      password: Joi.string().required().min(6).max(255),
      cep: Joi.string().required().min(9).max(255),
      street: Joi.string().required().min(4).max(255),
      state: Joi.string().required().min(2).max(255),
      number: Joi.string().required().min(1).max(255),
      city: Joi.string().required().min(2).max(255),
      cnpj: Joi.string().required().min(18).max(255),
      telefone: Joi.string().required().min(11).max(255),
    }),
  }),
};     




