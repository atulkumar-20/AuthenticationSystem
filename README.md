# Authentication & User Management System

A full-stack user management application with authentication, built with the MERN stack (MongoDB, Express, React, Node.js).

Live : 

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- React Router v6
- Tanstack Query
- Axios
- Framer Motion
- React Hook Form with Zod

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
  
## Features

- **User Authentication**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Login and registration with validation
  
- **User Management**
  - View all users in a responsive data table
  - Delete users (admin functionality)
  - User profile information display
  
- **Responsive UI**
  - Modern, clean interface built with Tailwind CSS
  - Fully responsive design that works on all devices
  - Animated transitions using Framer Motion
  
- **Security**
  - Protected routes with authentication middleware
  - Input validation and sanitization
  - Secure HTTP-only cookies
  - CORS protection



## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/user-management-system.git
   cd user-management-system
   ```

2. **Set up environment variables**

   Create a `.env` file in the `api` directory:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/user-management
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```

3. **Install backend dependencies**
   ```bash
   cd api
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../web
   npm install
   ```

5. **Run the application**

   Start the backend server:
   ```bash
   cd ../api
   npm run dev
   ```

   Start the frontend development server:
   ```bash
   cd ../web
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Users
- `GET /api/users` - Get all users (requires authentication)
- `DELETE /api/users/:id` - Delete a user (requires authentication)

## Project Structure

```
user-management-system/
├── api/                  # Backend code
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── index.js      # Entry point
│   └── package.json
│
└── web/                  # Frontend code
    ├── public/           # Static files
    ├── src/
    │   ├── apiService/   # API integration
    │   ├── components/   # Reusable components
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page components
    │   ├── types/        # TypeScript types
    │   ├── App.tsx       # Main component
    │   └── main.tsx      # Entry point
    └── package.json
```

## Deployment

### Backend
1. Set up a MongoDB Atlas cluster
2. Deploy to a service like Heroku, Render, or Railway
3. Set the environment variables in your hosting platform

### Frontend
1. Build the production version:
   ```bash
   cd web
   npm run build
   ```
2. Deploy the contents of the `dist` folder to Netlify, Vercel, or similar

## Future Enhancements

- User profile editing
- Password reset functionality
- Role-based access control
- Email verification
- Dark/light theme toggle
- Pagination for user list
- Search and filtering options

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
