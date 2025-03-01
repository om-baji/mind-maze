export const swaggerConfig = {
    openapi: '3.0.0',
    info: {
      title: 'Mind Maze Platform API',
      version: '1.0.0',
      description: 'API documentation for Multiple Choice Questions Platform',
      contact: {
        name: 'MCQ Platform Support',
        email: 'support@mcqplatform.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8787',
        description: 'Development Server'
      },
      {
        url : 'https://mcq-redesign.ombaji124-d31.workers.dev',
        description: "Production Server"
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
      }
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
    path : []
}