var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var agenteSchema = new Schema(
    {
  name: String,
  age: Number,
},
{timestamps: true}
);

module.exports = mongoose.model('Agente', agenteSchema);
