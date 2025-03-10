const mongoose = require('mongoose')

const mongoDBDConection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Vous etes connecté à mongoDB Atlas');
    
  } catch (error) {
    console.error('Connection échoué:',error.message);
    
  }
}


module.exports = mongoDBDConection;