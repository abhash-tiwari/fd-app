# Fraud Detection Dashboard Backend

This is the backend server for the Fraud Detection Dashboard application. It provides APIs for authentication, fraud data retrieval, and statistics.

## Features

- User authentication (login/register)
- JWT-based authorization
- Mock data for fraudulent apps and URLs
- Statistics and trends endpoints
- Protected routes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 3001 by default.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/register` - Register a new user

### Protected Routes (require authentication token)
- `GET /api/stats` - Get dashboard statistics
- `GET /api/fraud/list` - Get list of fraudulent apps and URLs
- `GET /api/trends` - Get fraud detection trends and type distribution

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Mock Data

The server includes mock data for:
- Fraudulent apps
- Fraudulent URLs
- 30-day fraud detection trends
- User authentication

## Development

The server uses:
- Express.js for the web framework
- JWT for authentication
- CORS for cross-origin requests
- bcryptjs for password hashing 