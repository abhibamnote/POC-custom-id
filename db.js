const mongoose = require('mongoose');


const dbConnection = async () =>{
    try {
        const db = await mongoose.connect(`mongodb://localhost:27017/ID_POC`);

        console.log(`DB is connected to: ${db.connection.host}`)

    } catch (error) {
        console.error("Mongoose Connection Error", error);
    }
}


module.exports = dbConnection;