# 🎓 Admission Management System

A comprehensive backend system for managing student admissions, courses, and administrative operations. Built with modern Node.js technologies and designed for scalability and maintainability.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Setup & Installation](#-setup--installation)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Assumptions & Design Decisions](#-assumptions--design-decisions)
- [Future Enhancements](#-future-enhancements)

## 🎯 Project Overview

The Admission Management System is a RESTful API backend that facilitates the complete lifecycle of student admissions. It provides separate interfaces for students and administrators, enabling course management, application processing, and status tracking with automated notifications.

### Key Objectives
- **Student Management**: Registration, authentication, and profile management
- **Course Administration**: Course creation, listing, and management by admins
- **Admission Processing**: Application submission, status tracking, and updates
- **Role-based Access**: Separate authentication and authorization for students and admins
- **Automated Notifications**: Email notifications for admission status updates

## 🛠 Tech Stack

### Backend Framework
- **Node.js** (v18+) - Runtime environment
- **Express.js** - Web application framework
- **ES6 Modules** - Modern JavaScript module system

### Database
- **MongoDB** - NoSQL database for flexible document storage
- **Mongoose** - ODM for MongoDB with schema validation

### Authentication & Security
- **JWT (JSON Web Tokens)** - Stateless authentication
- **bcryptjs** - Password hashing and verification

### Validation & Middleware
- **express-validator** - Input validation and sanitization
- **Custom Middleware** - Authentication, error handling, and validation

### Email Services
- **Nodemailer** - Email sending functionality
- **Brevo (Sendinblue)** - SMTP service provider

### Testing
- **Jest** - Testing framework
- **MongoDB Memory Server** - In-memory database for testing

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🏗 Architecture

The application follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────┐
│   Controllers   │ ← HTTP Request/Response handling
├─────────────────┤
│    Services     │ ← Business logic and data processing
├─────────────────┤
│     Models      │ ← Data models and database schemas
├─────────────────┤
│   Middleware    │ ← Authentication, validation, error handling
├─────────────────┤
│     Routes      │ ← API endpoint definitions
└─────────────────┘
```

### Design Patterns Used
- **Service Layer Pattern** - Business logic separation
- **Repository Pattern** - Data access abstraction
- **Middleware Pattern** - Cross-cutting concerns
- **Factory Pattern** - Object creation (JWT tokens)

## 📊 Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Student   │       │  Admission  │       │   Course    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ _id         │◄─────┐│ student     │┌─────►│ _id         │
│ name        │      ││ course      ││      │ title       │
│ email       │      ││ status      ││      │ description │
│ password    │      ││ createdAt   ││      │ department  │
│ createdAt   │      ││ updatedAt   ││      │ createdBy   │
│ updatedAt   │      │└─────────────┘│      │ createdAt   │
└─────────────┘      │               │      │ updatedAt   │
                     │               │      └─────────────┘
                     │               │              ▲
                     │               │              │
                     │               │      ┌─────────────┐
                     │               └─────►│    Admin    │
                     │                      ├─────────────┤
                     │                      │ _id         │
                     └─────────────────────►│ name        │
                                            │ email       │
                                            │ password    │
                                            │ createdAt   │
                                            │ updatedAt   │
                                            └─────────────┘
```

### Schema Details

#### Student Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Course Schema
```javascript
{
  _id: ObjectId,
  title: String (required, unique),
  description: String (required),
  department: String (required),
  createdBy: ObjectId (ref: Admin),
  createdAt: Date,
  updatedAt: Date
}
```

#### Admission Schema
```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: Student),
  course: ObjectId (ref: Course),
  status: String (enum: ['pending', 'enrolled', 'rejected'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- **Unique Compound Index**: `{student: 1, course: 1}` on Admission collection
- **Email Indexes**: Unique indexes on Student and Admin email fields

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication** for both students and admins
- **Role-based Access Control** with separate middleware
- **Password Hashing** using bcrypt with salt rounds
- **Token Expiration** (1 hour) for security

### 👨‍🎓 Student Features
- **Registration & Login** with email validation
- **Course Browsing** with search and pagination
- **Admission Applications** to multiple courses
- **Application Status Tracking**
- **Profile Management**

### 👨‍💼 Admin Features
- **Admin Registration & Login**
- **Course Creation & Management**
- **Admission Status Updates** (pending/enrolled/rejected)
- **Student Application Review**

### 📧 Notification System
- **Automated Email Notifications** for admission status changes
- **SMTP Integration** with Brevo/Sendinblue
- **Customizable Email Templates**

### 🔍 Advanced Features
- **Input Validation** with express-validator
- **Error Handling** with custom middleware
- **Pagination & Filtering** for course listings
- **Search Functionality** by course title and department
- **Database Seeding** for development

## 📚 API Documentation

### Base URL
```
http://localhost:9090/api/v1
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 👨‍🎓 Student Endpoints

### 1. Student Registration
**POST** `/students/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Student created Successfully",
  "student": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe"
  }
}
```

### 2. Student Login
**POST** `/students/login`

**Request Body:**
```json
{
  "email": "john.doe@email.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "logged in successfully",
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👨‍💼 Admin Endpoints

### 3. Admin Registration
**POST** `/admins/signup`

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@university.edu",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Admin created successfuly",
  "admin": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Admin User"
  }
}
```

### 4. Admin Login
**POST** `/admins/login`

**Request Body:**
```json
{
  "email": "admin@university.edu",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Admin logged in successfully",
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📚 Course Endpoints

### 5. Get All Courses
**GET** `/courses/all-courses`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `title` (optional): Search by course title
- `dept` (optional): Filter by department

**Example:** `/courses/all-courses?page=1&limit=5&title=computer&dept=science`

**Response:**
```json
{
  "message": "Courses fethched",
  "data": {
    "courses": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Computer Science Fundamentals",
        "description": "Introduction to programming and algorithms",
        "department": "Computer Science",
        "createdBy": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Admin User",
          "email": "admin@university.edu"
        },
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "totalCourses": 25,
      "currentPage": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

### 6. Create Course (Admin Only)
**POST** `/courses/create-course`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "Advanced Mathematics",
  "description": "Calculus and Linear Algebra",
  "department": "Mathematics"
}
```

**Response:**
```json
{
  "message": "Course created Successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Advanced Mathematics",
    "description": "Calculus and Linear Algebra",
    "department": "Mathematics",
    "createdBy": "507f1f77bcf86cd799439012",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## 🎓 Admission Endpoints

### 7. Apply for Course (Student Only)
**POST** `/admissions/apply`

**Headers:**
```
Authorization: Bearer <student_jwt_token>
```

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "message": "Admission applied successfully",
  "admission": {
    "_id": "507f1f77bcf86cd799439015",
    "student": "507f1f77bcf86cd799439011",
    "course": "507f1f77bcf86cd799439013",
    "status": "pending",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

### 8. Get Student Applications (Student Only)
**GET** `/admissions/student-applied/:studentId`

**Headers:**
```
Authorization: Bearer <student_jwt_token>
```

**Response:**
```json
{
  "admissions": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "student": "507f1f77bcf86cd799439011",
      "course": {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Computer Science Fundamentals",
        "description": "Introduction to programming",
        "department": "Computer Science"
      },
      "status": "pending",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

### 9. Get Course Applications (Admin Only)
**GET** `/admissions/course-applied/:courseId`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "admissions": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "student": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john.doe@email.com"
      },
      "course": "507f1f77bcf86cd799439013",
      "status": "pending",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

### 10. Update Admission Status (Admin Only)
**PUT** `/admissions/update-status/:admissionId`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "status": "enrolled"
}
```

**Response:**
```json
{
  "message": "Admission status updated successfully",
  "updatedAdmission": {
    "_id": "507f1f77bcf86cd799439015",
    "student": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@email.com"
    },
    "course": {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Computer Science Fundamentals"
    },
    "status": "enrolled",
    "updatedAt": "2024-01-15T13:00:00.000Z"
  }
}
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6.0 or higher)
- **Docker** (optional, for containerized setup)
- **Git**

### Method 1: Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd admission-management-system
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Configuration
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

#### 4. Start MongoDB
```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using MongoDB Docker container
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

#### 5. Seed the Database (Optional)
```bash
npm run seed
```

#### 6. Start the Application
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Method 2: Docker Setup (Recommended)

#### 1. Clone and Navigate
```bash
git clone <repository-url>
cd admission-management-system
```

#### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### 3. Build and Run with Docker Compose
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f
```

#### 4. Seed the Database (Optional)
```bash
# Execute seed script in the running container
docker-compose exec app npm run seed
```

#### 5. Stop the Application
```bash
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
```

## ⚙️ Environment Configuration

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=9090
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/admission_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Brevo/Sendinblue)
SMTP_SERVER=smtp-relay.brevo.com
SMTP_PORT=587
BREVO_USERNAME=your-brevo-email@domain.com
BREVO_PASSWORD=your-brevo-smtp-password
```

### Environment Variables Explanation

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 9090 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `SMTP_SERVER` | SMTP server hostname | Yes | - |
| `SMTP_PORT` | SMTP server port | Yes | - |
| `BREVO_USERNAME` | Brevo SMTP username | Yes | - |
| `BREVO_PASSWORD` | Brevo SMTP password | Yes | - |

### Setting up Email Service (Brevo)

1. **Create Brevo Account**: Sign up at [brevo.com](https://brevo.com)
2. **Get SMTP Credentials**: Navigate to SMTP & API → SMTP
3. **Create SMTP Key**: Generate a new SMTP key
4. **Update Environment**: Add credentials to your `.env` file

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
- Starts server with nodemon for auto-reload
- Runs on http://localhost:9090
- Detailed logging enabled

### Production Mode
```bash
npm start
```
- Starts server with node
- Optimized for production
- Minimal logging

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
```

### Health Check
Once the server is running, verify it's working:
```bash
curl http://localhost:9090/api/v1/courses/all-courses
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test


### Test Structure
```
__tests__/
├── services/
│   ├── admin.service.test.js
│   ├── student.service.test.js
│   ├── course.service.test.js
│   └── admission.service.test.js
└── setup.js
```

### Test Features
- **In-Memory Database**: Uses MongoDB Memory Server
- **Isolated Tests**: Each test runs in isolation
- **Service Layer Testing**: Comprehensive business logic testing
- **Mock Data**: Predefined test fixtures

### Postman Collection
Import the Postman collection for API testing:
1. Open Postman
2. Import `postman/CTRLB.postman_collection.json`
3. Import environment `postman/CTRLB Env.postman_environment.json`
4. Start testing APIs

## 📁 Project Structure

```
admission-management-system/
├── __tests__/                 # Test files
│   ├── services/              # Service layer tests
│   └── setup.js               # Test configuration
├── postman/                   # Postman collection & environment
├── src/
│   ├── config/                # Configuration files
│   │   └── index.js           # Environment config
│   ├── controller/            # Request handlers
│   │   ├── admin.controller.js
│   │   ├── student.controller.js
│   │   ├── course.controller.js
│   │   └── admission.controller.js
│   ├── middleware/            # Custom middleware
│   │   ├── adminAuth.middleware.js
│   │   ├── studentAuth.middleware.js
│   │   ├── error.middleware.js
│   │   └── checkValidationArray.middleware.js
│   ├── models/                # Database models
│   │   ├── Admin.model.js
│   │   ├── Student.model.js
│   │   ├── Course.model.js
│   │   └── Admission.model.js
│   ├── routes/                # API routes
│   │   ├── admin.route.js
│   │   ├── student.route.js
│   │   ├── course.route.js
│   │   └── admission.routes.js
│   ├── services/              # Business logic
│   │   ├── admin.service.js
│   │   ├── student.service.js
│   │   ├── course.service.js
│   │   ├── admission.service.js
│   │   └── notifications.service.js
│   ├── validation/            # Input validation
│   │   ├── auth.validation.js
│   │   ├── course.validation.js
│   │   └── admission.validation.js
│   ├── util/                  # Utility functions
│   │   └── catchAsync.js
│   ├── seed/                  # Database seeding
│   │   └── seed.js
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # Docker composition
├── Dockerfile                 # Docker configuration
├── package.json               # Dependencies & scripts
├── setup.js                   # Jest setup
└── README.md                  # Project documentation
```

## 🤔 Assumptions & Design Decisions

### Business Logic Assumptions
1. **Single Course Application**: Students can apply to the same course only once
2. **Admin Course Creation**: Only admins can create and manage courses
3. **Status Workflow**: Admission status follows: pending → enrolled/rejected
4. **Email Notifications**: Sent only when admission status changes
5. **Public Course Listing**: Anyone can view available courses

### Technical Decisions
1. **JWT Authentication**: Chosen for stateless, scalable authentication
2. **MongoDB**: Selected for flexible schema and rapid development
3. **Service Layer Pattern**: Separates business logic from controllers
4. **Express Validator**: Provides robust input validation
5. **bcrypt**: Industry standard for password hashing
6. **Nodemailer**: Reliable email sending solution

### Security Considerations
1. **Password Hashing**: All passwords are hashed with bcrypt
2. **JWT Expiration**: Tokens expire after 1 hour
3. **Input Sanitization**: All inputs are validated and sanitized
4. **Role-based Access**: Separate authentication for students and admins
5. **Error Handling**: Sensitive information is not exposed in errors

### Scalability Decisions
1. **Pagination**: Implemented for course listings
2. **Indexing**: Database indexes on frequently queried fields
3. **Modular Architecture**: Easy to extend and maintain
4. **Docker Support**: Containerized for easy deployment
5. **Environment Configuration**: Flexible configuration management

## 🚀 Future Enhancements

### Phase 1: Core Improvements
- [ ] **Password Reset**: Email-based password recovery
- [ ] **Profile Management**: Student and admin profile updates
- [ ] **Course Categories**: Hierarchical course organization
- [ ] **Admission Deadlines**: Time-based application windows
- [ ] **File Uploads**: Document submission for applications

### Phase 2: Advanced Features
- [ ] **Payment Integration**: Course fee payment processing
- [ ] **Notification Preferences**: Customizable notification settings
- [ ] **Advanced Search**: Full-text search with filters
- [ ] **Analytics Dashboard**: Admission statistics and reports
- [ ] **Bulk Operations**: Mass status updates and notifications

### Phase 3: Enterprise Features
- [ ] **Multi-tenant Support**: Multiple institutions
- [ ] **API Rate Limiting**: Request throttling
- [ ] **Audit Logging**: Comprehensive activity tracking
- [ ] **Advanced Security**: 2FA, OAuth integration
- [ ] **Microservices**: Service decomposition for scale

### Technical Improvements
- [ ] **GraphQL API**: Alternative to REST
- [ ] **Redis Caching**: Performance optimization
- [ ] **Message Queues**: Asynchronous processing
- [ ] **Monitoring**: Application performance monitoring
- [ ] **CI/CD Pipeline**: Automated testing and deployment

---

## 📞 Support & Contact

For questions, issues, or contributions, please:

1. **Create an Issue**: Use GitHub issues for bug reports
2. **Submit a PR**: Contributions are welcome
3. **Documentation**: Check this README for common questions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.