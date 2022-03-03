const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'senpaiNodeAuth';

const verifyToken = (request, response, next) => {
const token = request.header('authorization');
  if (!token) {
    return response.status(401).json({
      error: "Acceso denegado"
    })
  }
  try {
    const verifiedToken = jwt.verify(token.replace('Bearer ', ''), TOKEN_SECRET);
    request.user = verifiedToken;
    next();
  } catch (error) {
    response.status(400).json({
      error: "El token no es valido"
    })
  }
}

module.exports = {
 TOKEN_SECRET,
 verifyToken
}