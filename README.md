# 📚 Library Management API

A simple and scalable RESTful API for managing library books and borrowing operations. Built with **Node.js**, **TypeScript**, **Express**, and **MongoDB** using **Mongoose**.

---
# Related Links
* [Frontend Repository](https://github.com/imtiaz-zihad/Library-Management-Frontend)
*  [Frontend link](https://library-management-frontend-site.vercel.app)
*  [Live link](https://libary-management-system-ten.vercel.app)

## 📌 Introduction

This project is a backend system built with **Express** and **TypeScript** to manage library operations such as:

- Book management  
- User registration  
- Borrowing summary and logs  
- Admin functionalities

MongoDB is used for persistent storage, and Mongoose handles object modeling.

---

## ✨ Features

- 📦 Express.js server with modular TypeScript structure
- 🌱 MongoDB integration via Mongoose ODM
- 🔐 Role-based access (Admin, Member)
- 📊 Borrow summary with aggregation pipeline
- 🧪 Schema validation (Zod or Joi)
- 🔁 Hot-reloading using `ts-node-dev`
- 🧹 Linting with ESLint & TypeScript rules
- 📤 Clean project structure with reusable services

---

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/imtiaz-zihad/Library-Management-Api.git
cd Library-Management-Api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/libraryDB
JWT_SECRET=your_jwt_secret
```

⚠️ **Do not commit `.env` files to version control.**

---

## 🚀 Usage

Run in development mode:

```bash
npm run dev
```

After running, the server will be available at:  
📍 `http://localhost:5000`

To build and run for production:

```bash
npm run build
npm start
```

---

## ⚙️ Configuration

| Variable      | Description                        |
|---------------|------------------------------------|
| `PORT`        | Port the server runs on            |
| `DATABASE_URL`| MongoDB connection string          |
| `JWT_SECRET`  | Secret for JWT signing             |

---

## 🗂️ Project Structure

```
Library-Management-Api/
├── src/
│   ├── app/              # Core modules (books, users, borrow)
│   ├── middlewares/
│   ├── routes/
│   └── utils/
├── config/
├── server.ts             # App entry point
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📜 Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Run development server (hot reload)  |
| `npm run build`    | Compile TypeScript to JavaScript     |
| `npm start`        | Run compiled app in production       |
| `npm run lint`     | Check linting issues                 |
| `npm run lint:fix` | Auto-fix lint issues                 |

---

## 📦 Dependencies

### Runtime
- `express` – Web framework  
- `mongoose` – MongoDB ORM  
- `dotenv` – Environment variable support  

### Dev
- `typescript` – TypeScript language support  
- `ts-node-dev` – Hot reload for development  
- `eslint` + `@typescript-eslint` – Linting  
- `@types/express` – Type definitions  

---

## 📡 API Endpoints

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| GET    | /api/books       | List all books              |
| POST   | /api/books       | Add a new book              |
| GET    | /api/books/:id   | Get a specific book         |
| PATCH  | /api/books/:id   | Update a book               |
| DELETE | /api/books/:id   | Delete a book               |
| GET    | /api/borrow      | Get borrow summary (agg)    |
| POST   | /api/borrow      | Borrow a book               |

### ✅ Borrow Summary Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

## 🧩 Troubleshooting

| Issue                     | Solution                                          |
|---------------------------|---------------------------------------------------|
| MongoDB connection failed | Ensure `DATABASE_URL` is correct and IP is whitelisted |
| Port already in use       | Change `PORT` in `.env`                           |
| TypeScript errors         | Check type definitions and interfaces             |

---

## 👥 Contributors

- **Imtiaz Zihad** – [@imtiaz-zihad](https://github.com/imtiaz-zihad)

---

## 🪪 License

Licensed under the **MIT License**.

---
