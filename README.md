# Secure Password Manager

A modern, full-stack password management application built with **React** and **ASP.NET Core**, featuring enterprise-grade security and a beautiful user interface.

## Features

### Security First

- **AES-256 Encryption** - Passwords encrypted using .NET Data Protection API
- **JWT Authentication** - Stateless authentication with secure token management
- **HTTPS Only** - All communications secured with TLS
- **Input Validation** - Comprehensive server-side validation
- **Rate Limiting** - Protection against brute force attacks

### Modern UI/UX

- **Responsive Design** - Works seamlessly across all devices
- **Dark Mode Support** - Automatic theme detection
- **Smooth Animations** - Engaging micro-interactions

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Mantine UI** - Modern component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend

- **ASP.NET Core 8** - Web API
- **Entity Framework Core** - ORM
- **SQL Server** - Database
- **JWT Bearer** - Authentication
- **Data Protection API** - Encryption

### Development Tools

- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS** - Utility-first CSS

## Deployment

- **Linux VM** - Ubuntu 22.04 LTS server
- **Docker** - Containerized application deployment
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer
- **Let's Encrypt** - SSL certificate management
- **GitHub Actions** - CI/CD pipeline automation

## Installation

### Prerequisites

- Node.js 18+
- .NET 8 SDK
- SQL Server (LocalDB or Express)

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/password-manager.git
cd password-manager
```

2. Navigate to the backend directory

```bash
cd backend
```

3. Install dependencies

```bash
dotnet restore
```

4. Run database migrations

```bash
dotnet ef database update
```

5. Start the API server

```bash
dotnet run
```

The API will be available at `https://localhost:5289`

### Frontend Setup

1. Navigate to the frontend directory

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Getting Started

1. **Sign Up** - Create a new account with a strong password
2. **Login** - Access your secure vault
3. **Add Passwords** - Store your credentials securely
4. **Organize** - Categorize and manage your passwords
5. **Sync** - Access your passwords from any device

### API Endpoints

```
POST /api/signup          - User registration
POST /api/signin          - User authentication
GET  /api/passwords       - Get user passwords
POST /api/passwords       - Create new password entry
PUT  /api/passwords/{id}  - Update password entry
DELETE /api/passwords/{id} - Delete password entry
```

## Security Features

### Data Protection

- **Client-side validation** - Immediate feedback
- **Server-side encryption** - AES-256-CBC encryption
- **SQL injection protection** - Parameterized queries

### Authentication

- **Password hashing** - BCrypt
- **JWT tokens** - Stateless authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Star this repository if you found it helpful!**
