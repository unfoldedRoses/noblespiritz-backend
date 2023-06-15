const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
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
