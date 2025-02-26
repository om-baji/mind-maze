const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'MCQ Platform API',
    version: '1.0.0',
    description: 'API documentation for Multiple Choice Questions Platform',
    contact: {
      name: 'MCQ Platform Support',
      email: 'support@mcqplatform.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development Server'
    }
  ],
  tags: [
    {
      name: 'Gemini',
      description: 'MCQ Questions endpoints'
    },
    {
      name: 'Users',
      description: 'User management endpoints'
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {}
};

export default swaggerConfig;
