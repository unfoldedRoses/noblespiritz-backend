const express = require('express');
const app = express();
const routes = require('./routes');
const passport = require('passport');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const morgan =require('morgan')
const cookieParser=require('cookie-parser')
const cors=require('cors');


var corsOptions = {
  origin: '*'
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api', routes);
app.use(morgan('tiny'))
// Add the Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());

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
const PORT =  3009;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
