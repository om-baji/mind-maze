const swaggerConfig = {
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
  paths: {
    "/quiz": {
      "post": {
        "summary": "Create a new quiz",
        "tags": ["Quiz"],
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Quiz"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Quiz created successfully"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "delete": {
        "summary": "Delete a quiz",
        "tags": ["Quiz"],
        "parameters": [
          {
            "in": "query", 
            "name": "id",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Quiz deleted successfully"
          },
          "500": {
            "description": "Server error" 
          }
        }
      },
      "put": {
        "summary": "Update a quiz",
        "tags": ["Quiz"],
        "parameters": [
          {
            "in": "query",
            "name": "id", 
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Quiz"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Quiz updated successfully"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "get": {
        "summary": "Get a quiz by id",
        "tags": ["Quiz"],
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "required": true, 
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Quiz found",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Quiz"
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/gemini/question": {
      "post": {
        "summary": "Generates advanced questions using Gemini AI",
        "description": "Generates a specified number of advanced questions for a given subject section using Google's Gemini AI model",
        "tags": ["Gemini"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["section", "limit"],
                "properties": {
                  "section": {
                    "type": "string",
                    "description": "The subject section for which questions need to be generated"
                  },
                  "limit": {
                    "type": "number",
                    "description": "Number of questions to generate"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully generated questions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Success"
                    },
                    "data": {
                      "type": "string",
                      "description": "Generated questions text"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Failed to generate questions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Failed"
                    },
                    "error": {
                      "type": "string",
                      "description": "Error message"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerConfig;
