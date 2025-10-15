# 🎮 HAKEY - E-commerce de Videojuegos

Plataforma de e-commerce especializada en la venta de videojuegos digitales.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus configuraciones

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 📚 Documentación

Para documentación completa del proyecto, consulta:

- **[📖 Documentación del Proyecto](./docs/PROYECTO.md)** - Guía completa

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express (API en Vercel)
- **Base de Datos:** MySQL
- **Autenticación:** bcryptjs
- **Email:** Nodemailer

## ✨ Características Principales

- ✅ Catálogo de videojuegos
- ✅ Carrito de compras
- ✅ Sistema de autenticación (registro/login)
- ✅ Proceso de checkout
- ✅ Confirmación por email
- ✅ Panel de administración
- ✅ Gestión de usuarios

## 🔗 URLs de la API

```env
# API de Juegos y Usuarios
VITE_API_URL=https://hakey-api-catalogo.vercel.app/api

# API de Emails
VITE_EMAIL_API_URL=http://localhost:5000/api
```

## 👥 Usuarios del Sistema

- **Usuario Normal:** Cualquier email válido
- **Administrador:** `admin@hakey.com`

## 📝 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting
```

## 📂 Estructura

```
src/
├── components/      # Componentes reutilizables
├── pages/          # Páginas principales
├── services/       # Servicios de API
├── context/        # Context API (Auth, Cart)
├── hooks/          # Custom hooks
└── assets/         # Recursos estáticos
```

## 🐛 Soporte

Para documentación detallada, troubleshooting y guías, consulta `docs/PROYECTO.md`

---

**Team 7 - DUOC UC - Fullstack 2**  
Branch: `feature/implementacion`+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
