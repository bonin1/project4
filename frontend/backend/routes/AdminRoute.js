const express = require('express');
const router = express.Router();

const upload = require('../config/UploadConfig');
const { UserLogin } = require('../controllers/UserAuth/Login');
const { CreateProject } = require('../controllers/Projects/CRUDoperations');


router.post('/create-project', upload.fields([
    { name: 'Image', maxCount: 1 },
    { name: 'aditional_images', maxCount: 5 },
    { name: 'Video', maxCount: 1 },
    { name: 'Document', maxCount: 1 }
]), CreateProject);

router.post('/login', UserLogin);

module.exports = router;