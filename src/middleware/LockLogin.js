const user = require("../models/user");
const moment = require("moment");
const crypt = require("./crypt");
const token = require("./authTokens");
const { findById } = require("../models/user");
const LOCK_TIME = 0.5 * 60 * 1000;

const login = async (req, res) => {
  const { usuario, password } = req.body;
  const ahora = Date.now();

  try {
    const usuario = findById(_id);
    let isLocked = usuario.lockUntil > ahora;
    let hasExpired = usuario.lockUntil < ahora;
    const loginAttempts = usuario.loginAttempts;

    if (usuario) {
      if (isLocked) {
        res.json({ status: "400", message: "Esta lockeado el usuario" });
      }
      if (hasExpired) {
        const updates = { $inc: { loginAttempts: 1 } };
        if (usuarioDB.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
          updates.$set = { lockUntil: Date.now() + LOCK_TIME };
        }
        await usuarioDB.updateOne(updates);
      }

      const validPassword = await crypt.compareCrypt(
        password,
        usuario.password
      );
      if (validPassword) {
        await usuario.updateOne({
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 },
        });
      } else {
        const updates = { $inc: { loginAttempts: 1 } };
        if (usuarioDB.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
          updates.$set = { lockUntil: Date.now() + LOCK_TIME };
        }
        await usuarioDB.updateOne(updates);
      }
    } else {
      res.json({ status: "404", message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: "Error en el servidor",
    });
  }
};

module.exports = {
  login,
};
