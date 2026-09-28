# 🍽️ Recipe Management System (MERN Stack)

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application where **admins** can create, read, update, and delete recipes, while **users** can browse recipes and view their detailed information.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Roles & Permissions](#-roles--permissions)
- [Screenshots](#-screenshots)
- [Testing with Postman](#-testing-with-postman)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👨‍💼 Admin Features
- 🔐 Secure authentication (JWT-based login)
- ➕ Create new recipes with image upload
- 📖 View all recipes
- ✏️ Update existing recipes (with optional image replacement)
- 🗑️ Delete recipes (automatically removes associated image file)
- 🖼️ Upload and manage recipe images

### 👤 User Features
- 🔐 Register / Login
- 🍳 Browse all available recipes
- 🔍 View detailed recipe information:
  - Title, description, and image
  - Ingredients list
  - Step-by-step instructions
  - Cooking time, servings, and category
  - Author information
- 📱 Responsive UI for mobile and desktop

### 🛠️ General Features
- RESTful API architecture
- File upload handling with Multer
- Input validation using Mongoose schemas
- Clean error handling and JSON responses
- Category-based recipe classification (Breakfast, Lunch, Dinner, Dessert, Snack, Other)

---

## 🧰 Tech Stack

### Frontend
- **React.js** – UI library
- **React Router** – Client-side routing
- **Axios** – HTTP requests
- **Tailwind CSS / CSS3** – Styling
- **Context API / Redux** – State management

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication
- **Multer** – File uploads
- **bcryptjs** – Password hashing

### Tools
- **Postman** – API testing
- **Git & GitHub** – Version control
- **VS Code** – Code editor

---

## 📁 Project Structure

```
recipe-management-system/
│
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── recipe.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── recipe.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── recipe.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   └── upload.middleware.js
│   ├── uploads/            # Uploaded recipe images
│   ├── config/
│   │   └── dbConfig.js
│   │   └── multerConfig.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CreateRecipe.jsx
│   │   │   └── EditRecipe.jsx
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── docs/
│   │   ├── images/
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/recipe-management-system.git
cd recipe-management-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder (see [Environment Variables](#-environment-variables)).

Run the backend server:

```bash
npm run dev
# or
npm start
```

Server runs on: `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipeDB
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 🌐 API Endpoints

### 🔑 Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/login` | Login user & get token | Public |
| GET | `/api/auth/profile` | Get logged-in user | Private |

### 🍲 Recipe Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/recipes` | Get all recipes | Public / User |
| GET |	`/api/recipes/search`| Search & filter recipes |Public / User
| GET | `/api/recipes/:recipeId` | Get single recipe details | Public / User |
| POST | `/api/recipes` | Create a new recipe | Admin |
| PUT | `/api/recipes/:recipeId` | Update a recipe | Admin |
| DELETE | `/api/recipes/:recipeId` | Delete a recipe | Admin |

> **Note:** For `POST` and `PUT`, use `multipart/form-data` and send `ingredients` and `instructions` as **JSON-stringified arrays**.

---

## 🧑‍💼 Roles & Permissions

| Action | User | Admin |
|--------|:----:|:-----:|
| Register / Login |  ❌ | ✅ |
| Browse recipes | ✅ | ✅ |
| View recipe details | ✅ | ✅ |
| Create recipe | ❌ | ✅ |
| Update recipe | ❌ | ✅ |
| Delete recipe | ❌ | ✅ |

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Home / Recipe List | `screenshots/home.png` |
| Recipe Details | `screenshots/recipe-details.png` |
| Admin Dashboard | `screenshots/admin-dashboard.png` |
| Create Recipe | `screenshots/create-recipe.png` |

---

## 🧪 Testing with Postman

### Create Recipe (Admin)

**Method:** `POST`  
**URL:** `http://localhost:5000/api/recipes`  
**Body:** `form-data`

| Key | Type | Value |
|-----|------|-------|
| title | Text | Chicken Biryani |
| description | Text | Aromatic Indian rice dish |
| ingredients | Text | `["2 cups rice","500g chicken","1 cup yogurt"]` |
| instructions | Text | `["Soak rice","Marinate chicken","Cook on low heat"]` |
| cookingTime | Text | 60 |
| servings | Text | 4 |
| category | Text | Lunch |
| recipeImage | File | *(select image)* |

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🚀 Future Enhancements

- ⭐ Recipe ratings and reviews
- ❤️ Favorite / bookmark recipes
- 🔍 Search and filter by category, cooking time
- 📄 Pagination for recipe list
- 🌐 Multi-language support
- 📧 Email notifications
- 🌙 Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**  
📧 your.email@example.com  
🔗 [GitHub](https://github.com/your-username)  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)

---

⭐ If you like this project, don't forget to give it a **star** on GitHub!