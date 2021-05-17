const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  console.log(authorization);
  

  if (!authorization)
    return res.status(401).send({ error: "Token não informado!" });

  const [bearer, token] = authorization.split(" ");

  if (!token) return res.status(401).send({ error: "Token mal formatado!" });

  try {
    const payload = jwt.verify(token, auth.secret);

    req.UserstudentId = payload.UserstudentId;

    return next();

  } catch (error) {
    res.status(401).send({ error: "Token Invalido" });
  }
};
