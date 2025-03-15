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
      UserRegistration: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Doe" },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "securepassword123",
          },
        },
        required: ["name", "email", "password"],
      },
      UserLogin: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "securepassword123",
          },
        },
        required: ["email", "password"],
      },
      UserUpdate: {
        type: "object",
        properties: {
          name: { type: "string", example: "John Updated" },
          email: {
            type: "string",
            format: "email",
            example: "johnupdated@example.com",
          },
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          id: { type: "string", example: "clh6xr3o200013k5j1234abcd" },
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
        },
      },
      SuccessResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          success: { type: "boolean", example: true },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string" },
          message: { type: "string" },
          success: { type: "boolean", example: false },
        },
      },
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
    "/api/v1/register": {
      post: {
        tags: ["User"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserRegistration",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User registered!" },
                    token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "409": {
            description: "Email already in use",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/login": {
      post: {
        tags: ["User"],
        summary: "Authenticate a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLogin",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Login successful!" },
                    token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid input data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "401": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user": {
      get: {
        tags: ["User"],
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "User ID",
            example: "clh6xr3o200013k5j1234abcd",
          },
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User found!" },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing ID parameter",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["User"],
        summary: "Update user information",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "User ID",
            example: "clh6xr3o200013k5j1234abcd",
          },
        ],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserUpdate",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User updated!" },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid input data or missing ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "409": {
            description: "Email already in use by another user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/deleteUser": {
      delete: {
        tags: ["User"],
        summary: "Delete a user",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "User ID",
            example: "clh6xr3o200013k5j1234abcd",
          },
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User deleted!" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing ID parameter",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/{email}": {
      get: {
        tags: ["User"],
        summary: "Get user by email",
        parameters: [
          {
            name: "email",
            in: "path",
            required: true,
            schema: { type: "string", format: "email" },
            description: "User email",
            example: "john@example.com",
          },
        ],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User found!" },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing email parameter",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/me": {
      get: {
        tags: ["User"],
        summary: "Get current user info",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User data retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User data retrieved!",
                    },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          "500": {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/logout": {
      post: {
        tags: ["User"],
        summary: "Logout a user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SuccessResponse",
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/refresh": {
      get: {
        tags: ["User"],
        summary: "Refresh access token",
        parameters: [
          {
            name: "token",
            in: "query",
            required: true,
            schema: { type: "string" },
            description: "Refresh token",
          },
        ],
        responses: {
          "200": {
            description: "Token refreshed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Token refreshed successfully!",
                    },
                    token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    user: { $ref: "#/components/schemas/UserResponse" },
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "Missing refresh token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  }
};

export default swaggerConfig;