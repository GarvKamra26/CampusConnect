# CampusConnect

CampusConnect is a campus community platform where students connect through chatrooms, messaging, profiles, campus events, and clubs.

## Features

- **Authentication** --- signup and login with JWT

- **Student profiles** --- view authenticated user profiles

- **Chatrooms** --- system and student-created rooms

- **Messaging** --- chat history and real-time updates with Socket.IO

- **Events and clubs** --- campus event and student club information

## Tech Stack

- **Frontend:** React, Vite, CSS

- **Backend:** Node.js, Express

- **Database:** MySQL

- **API requests:** Axios

- **Authentication:** JWT

- **Real-time communication:** Socket.IO

## Project Structure

```
campusconnect/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── .env.example
    └── src/
        ├── components/
        └── pages/
```

## Local Setup

**Requirements:** Node.js, npm, MySQL, and Git.

1. Clone the repository:

```
git clone <repository-url>
cd campusconnect
```

2. Create the MySQL database and ensure the required tables are set up:

```
CREATE DATABASE campusConnect;
```

3. `.env.example` files are included wherever needed. Copy each one to `.env` in its respective directory and fill in your local values. Do not commit real credentials.

4. Install dependencies and start the backend:

```
cd backend
npm install
npm start
```

5. In another terminal, start the frontend:

```
cd frontend
npm install
npm run dev
```

If your `package.json` uses different script names, use the corresponding scripts.

## API Overview


Area                    Route                           Purpose


Authentication          `/api/auth`                     Signup and login

Profile                 `GET /users/profile`            Get the authenticated user's profile

Chatrooms               `/chatrooms`                    Browse chatrooms

Messages                `/chatrooms/:roomId/messages`   Retrieve or send room messages

Events                  `/events`                       Campus event endpoints

## Clubs                   `/clubs`                        Student club endpoints

Protected endpoints use a JWT:

```
Authorization: Bearer <access-token>
```


