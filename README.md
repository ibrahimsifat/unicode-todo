# Todo Application

A full-stack task management application with real-time updates, assignment capabilities, and multi-language support.

## 📝 Documentation & Demo , Diagrams

- [Frontend](https://unicode-todo.vercel.app/)
- [Backend API](https://unicode-todo-vq1q.onrender.com/api/v1/api-docs/)
- [Feature Video](https://youtu.be/gHwO_4W4h2w)
- [Project Documentation](https://ibrahimsifat.notion.site/UNICODE-TODO-13c5ac2bfa4980fabb78f6fd85790dfa)
- [ER Diagram](https://drive.google.com/file/d/1NxNJhpCWooz29v22M0q7SqsiE8tVPKDA/view?usp=sharing)
- [Application Flow Diagram](https://www.mermaidchart.com/raw/1474b543-6664-4a19-913f-d6c26b42b100?theme=light&version=v0.1&format=svg)
- [Component Tree Diagram](https://www.mermaidchart.com/raw/195c8386-b644-4ec8-958b-8ad8c42c071f?theme=light&version=v0.1&format=svg)

## ✨ Features

- 🔐 **User Authentication & Authorization**

  - Secure login system
  - Protected routes

- 📋 **Task Management**

  - Create, read, update, and delete tasks
  - Priority levels (High, Medium, Low)
  - Status tracking
  - Due date management

- 🌐 **Internationalization**
  - English and Arabic language support
  - RTL layout support
  - Dynamic locale switching

## 🛠️ Tech Stack

- **Frontend**

  - Next.js
  - Redux Toolkit
  - RTK Query
  - Tailwind CSS

- **State Management**

  - Redux for global state
  - RTK Query for API cache
  - Local storage for persistence

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - Socket.io

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/ibrahimsifat/unicode-todo.git
cd unicode-todo
```

2. **Backend**

```bash
cd backend
```

**_Development_**

```bash
cp .env.example .env
```

```
docker-compose -f docker-compose.dev.yml up --build
```

**_Production_**

```
docker-compose -f docker-compose.prod.yml up --build
```

**Services will be available at:**

- Frontend: http://localhost:3000 (running locally)
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Mongo Express: http://localhost:8081

3. **FrontEnd**

```bash
cd frontend
```

Start the development environment:

```bash
docker compose up
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

The application will run on http://localhost:3000

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

- **Project**: [Ibrahim Sifat](https://github.com/ibrahimsifat)

## 📞 Support

For support, email ibrahimsifat.me@gmail.com

---

Made with ❤️ by [Ibrahim Sifat](https://github.com/ibrahimsifat)
