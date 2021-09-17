const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB online');
    } catch (error) {
        console.error(error);
        throw new Error('Error en base de datos');
    }
}

module.exports = { dbConnection };