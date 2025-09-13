const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, min: 1970 },
  price: { type: Number, min: 0 },
  isElectric: { type: Boolean, default: false },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
