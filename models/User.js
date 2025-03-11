// importer mongoose
const mongoose = require('mongoose');

// creer un schema mongoose
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

// creer un modele 
const User = mongoose.model('User', userSchema);

// Exporter mon modèle
module.exports = User;