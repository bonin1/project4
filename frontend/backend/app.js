const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const cors = require('cors');

const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://productiondomain.com'] 
    : ['http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------------------ Importing models ------------------
const syncModels = require('./models/ALLMODELSSYNC');
syncModels();
// ------------------ Importing models ------------------



// ------------------ Importing routes ------------------

const projectRoutes = require('./routes/ProjectRoute');
app.use('/projects', projectRoutes);

const adminRoutes = require('./routes/AdminRoute');
app.use('/admin', adminRoutes);


// ------------------ Importing routes ------------------


app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});