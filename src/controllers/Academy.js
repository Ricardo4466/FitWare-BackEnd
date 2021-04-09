const User_Student = require("../models/UserStudent");
const AddressAcademy = require("../models/AddressAcademy");
const Academy = require("../models/Academy");

module.exports = {

    index(req, res){},

    find(req, res){},

    store(req, res){
        const {
            name,
            cnpj,
            telefone,
            email,
            password,
            cep,
            street,
            state,
            city,
        } = req.body;
        try{
            const Address_Academy = AddressAcademy.create({
                cep,
                street,
                state,
                city,
            });

            const AcademyRegister = Academy.create({
                name,
                cnpj,
                telefone,
                email,
                password,
            });
            console.log(AcademyRegister);

            Address_Academy.addAcademy(Address_Academy);

            res.status(201).send({
                AcademyRegister: {
                    academy_id: AcademyRegister.id,
                    name: AcademyRegister.name,
                    cnpj: AcademyRegister.cnpj,
                    telefone: AcademyRegister.telefone,
                    email: AcademyRegister.email,
                    password: AcademyRegister.password,
                }
            });
        }catch (error){
            console.log(error);
            res.status(500).send(error);
        }
    },

    update(req, res){},

    delete(req, res){},

}