const Users = require("./../model/User");

exports.registerUser = (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;
  const users = Users.get();
  if (password === confirmPassword) {
    if (users.find((user) => user.email === email)) {
      res.send("User already registred .");
    }
  }
  res.status(200).json({
    status: "success",
    data: {
      user: "User added successfully !...",
    },
  });
};
