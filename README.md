# 🛍️ E-Commerce Platform (WAF Assignment 2)

A robust and responsive full-stack e-commerce application built using the **MERN** (MongoDB, Express.js, React, Node.js) stack. This project replicates core functionalities of modern e-commerce platforms like Daraz, featuring a dynamic frontend, secure authentication, and a scalable backend API.

## 🚀 Features

### 🌟 User Experience
*   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
*   **Dynamic Hero Carousel**: Engaging homepage with auto-scrolling banners.
*   **Product Search**: Real-time search functionality to find products instantly.
*   **Toast Notifications**: Elegant, non-intrusive popup notifications for user actions (e.g., "Added to Cart").

### 🛒 Shopping & Checkout
*   **Global Cart Management**: Real-time cart updates across the application using React Context API.
*   **Seamless Checkout**: Integrated order placement system that automatically clears the cart upon successful purchase.
*   **Product Details**: Comprehensive view with images, ratings, descriptions, and delivery information.

### 🔐 Authentication & Security
*   **User Accounts**: Secure Sign Up and Login functionality.
*   **Protected Routes**: Restricted access to specific features for authenticated users.

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **React.js**: Component-based UI library.
*   **Vite**: Next-generation frontend tooling for fast builds.
*   **React Router DOM**: Client-side routing.
*   **Context API**: Global state management (Auth, Cart, Toast).
*   **Axios**: HTTP client for API requests.
*   **CSS3**: Custom responsive styling with Flexbox and Grid.

### Backend (Server)
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database for flexible data storage.
*   **Mongoose**: ODM library for MongoDB and Node.js.

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### 1. Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas URL)

### 2. Clone the Repository
```bash
git clone <repository-url>
cd WAF-A2-Muhammad-Ali-Sultan-Muhammad-Waleed
```

### 3. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/waf_ecommerce
```

Start the backend server:
```bash
npm run dev
# Server running on port 5000
```

### 4. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
# Client running on http://localhost:5173
```

---

## 📂 Project Structure

```
root/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── context/        # Context Providers (Auth, Cart, Toast)
│   │   ├── pages/          # Application Pages (Home, Product, Cart, etc.)
│   │   └── assets/         # Images and static files
│   └── ...
│
├── server/                 # Backend Node.js Application
│   ├── controllers/        # Request logic
│   ├── models/             # Mongoose Database Schemas
│   ├── routes/             # API Endpoints
│   └── ...
└── README.md               # Project Documentation
```

---

## 👥 Contributors

*   **Muhammad Ali Sultan**
*   **Muhammad Waleed**

---

*This project was developed for the Web Application Frameworks (WAF) Assignment 2.*
