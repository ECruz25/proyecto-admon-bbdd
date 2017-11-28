const mongoose = require('mongoose');
const User = require('../models/User');
const promisify = require('es6-promisify');

exports.register = async (req, res, next) => {
  console.log('hola');
  const user = new User({ username: req.body.form.username });
  const register = promisify(User.register, User);
  await register(user, req.body.form.password);
  console.log(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
