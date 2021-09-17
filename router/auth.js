
/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// Create new users
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido es obligatorio').isEmail(),
    validateFields
], createUser);

// Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], loginUser);

// Revalidate token
router.get('/renew', validateJWT, renewToken);

module.exports = router;