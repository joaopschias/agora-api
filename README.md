# Agora API

## 📌 Description
Agora API is a scalable, well-structured RESTful API built with **TypeScript, Express, and TypeORM**. It includes features like authentication, user management, and database integration with **MariaDB**. The API is designed with **Domain-Driven Design (DDD)** principles to allow future scalability and potential migration to **microservices**.

---

## ⚙️ Requirements
Before setting up the project, ensure you have the following installed:
- [**Node.js (>=18.x)**](https://nodejs.org/)
- [**Yarn (>=1.x)**](https://yarnpkg.com/)
- [**Docker (>=20.x)**](https://www.docker.com/)
- [**Docker Compose Plugin (>=2.0.0)**](https://docs.docker.com/compose/)

---

## 🚀 Quick Start

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/joaopschias/agora-api.git && cd agora-api
```

### **2️⃣ Create the `.env` File**
```sh
cp .env.example .env
```
Edit the `.env` file and update necessary values.

### **3️⃣ Install Dependencies**
```sh
yarn install
```

### **4️⃣ Start the Database**
#### **Option 1: Run API & Database in Docker (Recommended)**
```sh
docker compose --profile dev up -d
```
This starts **both API & database inside Docker** for a fully containerized setup.

#### **Option 2: Run Only the Database in Docker**
```sh
docker compose up --build -d agora-database
```
Then start the API locally:
```sh
yarn dev
```

### **5️⃣ Run Database Migrations & Seeders**
```sh
yarn typeorm migration:run
```
```sh
yarn seed:run  # Optional, for test data
```

### **6️⃣ Start the API Server**
#### Development Mode (Auto-restart on Changes)
```sh
yarn dev
```
#### Production Mode
```sh
yarn build && yarn start
```

---

## 🛠 Essential Commands

### **Project Lifecycle**
- **Start in development mode (hot reload):**
  ```sh
  yarn dev
  ```
- **Build for production:**
  ```sh
  yarn build
  ```
- **Start production server:**
  ```sh
  yarn start
  ```

### **Database Management**
- **Run all migrations:**
  ```sh
  yarn typeorm migration:run
  ```
- **Generate a new migration:**
  ```sh
  yarn typeorm migration:generate -d src/infra/database/config.ts src/infra/database/migrations/<migration-name>
  ```
- **Revert last migration:**
  ```sh
  yarn typeorm migration:revert
  ```

### **Seeding the Database**
- **Run seeders:**
  ```sh
  yarn seed:run
  ```
- **Create a new seed file:**
  ```sh
  yarn seed:create
  ```

### **Linting & Formatting**
- **Check linting issues:**
  ```sh
  yarn lint:check
  ```
- **Fix linting issues:**
  ```sh
  yarn lint:fix
  ```
- **Check code formatting:**
  ```sh
  yarn format:check
  ```
- **Auto-format files:**
  ```sh
  yarn format:fix
  ```

### **Pre-Commit Hook (Husky)**
Ensures **linting & formatting checks before every commit**.
If commit is rejected:
```sh
 yarn format:fix && yarn lint:fix
```
Then retry:
```sh
git commit -am "your message"
```

---

## 🐳 Docker Cheat Sheet

- **Start all services (API + Database) in development mode:**
  ```sh
  docker compose --profile dev up -d --build
  ```
- **Start only the database:**
  ```sh
  docker compose up --build -d agora-database
  ```
- **Stop & remove all containers (Dev Mode):**
  ```sh
  docker compose --profile dev down
  ```
- **Check running containers:**
  ```sh
  docker ps
  ```
- **View API logs:**
  ```sh
  docker logs agora-api-dev -f
  ```
- **Stop all running containers:**
  ```sh
  docker stop $(docker ps -q)
  ```
- **Remove all stopped containers:**
  ```sh
  docker rm $(docker ps -a -q)
  ```
- **Remove all images:**
  ```sh
  docker rmi $(docker images -q)
  ```
- **Clean up unused containers, networks, and volumes:**
  ```sh
  docker system prune -a --volumes
  ```
- **View logs of a container:**
  ```sh
  docker logs <container_id>
  ```

---

## 📖 Conclusion
This README provides a complete guide to setting up and running the Agora API. Whether running locally or inside Docker, the steps ensure a smooth development experience.

If you have any questions or issues, feel free to reach out.

**Happy coding! 🚀**
