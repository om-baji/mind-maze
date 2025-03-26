# 🚀 Mind Maze

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Jotai](https://img.shields.io/badge/Jotai-2.5.0-000000?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEwSURBVDhPY8AH/jMwcNra2j7R1dW9pK2t/QWI/wPxTyDGC4BqmSwtLf8D8X+QxrCwsP+enp7/XV1d/9va2v63tLT8b2xs/F9XV/e/srLyf0lJyX8gzQw1AKROGqj5NMhEkCvZ2dn/MzMz/09OTv4/Ojr6v7+//39ra+v/+vr6/yA5kFqQHrCJQG+uAmkkRxNII0wmEGwABtR4kCZkjSDsGBERMZUTiJmZmf+Dgg+lBdHxGxh33wOFGRmJcOp/QUFBMJuXl/e/u7s72PbKykoQF4zBYoaGhv/Dw8OJ04gCQJpZgSYWgpzn4eHx38HB4b+dnR0YgzCIDcYODg6ZLEAv9QDt+g+MbLCYj48PGIPYYAzigzEQZzGANAIxa1FR0SeQifHx8WB+bGwsGIP4YAzErKRgBgYAScWYIL0LiNUAAAAASUVORK5CYII=)](https://jotai.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.18.0-CA4245?logo=react-router)](https://reactrouter.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?logo=next.js)](https://ui.shadcn.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Latest-6C47FF?logo=clerk)](https://clerk.com/)
[![Hono](https://img.shields.io/badge/Hono-Latest-E36002?logo=cloudflare)](https://hono.dev/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Latest-F38020?logo=cloudflare)](https://workers.cloudflare.com/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-Latest-DC382D?logo=redis)](https://upstash.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Latest-8E75B2?logo=google)](https://deepmind.google/technologies/gemini/)
[![Swagger](https://img.shields.io/badge/Swagger-Latest-85EA2D?logo=swagger)](https://swagger.io/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Latest-FF6384?logo=chart.js)](https://www.chartjs.org/)

> A cutting-edge TypeScript-based MCQ application featuring a React/TSX frontend with Jotai state management and shadcn/ui components, powered by a serverless Hono backend on Cloudflare Workers with Prisma Accelerate and hybrid caching.

## 📋 Features

- **End-to-End TypeScript** - Full type safety across frontend and backend
- **Modern UI Components** - Built with shadcn/ui and Tailwind for a sleek, accessible interface
- **Interactive Question Navigation** - Navigate questions with an intuitive sidebar
- **Real-time Progress Tracking** - Visual progress indicators and statistics
- **Advanced Authentication** - Secure auth flow with Clerk, including webhooks for event-driven processes
- **Serverless Architecture** - High-performance backend using Cloudflare Workers
- **Hybrid Caching** - Optimized performance with Upstash/Redis and in-memory caching
- **AI-Powered Question Generation** - Automated MCQ creation using Gemini API
- **Interactive Charts** - Data visualization with Chart.js
- **API Documentation** - Comprehensive Swagger documentation
- **Optimized Database** - PostgreSQL with Prisma Accelerate for serverless environments
- **Dark/Light Mode** - Full theming support
- **Custom Hooks** - Reusable logic and state management

## 🖥️ Screenshots

![MCQ Redesign Screenshot](https://via.placeholder.com/800x450?text=MCQ+Redesign+Screenshot)

## 🛠️ Technologies

### Frontend
- **TypeScript** - Static typing for improved developer experience and code quality
- **React 18 with TSX** - Fully typed UI components with TypeScript JSX
- **Vite** - Next-generation frontend tooling for faster builds
- **Jotai** - Atomic state management for React with TypeScript support
- **React Router v6** - Declarative routing with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components built on Radix UI
- **Clerk** - Complete authentication and user management
- **Chart.js** - Interactive and responsive charts
- **Custom Hooks** - Abstracting and reusing complex logic with TypeScript
- **Swagger UI** - API documentation and testing interface
- **Zod** - TypeScript-first schema validation

### Backend
- **TypeScript** - Strongly-typed server implementation
- **Hono** - Ultrafast web framework for Cloudflare Workers with first-class TypeScript support
- **Cloudflare Workers** - Serverless execution environment
- **Prisma ORM** - Type-safe database client with TypeScript integration
- **Prisma Accelerate** - Optimized for serverless environments
- **PostgreSQL** - Reliable, robust relational database (Neon DB)
- **Upstash/Redis** - Serverless Redis for distributed caching
- **In-Memory Caching** - Map-based data structure for ultra-fast access
- **Gemini API** - Google's AI model for MCQ generation
- **Class-based Controllers** - Clean, maintainable architecture with TypeScript decorators
- **Clerk Webhooks** - Event-driven authentication system
- **Type-safe API Responses** - Consistent and validated API responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Cloudflare account (for Workers)
- Clerk account (for authentication)
- Upstash account (for Redis)
- Neon PostgreSQL database
- Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/om-baji/mcq-redesign.git
cd mcq-redesign
```

2. Install frontend dependencies:
```bash
cd client
pnpm install
```

3. Configure environment variables for frontend:
```bash
# Create .env.local file in client directory
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_HONO_URL=your_api_url
```

4. Install backend dependencies:
```bash
cd ../server
pnpm install
```

5. Configure backend environment variables:
```bash
# Create .env file in server directory
DATABASE_URL=your_neon_db_url
PRISMA_ACCELERATE_URL=your_prisma_accelerate_url
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

6. Add wrangler.jsonc file (a sample is given)

```bash
"vars": {
        "DATABASE_URL" : "prisma acceelearte url",
        "WEBHOOK_SECRET" : "clerk webhook secret",
        "GEMINI_API_KEY" : "gemini_api",
        "UPSTASH_REDIS_REST_URL" : "upstash/redis url",
        "UPSTASH_REDIS_REST_TOKEN" : "upstash_redis_token",
        "CLERK_PUBLISHABLE_KEY" : "clerk_publishable_key",
        "CLERK_SECRET_KEY" : "clerk_secret",
        "CLERK_JWT_PUBLIC_KEY" : "jwt_secret_clerk",
  }
```

6. Generate Prisma client:
```bash
npx prisma generate
```

7. Deploy the backend to Cloudflare Workers:
```bash
npm run deploy
```

8. Start the frontend development server:
```bash
cd ../client
npm run dev
```

9. Open your browser and visit `http://localhost:5173`

## 📝 Usage

1. **Authentication**:
   - Register or log in using Clerk authentication
   - Manage user profile and settings

2. **Taking a Quiz**:
   - Browse available quizzes by category
   - Start a timed or untimed quiz session
   - Navigate through questions using the sidebar
   - Select answers and mark questions for review
   - Submit answers and view detailed results

3. **Creating Quizzes**:
   - Manually create custom quizzes
   - Generate questions automatically using Gemini AI
   - Set difficulty levels and time limits
   - Share quizzes with other users

4. **Analytics**:
   - View performance statistics with Chart.js visualizations
   - Track progress over time
   - Identify strengths and weaknesses

## 🧩 Project Structure

```
mcq-redesign/
├── client/                   # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── ...           # Feature-specific components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Application pages
│   │   ├── store/            # Jotai atoms and derived states
│   │   ├── api/              # API client and typings
│   │   ├── types/            # TypeScript interfaces and type definitions
│   │   ├── styles/           # CSS and Tailwind config
│   │   ├── App.tsx           # Main application component
│   │   └── main.tsx          # Application entry point
│   ├── tsconfig.json         # TypeScript configuration
│   └── index.html            # HTML template
│
├── server/                   # Backend Hono application for Cloudflare Workers
│   ├── src/
│   │   ├── controllers/      # Class-based route controllers
│   │   ├── middlewares/      # Custom middleware functions
│   │   ├── models/           # Prisma schema and client setup
│   │   ├── services/         # Business logic and external API integration
│   │   ├── utils/            # Helper functions and utilities
│   │   ├── cache/            # Hybrid caching implementation
│   │   │   ├── memory.ts     # In-memory Map-based cache
│   │   │   └── redis.ts      # Upstash Redis client
│   │   ├── ai/               # Gemini API integration for MCQ generation
│   │   ├── auth/             # Clerk webhook handlers
│   │   ├── routes/           # API route definitions
│   │   ├── swagger/          # API documentation
│   │   ├── types/            # TypeScript type definitions
│   │   └── index.ts          # Server entry point
│   ├── prisma/               # Prisma schema and migrations
│   │   └── schema.prisma     # Database schema
│   ├── wrangler.toml         # Cloudflare Workers configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Backend dependencies
│
└── README.md                 # Project documentation
```

## 🔄 API Endpoints

Our API follows RESTful practices and is fully documented with Swagger. Key endpoints include:

- **Authentication**
  - `/api/auth/webhook` - Clerk auth webhook endpoint

- **Questions**
  - `GET /api/questions` - List all questions
  - `POST /api/questions` - Create a new question
  - `POST /api/questions/generate` - Generate questions using Gemini AI
  - `GET /api/questions/:id` - Get a specific question
  - `PUT /api/questions/:id` - Update a question
  - `DELETE /api/questions/:id` - Delete a question

- **Quizzes**
  - `GET /api/quizzes` - List all quizzes
  - `POST /api/quizzes` - Create a new quiz
  - `GET /api/quizzes/:id` - Get a specific quiz
  - `PUT /api/quizzes/:id` - Update a quiz
  - `DELETE /api/quizzes/:id` - Delete a quiz

- **Results**
  - `GET /api/results` - Get user's quiz results
  - `POST /api/results` - Submit quiz results
  - `GET /api/results/stats` - Get performance statistics

## ✨ TypeScript Benefits

This project leverages TypeScript throughout for several key advantages:

- **Type Safety** - Catch errors at compile time rather than runtime
- **Developer Experience** - Enhanced autocomplete and IntelliSense
- **Code Documentation** - Self-documenting code with explicit interfaces
- **Refactoring Confidence** - Make large-scale changes with reduced risk
- **API Consistency** - Ensure frontend and backend share common interfaces
- **Maintainability** - Easier to understand and navigate the codebase

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Om Baji**
- GitHub: [@om-baji](https://github.com/om-baji)

## 🙏 Acknowledgments

- Thanks to the Hono, Cloudflare Workers, and Prisma communities
- Appreciation to shadcn for the excellent UI component library
- Google Gemini team for the AI capabilities
- Clerk for simplified authentication
- Upstash for serverless Redis solutions
- The TypeScript team for the amazing language and tooling