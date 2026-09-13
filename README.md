# NIT Manipur PYQ

A web application that provides NIT Manipur students with a centralized platform to access and manage previous-year question papers. It helps students find relevant question papers easily and use them for effective exam preparation.

## 🌐 Live Website

https://nitmanipurpyq.vercel.app

## 🏗️ Architecture

The application follows a client-server architecture:

- **Frontend:** React application deployed on Vercel
- **Backend:** Node.js + Express REST API deployed on Render
- **Database & Authentication:** Supabase
- **API Communication:** Axios

The frontend is organized into **Pages** and reusable **Components**, making the UI modular and easier to maintain. The backend is organized into routes and server-side logic for authentication, authorization, and question-paper management.

```text
                    User
                      │
                      ▼
              React Frontend
                 (Vercel)
                      │
                 Axios / REST
                      │
                      ▼
            Node.js + Express
                (Render)
                      │
             ┌────────┴────────┐
             ▼                 ▼
       Authentication     Question Paper
             │              Operations
             └────────┬────────┘
                      ▼
                  Supabase
             ┌────────┴────────┐
             ▼                 ▼
       Supabase Auth       PostgreSQL
```

## 🔐 Authentication

Authentication is implemented using **Supabase Auth**.

### Sign-up & Email Verification

1. A new user signs up using their email and password.
2. Supabase sends a verification email to the registered email address.
3. The user verifies their email through the confirmation link.
4. After verification, the user can log in.
5. Authentication is handled using Supabase's JWT-based authentication.

### Forgot Password

1. The user requests a password reset using their registered email.
2. Supabase sends a password-reset email.
3. The user follows the link provided in the email.
4. The user is redirected to the password-reset page and can set a new password.

## 👥 User Roles

### Normal User

- View previous-year question papers
- Access academic resources for exam preparation

### Admin

- Upload/post question papers
- Update existing question papers
- Delete question papers
- Manage question-paper content

### Super Admin

- Has complete access to the platform
- Can perform all administrative operations

## 🎓 How It Helps Students

The platform brings previous-year question papers of NIT Manipur together in one place. Students can quickly find relevant papers, understand previous examination patterns, and use them as a convenient resource for exam preparation.

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- REST APIs

### Database & Authentication

- Supabase
- Supabase Auth
- PostgreSQL
- JWT

### Deployment & Tools

- Vercel
- Render
- Git
- GitHub
- GitHub Actions

## ⚡ Render Cold Start

The backend is deployed on Render. When the service remains inactive, it can go to sleep, causing a delay when the first request is made. This is known as a **cold start**.

To reduce this delay, a GitHub Actions workflow periodically sends a request to the deployed Render backend. The workflow runs every **6 minutes** and can also be triggered manually.

```text
GitHub Actions
      │
      │ Every 6 minutes
      ▼
Render Backend
      │
      └── Keeps the service active
```

## 📁 Project Structure

```text
project/
│
├── frontEnd/
│   └── src/
│       ├── pages/          # Application pages
│       └── components/     # Reusable UI components
│
├── backEnd/
│   ├── routes/             # Backend API routes
│   └── index.js            # Express server
│
└── .github/
    └── workflows/
        └── render-keepalive.yml        # Render keep-alive workflow
        └── supabase-keepalive.yml        # Supabase keep-alive workflow
```

## 🎯 Project Goal

The goal of NIT Manipur PYQ is to provide students with a simple, centralized, and reliable platform for accessing previous-year question papers while providing role-based administrative controls for maintaining the content.