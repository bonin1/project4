const express = require('express');
const router = express.Router();

const upload = require('../config/UploadConfig');
const { UserLogin } = require('../controllers/UserAuth/Login');
const { CreateProject, EditProject, DeleteProject } = require('../controllers/Projects/CRUDoperations');
const { verifyToken } = require('../middleware/authMiddleware');
const { VerifyTokenPath } = require('../controllers/UserAuth/VerifyToken');

const uploadFields = [
    { name: 'primary_image', maxCount: 1 },
    { name: 'additional_images', maxCount: 5 },
    { name: 'Video', maxCount: 1 },
    { name: 'Document', maxCount: 1 }
];

router.post('/create-project', upload.fields(uploadFields), CreateProject);

router.put('/edit-project/:id', upload.fields(uploadFields), EditProject);

router.delete('/delete-project/:id', DeleteProject);

router.post('/login', UserLogin);

router.get('/verify-token', verifyToken, VerifyTokenPath);

module.exports = router;