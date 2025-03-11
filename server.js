require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectToDatabase = require("./config/mongoDBConnexion");

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

// connexion à la base de données
connectToDatabase();

// les middlewares
app.use(express.json());
app.use(cors());


// Récupération de tous les utilisateurs
router.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Création d'un utilisateur
router.post("/users", async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Modification d'un utilisateur
  router.put("users/:id", async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Suppression d'un utilisateur
  router.delete("users/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });  

// Demaré le serveur
app.listen(PORT, () => {
  console.log(`Le server a demaré sur le port http://localhost:${PORT}`);
});
