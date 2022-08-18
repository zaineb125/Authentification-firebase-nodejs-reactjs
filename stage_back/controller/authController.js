const Users = require("./../model/User");
const crypto = require("crypto");
const firebase = require("firebase-admin");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_KEY = "my_secret_key";

//Hash password
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};
const JWTtoken = (email) => {
  return jwt.sign({ email }, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
};

//find user by email
exports.findUserByEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await Users.where("email", "==", email).get();
  if (!user.empty) {
    return res.status(201).json({
      ok: true,
      message: "User already registered.",
    });
  } else {
    return res.status(400).json({
      ok: false,
      message: "User isn't registered.",
    });
  }
};

//SignUp
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let i = 0; i < errors.errors.length; i++)
      return res.status(400).json({ msg: errors.errors[i].msg });
  }
  console.log(req.body);
  const { firstName, lastName, address, email, password, confirmPassword } =
    req.body;

  const user = await Users.where("email", "==", email).get();
  if (!user.empty) {
    res.status(403).send({
      message: "User already registered.",
    });
    return;
  } else {
    if (password === confirmPassword) {
      const hashedPassword = getHashedPassword(password);
      const jwt = await JWTtoken(email);
      Users.doc()
        .set({
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          password: hashedPassword,
          jwt: jwt,
        })
        .then(() => {
          // res.cookie("AuthToken", jwt);
          res.send({
            jwt,
            email,
            firstName,
            message: "User successfully created !",
          });
        });
    } else {
      res.send({
        message: "Passwords does not match.",
      });
    }
  }
};

//signIn
exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let i = 0; i < errors.errors.length; i++)
      return res.status(400).json({ msg: errors.errors[i].msg });
  }
  const { email, password } = req.body;
  console.log(req.body);
  const hashedPassword = getHashedPassword(password);
  const user = await Users.where("email", "==", email).get();

  if (user.empty) {
    res.status(403).send({
      message: "User doesn't exist !",
    });
    return;
  } else {
    var userId;
    await Users.where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userId = doc.id;
        });
      });
    const Userpassword = user.docs[0]._fieldsProto.password.stringValue;

    console.log(userId);
    if (Userpassword === hashedPassword) {
      const jwt = JWTtoken(email);

      await Users.doc(userId)
        .update({
          jwt: jwt,
        })
        .then(() => {
          res.send({
            jwt,
            email,
            message: "User successfully loggedin !",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ message: "Incorrect password" });
    }
  }
};

//logout
exports.logout = (req, res) => {
  res.clearCookie("AuthToken");
  res.end();
};

//forget password
exports.forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.where("email", "==", email).get();
  if (user.empty) {
    res.send({
      message: "User doesn't exist !",
    });
    return;
  } else {
    var userId;
    const user = await Users.where("email", "==", email).get();
    await Users.where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userId = doc.id;
        });
      });
    const jwt = await JWTtoken(email);
    res.cookie("AuthToken", jwt);
    const link = `localhost:3000/auth/resetPassword/${userId}/${jwt}`;
    console.log(link);
    res.send("Password reset link has been sent to your email");
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const jwt = req.cookies.AuthToken;
  if (token === jwt) {
    const password = req.body.password;
    const hashedPassword = await getHashedPassword(password);
    await Users.doc(id)
      .update({
        password: hashedPassword,
      })
      .then(() => {
        res.send({
          message: "User updated successfully !",
        });
      });
  } else {
    res.send({
      message: "Not allowed",
    });
  }
};
