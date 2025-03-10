require("dotenv").config( )
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
connectToDatabase = require("./db-connexion/mongoDBConnexion")

const PORT = process.env.PORT || 3000;
const app = express();


// connexion à la base de données

connectToDatabase();

// les middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Welcome BENIE');
})


app.listen(PORT, () => {
    console.log(`Le server a demaré sur le port http://localhost:${PORT}`);
});
