const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

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

const contactRoutes = require('./routes/ContactRoute');
app.use('/api/contact', contactRoutes);

// ------------------ Importing routes ------------------

app.get('/', (req, res) => {
    res.render('test');
});


app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});