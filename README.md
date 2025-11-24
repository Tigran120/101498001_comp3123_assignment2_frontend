# Employee Management System - Frontend

React frontend application for Employee Management System.

## Features

- User authentication (Login/Signup)
- Employee CRUD operations
- React Router for navigation
- Material-UI components
- Responsive design
- Session management with Context API

## Tech Stack

- React 18
- React Router DOM
- Material-UI (MUI)
- TanStack Query (React Query)
- Axios for HTTP requests
- Context API for state management

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file (optional):

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Running the Application

```bash
# Development
npm start

# Production build
npm run build
```

The app will run on http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── EmployeeList.js
│   │   ├── AddEmployee.js
│   │   ├── UpdateEmployee.js
│   │   ├── ViewEmployee.js
│   │   └── PrivateRoute.js
│   ├── context/         # Context API (AuthContext)
│   ├── services/        # API service (api.js)
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Docker

To run with Docker:

```bash
docker build -t employee-frontend .
docker run -p 3000:80 employee-frontend
```

Or use docker-compose from the root directory.
