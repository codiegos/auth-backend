import { verifyJWT } from "../utils/jwt";

export default function (req, res, next) {
  const payload = verifyJWT(req.headers.authorization);
  if (payload) {
    req.userId = payload.sub;
    next();
  } else {
    res.status(403);
    return res.send({ error: true, message: "You're not authorized" });
  }
}
