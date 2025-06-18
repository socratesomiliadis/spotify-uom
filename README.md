# Spotify UOM - Distributed Music Streaming Platform

A full-stack music streaming application built with distributed systems architecture, featuring a Go backend API and Next.js frontend. This project implements core Spotify-like functionality including user authentication, music upload, streaming, playlists, and favorites management.

## 🏗️ Architecture Overview

This application follows a microservices architecture with the following components:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Go REST API with Chi router and JWT authentication
- **Database**: PostgreSQL with GORM ORM
- **File Storage**: UploadThing for audio files and thumbnails
- **Authentication**: NextAuth.js with custom credential provider
- **Containerization**: Docker and Docker Compose for easy deployment

## 🚀 Features

### Core Functionality

- **User Authentication**: Registration, login, email verification
- **Music Streaming**: Play, pause, skip, volume control
- **Music Upload**: Artists can upload songs with metadata and thumbnails
- **Search**: Search songs by title and artist
- **Playlists**: Create and manage custom playlists
- **Favorites**: Like/unlike songs functionality
- **Artist Dashboard**: Manage uploaded songs (published/unpublished)

### Technical Features

- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Real-time Audio Player**: Built with HTML5 Audio API
- **File Upload**: Drag-and-drop interface with progress tracking
- **State Management**: Zustand for client-side state
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: RESTful API with clear endpoints

## 🛠️ Technology Stack

### Backend (Go)

- **Framework**: Chi v5 (HTTP router)
- **Database**: PostgreSQL with GORM ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Configuration**: Viper for environment management
- **CORS**: Configured for cross-origin requests

### Frontend (Next.js)

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + Radix UI components
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **HTTP Client**: Axios
- **Audio**: use-sound hook for audio playback
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 13
- **File Storage**: UploadThing
- **Development**: Hot reload for both frontend and backend

## 📋 Prerequisites

Before running this application, ensure you have:

- **Docker** and **Docker Compose** installed
- **Node.js** 18+ (for local development)
- **Go** 1.20+ (for local development)
- **PostgreSQL** (if running without Docker)

## 🚀 Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spotify-uom
   ```

2. **Set up environment variables**

   Create `.env` file in the backend directory:

   ```bash
   cd backend
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   DATABASE_URL=postgres://postgres:postgres@db:5432/postgres?sslmode=disable
   JWT_SECRET=your-jwt-secret-key
   EMAIL_VERIFICATION_SECRET=your-email-secret
   ```

3. **Start the application**

   ```bash
   # From the root directory
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8002
   - Database: localhost:5432

## 🔧 Local Development Setup

### Quick Database Setup with Docker

For local development, you can run just the PostgreSQL database in Docker while running the backend and frontend locally for faster development iteration:

```bash
# Start only the database service in the background
docker-compose up -d db
```

This approach provides the best of both worlds - containerized database with local development flexibility.

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   go mod download
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file for local development with Docker database:

   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable
   JWT_SECRET=your-jwt-secret-key
   EMAIL_VERIFICATION_SECRET=your-email-secret
   ```

4. **Run the backend**
   ```bash
   go run main.go
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local`:

   ```env
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8002
   UPLOADTHING_SECRET=your-uploadthing-secret
   UPLOADTHING_APP_ID=your-uploadthing-app-id
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

### Core Tables

#### Users

```sql
- id (Primary Key)
- name (VARCHAR 256)
- email (VARCHAR 256, UNIQUE)
- auth_provider (VARCHAR 20)
- password (VARCHAR 512, hashed)
- is_email_verified (BOOLEAN)
- is_artist (BOOLEAN)
- created_at (TIMESTAMP)
```

#### Songs

```sql
- id (Primary Key)
- title (VARCHAR 256)
- artist_id (Foreign Key → users.id)
- file_url (VARCHAR 512)
- thumbnail_url (VARCHAR 512)
- uploaded_at (TIMESTAMP)
- is_published (BOOLEAN)
```

#### Playlists

```sql
- id (Primary Key)
- name (VARCHAR 256)
- user_id (Foreign Key → users.id)
- description (VARCHAR 512)
- created_at (TIMESTAMP)
```

#### Favorites

```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- song_id (Foreign Key → songs.id)
- created_at (TIMESTAMP)
```

## 🔌 API Endpoints

### Authentication

- `POST /signup/credential` - User registration
- `POST /login/credential` - User login
- `POST /email-verify` - Email verification
- `GET /profile` - Get user profile (Protected)

### Songs

- `GET /songs/all` - Get all published songs
- `GET /songs/get/{id}` - Get song by ID
- `GET /songs/title/{title}` - Search songs by title
- `GET /artist/songs` - Get artist's songs (Protected)
- `POST /artist/songs` - Upload new song (Protected)
- `PUT /artist/songs/{id}/publish` - Publish/unpublish song (Protected)
- `DELETE /artist/songs/{id}` - Delete song (Protected)

### Favorites

- `GET /favorites` - Get user's favorite songs (Protected)
- `POST /favorites` - Add song to favorites (Protected)
- `DELETE /favorites/{id}` - Remove from favorites (Protected)

### Playlists

- `GET /playlists` - Get user's playlists (Protected)
- `POST /playlists` - Create playlist (Protected)
- `PUT /playlists/{id}` - Update playlist (Protected)
- `DELETE /playlists/{id}` - Delete playlist (Protected)
- `POST /playlists/{id}/songs` - Add song to playlist (Protected)
- `DELETE /playlists/{playlistId}/songs/{songId}` - Remove song from playlist (Protected)

## 🎨 Frontend Structure

```
frontend/
├── app/                    # Next.js 13+ App Router
│   ├── (site)/            # Main application pages
│   ├── auth/              # Authentication pages
│   ├── search/            # Search functionality
│   ├── upload/            # Music upload page
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── forms/             # Form components
│   ├── ui/                # Shadcn/ui components
│   └── ...                # Core components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── auth/              # Authentication logic
│   ├── services/          # API service calls
│   └── dtos/              # TypeScript type definitions
└── providers/             # Context providers
```

## 🔧 Backend Structure

```
backend/
├── auth/                  # Authentication middleware
├── db/                    # Database connection & config
├── models/                # Data models
│   ├── domains/           # Database entities
│   └── dtos/              # Data transfer objects
├── services/              # Business logic layer
├── main.go                # Application entry point
└── go.mod                 # Go module dependencies
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
go test ./...
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🚢 Deployment

### Using Docker Compose (Recommended)

```bash
# Production build
docker-compose -f compose.yml up --build -d
```

### Manual Deployment

1. **Backend Deployment**

   ```bash
   cd backend
   go build -o main .
   ./main
   ```

2. **Frontend Deployment**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt
- **JWT Authentication**: Secure token-based auth
- **CORS Configuration**: Properly configured cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: GORM ORM with parameterized queries
- **File Upload Security**: Validated file types and sizes

## 🔍 Monitoring & Logging

- **Request Logging**: Chi middleware for HTTP request logging
- **Error Handling**: Structured error responses
- **Database Logging**: GORM query logging in development

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Component-level lazy loading
- **Caching**: Browser and CDN caching strategies
- **Bundle Optimization**: Tree shaking and code splitting

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify network connectivity between containers

2. **File Upload Issues**

   - Check UploadThing configuration
   - Verify API keys are correctly set
   - Ensure proper CORS settings

3. **Authentication Issues**
   - Verify JWT secret is set
   - Check NextAuth configuration
   - Ensure session storage is working

### Logs

```bash
# View application logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f goapp
docker-compose logs -f nextapp
```
