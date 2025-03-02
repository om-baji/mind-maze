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
    {
      name: 'Users', 
      description: 'User management endpoints'
    },
    {
      name: 'Cache',
      description: 'Cache management endpoints'
    }
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
        required: ['title', 'numQuestions', 'description', 'passingScore', 'difficulty', 'subject'],
        properties: {
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
    "/quiz/bulk": {
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
    },
    "/cache/meta": {
      "post": {
        "summary": "Set quiz metadata",
        "description": "Store user metadata for a specific quiz",
        "tags": ["Cache"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/QuizMetadata"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Metadata added successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Metadata added"
                    },
                    "quizId": {
                      "type": "string"
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
          "400": {
            "description": "Bad request",
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
    "/cache/meta/{id}": {
      "get": {
        "summary": "Get quiz metadata",
        "description": "Retrieve user metadata for a specific quiz",
        "tags": ["Cache"],
        "parameters": [
          {
            "in": "path",
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
            "description": "Metadata retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "userId": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string"
                        }
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
          "404": {
            "description": "Metadata not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Metadata not found"
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
    "/cache/quiz": {
      "post": {
        "summary": "Cache a quiz",
        "description": "Store a quiz in the cache",
        "tags": ["Cache"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "quiz": {
                    "$ref": "#/components/schemas/Quiz"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Quiz cached successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Added"
                    },
                    "id": {
                      "type": "string"
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
          "400": {
            "description": "Bad request",
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
    "/cache/quiz/{id}": {
      "get": {
        "summary": "Get cached quiz",
        "description": "Retrieve a quiz from the cache",
        "tags": ["Cache"],
        "parameters": [
          {
            "in": "path",
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
            "description": "Quiz retrieved successfully",
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
          "404": {
            "description": "Quiz not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Quiz not found"
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
    "/cache/questions": {
      "post": {
        "summary": "Cache quiz questions",
        "description": "Store questions for a specific quiz",
        "tags": ["Cache"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Questions"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Questions cached successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Questions added"
                    },
                    "quizId": {
                      "type": "string"
                    },
                    "count": {
                      "type": "number"
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
          "400": {
            "description": "Bad request",
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
    "/cache/questions/{id}": {
      "get": {
        "summary": "Get cached quiz questions",
        "description": "Retrieve questions for a specific quiz",
        "tags": ["Cache"],
        "parameters": [
          {
            "in": "path",
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
            "description": "Questions retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Question"
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
          "404": {
            "description": "Questions not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Questions not found"
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
    }
  }
};

export default swaggerConfig;