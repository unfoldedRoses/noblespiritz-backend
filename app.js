const express = require('express');
const app = express();
const routes = require('./routes');
const passport = require('passport');
const { sequelize } = require('./models');
const morgan =require('morgan')

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api', routes);
app.use(morgan('tiny'))

// Database connection
sequelize
  .sync()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Start the server
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
