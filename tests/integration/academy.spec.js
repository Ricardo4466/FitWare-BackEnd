const request = require("supertest");
const app = require("../../src/app");

const connection = require("../../src/database");

describe("ACADEMY", () => {
  afterAll(() => {
    connection.close();
  });

  it("há a possibilidade de cadastrar uma academia", async () => {
    const response = await request(app).post("/academy").send({
      name: "ExperienceFit",
      cnpj: "75.295.539/0001-14",
      telefone: "(11) 4578-0983",
      email: "experience@gmail.com",
      password: "55887788",
      cep: "06663-500",
      street: "rua dos acreanos",
      state: "Sao paulo",
      city: "Itapevi",
      number: "08",

    });

    expect(response.ok).toBeTruthy();
  });

  it("Não é possível cadastrar uma academia com email existente", async () => {
    let response = await request(app).post("/academy").send({
      name: "ExperienceFit",
      cnpj: "75.295.539/0001-14",
      telefone: "(11) 4578-0983", 
      email: "experience@gmail.com",
      password: "55887788",
      cep: "06663-500",
      street: "rua dos acreanos",
      state: "Sao paulo",
      number: "08",

      city: "Itapevi",
    });

    response = await request(app).post("/academy").send({
      name: "ExperienceFit",
      cnpj: "75.295.539/0001-14",
      telefone: "(11) 4578-0983",
      email: "experience@gmail.com",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
  });
});
