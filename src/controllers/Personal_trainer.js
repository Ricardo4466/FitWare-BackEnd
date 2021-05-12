const PersonalTrainer = require("../models/PersonalTrainner");


module.exports = {
    async index(req, res) {

        try {
            const personal = await PersonalTrainer.findAll();

            res.send(personal);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },

    find(req, res) { },

    async store(req, res) {
        const { name, specialty, email, password } = req.body;

        try {

            const PersonalRegister = await PersonalTrainer.create({
                name,
                specialty,
                email,
                password,
            });
            //console.log(PersonalTrainer);


            res.status(201).send({
                PersonalRegister: {
                    personal_id: PersonalRegister.id,
                    name: PersonalRegister.name,
                    specialty: PersonalRegister.specialty,
                    email: PersonalRegister.email,
                    password: PersonalRegister.password,
                },

            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    update(req, res) { },

    delete(req, res) { },
};