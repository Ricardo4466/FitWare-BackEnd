const request = require("supertest");
const app = require("../../src/app");

const connection = require("../../src/database");


describe("STUDENTS", () => {

  afterAll(() => {
    connection.close();
  });

  it("há a possibilidade de cadastrar um estudante", async () => {

    const response = await request(app).post("/userAcademy").send({
      first_name: "Ricardo",
      surname: "Teixeira lima",
      email: "ricardolima26082003@gmail.com",
      password: "123456",
      weight: "69.0",
      height: "1.70",
      cpf: "000.000.000-62",
      birth_date: "2002-07-12",
      celular: "11900000001",
      image_profile: "ssss.jpeg",
      cep: "06663501",
      street: "rua dos acreanos",
      state: "SP",
      city: "Itapevi",

    });

    expect(response.ok).toBeTruthy();
    expect(response.body.user_student).toHaveProperty("user_student_id");


  });

  
  it("Não é possível cadastrar um aluno com cpf existente", async () => {
    let response = await request(app).post("/userAcademy").send({
      first_name: "Ricardo",
      surname: "Teixeira lima",
      email: "ricardolima26082003@gmail.com",
      password: "123456",
      weight: "69.0",
      height: "1.70",
      cpf: "000.000.000-62",
      birth_date: "2002-07-12",
      celular: "11900000001",
      image_profile: "ssss.jpeg",
      cep: "06663501",
      street: "rua dos acreanos",
      state: "SP",
      city: "Itapevi",
    });

    response = await request(app).post("/userAcademy").send({
      first_name: "Ricardo",
      surname: "Teixeira lima",
      email: "ricardolima26082003@gmail.com",
      password: "123456",
      weight: "69.0",
      height: "1.70",
      cpf: "000.000.000-62",
      birth_date: "2002-07-12",
      celular: "11900000001",
      image_profile: "ssss.jpeg",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Ops... Esse CPF ja esta cadastrado!");
  });

});
