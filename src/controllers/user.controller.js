import { signJWT } from "../utils/jwt";
import models from "../database/models";
const bcrypt = require("bcrypt");
const { User } = models;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      attributes: { exclude: ["createdAt","updatedAt"] },
      where: {
        email,
      },
    });
    if (!user) res.status(404).json({ msg: "Usuario no encontrado" });
    else {
      if (bcrypt.compareSync(password, user.password)) {
        const token = signJWT(user.id);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ msg: "Contraseña incorrecta" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  const { name, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user.email) {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      await res.json(newUser);
    } else {
      res.status(401).json({ msg: "El email ya existe" });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
const user = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ["password","createdAt","updatedAt"] },
      where: {
        id: req.userId
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  login,
  register,
  user,
};

