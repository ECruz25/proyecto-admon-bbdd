const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const connectionSchema = new Schema({
  connectionName: {
    type: String
  },
  client: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  database: {
    type: String
  }
});

module.exports = mongoose.model('Connection', connectionSchema);
