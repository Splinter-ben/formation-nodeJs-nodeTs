const swaggerJsDoc = require('swagger-jsdoc');

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User Profile API',
      desc: 'A NodeJs profile user api',
      contact: {
        name: 'Benjamin Champetier',
        github: 'https://github.com/Splinter-ben/formation-nodejs',
        project: 'Formation Nodejs'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis: ['app.js', './src/routes/*.js']
};
module.exports = swaggerDocs = swaggerJsDoc(swaggerOptions);
