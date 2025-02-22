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

Happy coding! 🚀

