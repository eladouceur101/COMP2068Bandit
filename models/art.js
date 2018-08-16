const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'There was no name.',
  },
  born: {
    type: Date,
    required: 'Enter date of birth.',
  },
  died: {
    type: Date,
  },
  nationality: {
    type: String,
    required: 'Please enter artists country of origin',
  },
});

const artSchema = new mongoose.Schema({
  artName: {
    type: String,
    required: 'There was no name.',
  },
  imgURL: {
    type: String,
    required: 'Enter path to image.',
  },
  description: {
    type: String,
    required: 'No description added.',
  },
  price: {
    type: Number,
    default: 0,
    required: 'Please enter sale value.',
  },
  artist: artistSchema,
});

module.exports = mongoose.model('Art', artSchema);
