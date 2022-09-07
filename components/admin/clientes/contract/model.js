let mongoose = require('mongoose');

const contractsSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  client_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  client_type: {
    type: String,
    required: true,
    lowercase: true,
  },
  client_DNI: {
    type: String,
    required: true,
    lowercase: true,
  },
  company: {
    type: String,
    default: '',
    lowercase: true,
  },
  campaign_type: {
    type: String,
    lowercase: true,
    required: true,
  },
  creation_place: {
    type: String,
    lowercase: true,
    required: true,
  },
  creation_date: {
    type: Date,
    immutable: true,
  },
});

const model = mongoose.model('contract', contractsSchema);
module.exports = model;
