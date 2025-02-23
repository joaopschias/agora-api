# Agora API

## 🚀 Project Setup

### **1️⃣ Install Dependencies**
Ensure you have **Node.js** installed, then run:
```sh
yarn install
```

### **2️⃣ Run the Project**
Start the development server:
```sh
yarn dev
```

### **3️⃣ Build for Production**
To compile TypeScript to JavaScript:
```sh
yarn build
```

### **4️⃣ Start Production Server**
```sh
yarn start
```

---

## ✅ Code Quality & Formatting

### **Linting & Formatting**
To check for linting errors:
```sh
yarn lint:check
```
To fix linting issues automatically:
```sh
yarn lint:fix
```

To check formatting:
```sh
yarn format:check
```
To auto-format files:
```sh
yarn format:fix
```

---

## 🔄 Pre-Commit Hook (Husky)

This project uses **Husky** to enforce linting and formatting before commits.
If your commit is rejected, run:
```sh
yarn lint:fix && yarn format:fix
```
Then retry the commit:
```sh
git commit -am "your message"
```

---

## 🐳 Running with Docker

To run the project using Docker, follow these steps:

We use this method to separate concerns between the **database** and the **application** itself. This allows the MySQL database to run in a container while developing the application locally, enabling live reload for faster development cycles. This approach provides **flexibility** and **efficiency** during development.

> **Note:** If you are using an older version of Docker (before version **20.x** or without the **Docker Compose plugin**), the command `docker compose` may not work. In that case, use `docker-compose` instead. Ensure your Docker version is **up-to-date** to avoid compatibility issues.

### **1️⃣ Start MySQL using Docker Compose**
```sh
docker compose up -d agora-mysql
```

### **2️⃣ Run the API Locally with Docker MySQL**
Ensure your **.env** file has the correct database connection settings, then start the server:
```sh
yarn dev
```

### **3️⃣ Start All Services (API + MySQL) using Docker**
#### Development Mode:
```sh
docker compose --profile dev up -d
```

#### Production Mode:
```sh
docker compose --profile prod up -d
```

### **4️⃣ Stop & Remove Containers**
#### Stop & Remove Dev Containers:
```sh
docker compose --profile dev down
```
#### Stop & Remove Prod Containers:
```sh
docker compose --profile prod down
```

### **5️⃣ Checking Running Containers**
```sh
docker ps
```

### **6️⃣ Viewing Logs**
#### View API Logs:
```sh
docker logs agora-api-dev -f
```
#### View Database Logs:
```sh
docker logs agora-mysql -f
```

---

## 🎯 API Endpoints

### **Health Check**
```sh
curl -i http://localhost:3000/api/health
```

### **Test Database Connection**
```sh
curl -i http://localhost:3000/api/db-check
```


---

Happy coding! 🚀