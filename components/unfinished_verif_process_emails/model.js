let mongoose = require('mongoose');

const unverifAccSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo es necesario'],
    unique: true,
    lowercase: true,
  },
  creation_date: {
    type: Date,
    immutable: true,
  },
});

const model = mongoose.model('unverifAcc', unverifAccSchema);
module.exports = model;
