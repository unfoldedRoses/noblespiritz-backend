const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    noblespiritz: '3.0.0',
    info: {
      title: 'noblespiritz api documents',
      version: '1.0.0',
      description: 'API documentation for your noblespiritz project',
    },
  },
  apis: ['./routes/*.js'], // Modify this based on your project structure
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
