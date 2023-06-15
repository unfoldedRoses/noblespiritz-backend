const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.post('/register', authController.register);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in with user credentials to obtain an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
router.post('/login', authController.login);

router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({ user: req.user });
    }
  );
  
  router.get(
    '/admin',
    passport.authenticate('jwt', { session: false, roles: ['admin'] }),
    (req, res) => {
      res.json({ message: 'Welcome, Admin!' });
    }
  );
  
  router.get(
    '/trainer',
    passport.authenticate('jwt', { session: false, roles: ['trainer'] }),
    (req, res) => {
      res.json({ message: 'Welcome, Trainer!' });
    }
  );
  
  router.get(
    '/candidate',
    passport.authenticate('jwt', { session: false, roles: ['candidate'] }),
    (req, res) => {
      res.json({ message: 'Welcome, Candidate!' });
    }
  );
  

module.exports = router;
