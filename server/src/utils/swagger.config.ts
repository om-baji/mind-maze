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
      name: 'Quiz',
      description: 'Quiz management endpoints'
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Quiz: {
        type: 'object',
        required: ['title', 'numQuestions', 'description', 'passingScore', 'difficulty', 'subject','id'],
        properties: {
          id : {
            type: 'string',
            description: 'quizId'
          },
          title: {
            type: 'string',
            description: 'Quiz title'
          },
          numQuestions: {
            type: 'string',
            description: 'Number of questions in the quiz'
          },
          description: {
            type: 'string',
            description: 'Quiz description'
          },
          passingScore: {
            type: 'number',
            description: 'Passing score for the quiz'
          },
          timeLimit: {
            type: 'number',
            description: 'Time limit in minutes',
            default: 10
          },
          difficulty: {
            type: 'string',
            description: 'Quiz difficulty level'
          },
          subject: {
            type: 'string',
            description: 'Quiz subject'
          }
        }
      },
      QuizMetadata: {
        type: 'object',
        required: ['userId', 'email', 'quizId'],
        properties: {
          userId: {
            type: 'string',
            description: 'User ID'
          },
          email: {
            type: 'string',
            description: 'User email'
          },
          quizId: {
            type: 'string',
            description: 'Quiz ID'
          }
        }
      },
      Question: {
        type: 'object',
        required: ['question', 'options', 'correct_answer'],
        properties: {
          question: {
            type: 'string',
            description: 'Question text'
          },
          options: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Available options'
          },
          correct_answer: {
            type: 'string',
            description: 'Correct option'
          }
        }
      },
      Questions: {
        type: 'object',
        required: ['questions', 'quizId'],
        properties: {
          questions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Question'
            },
            description: 'List of questions'
          },
          quizId: {
            type: 'string',
            description: 'Quiz ID'
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/v1/quiz": {
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
            },
            "description": "User ID"
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
            "description": "Quiz created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Quiz created"
                    },
                    "success": {
                      "type": "boolean",
                      "example": true
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean",
                      "example": false
                    }
                  }
                }
              }
            }
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
            },
            "description": "Quiz ID"
          }
        ],
        "responses": {
          "200": {
            "description": "Quiz deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Quiz deleted"
                    },
                    "success": {
                      "type": "boolean",
                      "example": true
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean",
                      "example": false
                    }
                  }
                }
              }
            }
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
            },
            "description": "Quiz ID"
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
            "description": "Quiz updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Quiz updated"
                    },
                    "success": {
                      "type": "boolean",
                      "example": true
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean",
                      "example": false
                    }
                  }
                }
              }
            }
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
            },
            "description": "Quiz ID"
          }
        ],
        "responses": {
          "200": {
            "description": "Quiz found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "$ref": "#/components/schemas/Quiz"
                    },
                    "success": {
                      "type": "boolean",
                      "example": true
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean",
                      "example": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/quiz/bulk": {
      "get": {
        "summary": "Get all quizzes by user id",
        "tags": ["Quiz"],
        "parameters": [
          {
            "in": "query",
            "name": "user",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "User ID"
          }
        ],
        "responses": {
          "200": {
            "description": "Quizzes found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Quiz"
                      }
                    },
                    "success": {
                      "type": "boolean",
                      "example": true
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "success": {
                      "type": "boolean",
                      "example": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/gemini/question": {
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
    },
  }
};

export default swaggerConfig;