const PersonalTrainer = require("../models/PersonalTrainer");


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

    async find(req, res) {
        const personal_id = req.params.id;

        try {
            let personal = await PersonalTrainer.findByPk(personal_id, {
                attributes: ["id", "name", "email", "specialty"]
            });

            if (!personal)
                return res.status(404).send({ erro: "Personal Trainer não encontrado" });
            res.send(personal);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },

    async store(req, res) {
        const { name, specialty, email, password } = req.body;

        try {

            const PersonalRegister = await PersonalTrainer.create({
                name,
                specialty,
                email,
                password,
            });


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

    update(req, res) {

    },

    delete(req, res) { },
};