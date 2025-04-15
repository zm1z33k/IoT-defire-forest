const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });
  res.json(newUser);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};