var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
  name: String,
  surname: String,
  email: String,
  edad: Number,
  pwd: String
},
{timestamps: true}
);

module.exports = mongoose.model('Users', userSchema);
