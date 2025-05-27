const mongoose = require('mongoose');

//Connection logic
mongoose.connect(process.env.CONN_STRING);

//connection state
const db = mongoose.connection;

//Check DB Connection
db.on('connected', () => {
    console.log('DB Connection Successful!');
});

db.on('error', (err) => {
    console.error('DB Connection Failed:', err.message);
});

module.exports = db;
