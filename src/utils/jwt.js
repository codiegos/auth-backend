const jwt = require('jsonwebtoken');

export function verifyJWT(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}
export function signJWT(sub) {
  try {
    return jwt.sign({ sub }, process.env.JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.log(error)
    return false;
  }
}
