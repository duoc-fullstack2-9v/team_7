# 🎮 HAKEY - E-commerce de Videojuegos

## 📖 Descripción General

HAKEY es una plataforma de e-commerce especializada en la venta de videojuegos digitales. Permite a los usuarios navegar por un catálogo de juegos, agregar productos al carrito, realizar compras y recibir confirmaciones por email.

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de UI
- **React Router DOM** - Navegación SPA
- **Vite** - Build tool y dev server
- **CSS3** - Estilos personalizados

### Backend/API

- **Node.js + Express** - API REST desplegada en Vercel
- **MySQL** - Base de datos relacional
- **bcryptjs** - Encriptación de contraseñas
- **Nodemailer** - Envío de emails

### Servicios Externos

- **Vercel** - Hosting y deployment de API
- **API de Juegos**: `https://hakey-api-catalogo.vercel.app/api/games`
- **API de Usuarios**: `https://hakey-api-catalogo.vercel.app/api/users`
- **API de Emails**: `http://localhost:5000/api` (desarrollo)

---

## 📂 Estructura del Proyecto

```
team_7/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx       # Navegación y menú
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── GameCard.jsx     # Tarjeta de juego
│   │   ├── CartNotification.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loading.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── TextType.jsx
│   │
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx         # Página de inicio
│   │   ├── Catalog.jsx      # Catálogo de juegos
│   │   ├── GameDetail.jsx   # Detalle del juego
│   │   ├── Cart.jsx         # Carrito de compras
│   │   ├── FormularioCompra.jsx  # Checkout
│   │   ├── compraExitosa.jsx     # Confirmación
│   │   ├── Register.jsx     # Registro de usuarios
│   │   ├── Login.jsx        # Inicio de sesión
│   │   └── AdminPanel.jsx   # Panel de administración
│   │
│   ├── services/            # Servicios de API
│   │   ├── gamesApi.js      # Llamadas API de juegos
│   │   ├── usersApi.js      # Llamadas API de usuarios
│   │   └── emailService.js  # Envío de emails
│   │
│   ├── context/             # Context API
│   │   ├── AuthContext.jsx  # Autenticación de usuarios
│   │   └── CartContext.jsx  # Estado del carrito
│   │
│   ├── hooks/               # Custom hooks
│   │   └── useGames.js      # Hook para obtener juegos
│   │
│   ├── assets/              # Recursos estáticos
│   │   └── logohy.png
│   │
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
│
├── backend/                 # (Opcional - solo para desarrollo local)
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── docs/                    # Documentación
│   └── PROYECTO.md          # Este archivo
│
├── .env                     # Variables de entorno frontend
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/duoc-fullstack2-9v/team_7.git
cd team_7
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API de Juegos y Usuarios (Vercel)
VITE_API_URL=https://hakey-api-catalogo.vercel.app/api

# API de Emails (local o servidor)
VITE_EMAIL_API_URL=http://localhost:5000/api
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 🎯 Funcionalidades Principales

### 🏠 Para Usuarios

#### 1. Catálogo de Juegos

- ✅ Visualizar todos los juegos disponibles
- ✅ Ver detalles de cada juego (precio, descripción, imagen)
- ✅ Filtrar y buscar juegos
- ✅ Ver juegos destacados en el home

#### 2. Carrito de Compras

- ✅ Agregar juegos al carrito
- ✅ Ver resumen del carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Ver total de la compra
- ✅ Notificaciones visuales al agregar productos

#### 3. Proceso de Compra

- ✅ Formulario de checkout con validación
- ✅ Campos: Nombre, Email, Teléfono, Dirección
- ✅ Confirmación de compra por email
- ✅ Página de confirmación con detalles de la orden

#### 4. Autenticación

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión
- ✅ Cierre de sesión
- ✅ Persistencia de sesión (localStorage)
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Email de bienvenida al registrarse

#### 5. Emails Automatizados

- ✅ Email de bienvenida al registrarse
- ✅ Email de confirmación de compra
- ✅ Incluye detalles de la orden y productos

### 🔐 Para Administradores

#### Panel de Administración

- ✅ Acceso exclusivo para admin@hakey.com
- ✅ Ver listado de todos los juegos
- ✅ Crear nuevos juegos
- ✅ Editar juegos existentes
- ✅ Eliminar juegos
- ✅ Gestión completa del catálogo

---

## 🔌 API Endpoints

### Juegos (GET, POST, PUT, DELETE)

```
Base URL: https://hakey-api-catalogo.vercel.app/api/games
```

| Método | Endpoint | Descripción              |
| ------ | -------- | ------------------------ |
| GET    | `/`      | Obtener todos los juegos |
| GET    | `/:id`   | Obtener un juego por ID  |
| POST   | `/`      | Crear un nuevo juego     |
| PUT    | `/:id`   | Actualizar un juego      |
| DELETE | `/:id`   | Eliminar un juego        |

**Estructura de un Juego:**

```json
{
  "id": 1,
  "title": "The Witcher 3",
  "price": 29.99,
  "description": "RPG épico de mundo abierto",
  "image": "https://example.com/image.jpg",
  "category": "RPG",
  "stock": 100
}
```

### Usuarios (CRUD + Autenticación)

```
Base URL: https://hakey-api-catalogo.vercel.app/api
```

| Método | Endpoint      | Descripción                 |
| ------ | ------------- | --------------------------- |
| POST   | `/users`      | Crear usuario (Registro)    |
| POST   | `/auth/login` | Iniciar sesión              |
| GET    | `/users`      | Listar todos los usuarios   |
| GET    | `/users/:id`  | Obtener usuario por ID      |
| PUT    | `/users/:id`  | Actualizar usuario completo |
| PATCH  | `/users/:id`  | Actualizar usuario parcial  |
| DELETE | `/users/:id`  | Eliminar usuario            |

**Registro (POST api/usuarios):**

```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "contrasena": "Password123"
}
```

### Emails

```
Base URL: http://localhost:5000/api (desarrollo)
```

| Método | Endpoint                      | Descripción                   |
| ------ | ----------------------------- | ----------------------------- |
| POST   | `/send-welcome`               | Enviar email de bienvenida    |
| POST   | `/send-purchase-confirmation` | Enviar confirmación de compra |

---

## 🚀 Flujos de Usuario

### Flujo de Compra

```
1. Usuario navega el catálogo
   ↓
2. Selecciona un juego y ve sus detalles
   ↓
3. Agrega el juego al carrito
   ↓
4. Ve el carrito y procede al checkout
   ↓
5. Llena el formulario de compra
   ↓
6. Confirma la compra
   ↓
7. Sistema envía email de confirmación
   ↓
8. Usuario ve página de confirmación
   ↓
9. Carrito se vacía automáticamente
```

### Flujo de Registro y Login

```
REGISTRO:
1. Usuario va a /register
   ↓
2. Llena el formulario (nombre, email, teléfono, contraseña)
   ↓
3. Frontend valida los datos
   ↓
4. POST a /api/users
   ↓
5. API hashea la contraseña y guarda en BD
   ↓
6. API devuelve el usuario creado
   ↓
7. Frontend envía email de bienvenida
   ↓
8. Login automático
   ↓
9. Redirige al home

LOGIN:
1. Usuario va a /login
   ↓
2. Ingresa email y contraseña
   ↓
3. POST a /api/auth/login
   ↓
4. API verifica email y contraseña en BD
   ↓
5. API compara contraseña con bcrypt
   ↓
6. Si es válido, devuelve datos del usuario
   ↓
7. Frontend guarda en localStorage + Context
   ↓
8. Redirige (admin → /admin, user → /)
```

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 salt rounds)
- ✅ Validación de formularios en frontend
- ✅ Validación de payload en backend
- ✅ Email único (constraint en base de datos)
- ✅ Rutas protegidas (ProtectedRoute.jsx)
- ✅ CORS configurado en la API
- ✅ HTTPS en producción (Vercel)
- ✅ Contraseñas nunca se devuelven en respuestas

---

## 👤 Usuarios del Sistema

### Usuario Normal

- Email: cualquier email válido
- Puede: Navegar, comprar, ver su perfil

### Administrador

- Email: `admin@hakey.com`
- Puede: Acceder al panel de administración + todas las funciones de usuario normal
- Accede a: `/admin`

---

## 🐛 Troubleshooting

### Frontend no se conecta a la API

```bash
# Verifica las variables de entorno
cat .env

# Reinicia el servidor de desarrollo
npm run dev
```

### Error de CORS

- Verifica que la API tenga CORS habilitado
- Revisa las headers de la respuesta

### Email no se envía

- Verifica que el servidor de emails esté corriendo
- Revisa `VITE_EMAIL_API_URL` en `.env`

### Login falla con "Unexpected token"

- Verifica que el endpoint `/api/auth/login` exista en tu API
- Revisa la consola del navegador (F12) para ver logs detallados
- Verifica que la API devuelva JSON, no HTML

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Genera build de producción
npm run preview      # Preview del build

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 🎨 Características de UI/UX

- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Animaciones suaves con CSS
- ✅ Notificaciones visuales para acciones del usuario
- ✅ Loading states para operaciones asíncronas
- ✅ Manejo de errores con mensajes amigables
- ✅ Validación de formularios en tiempo real
- ✅ Indicadores visuales de fortaleza de contraseña
- ✅ Footer con información de contacto

---

## 🚧 Próximas Mejoras

- [ ] Implementar JWT para autenticación
- [ ] Agregar sistema de roles más complejo
- [ ] Historial de compras del usuario
- [ ] Wishlist / favoritos
- [ ] Comparación de juegos
- [ ] Reseñas y calificaciones
- [ ] Sistema de puntos/recompensas
- [ ] Integración con pasarela de pago real
- [ ] Panel de estadísticas para admin
- [ ] Búsqueda avanzada y filtros

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico de DUOC UC.

---

## 👥 Equipo

**Team 7 - Fullstack 2**

- Repositorio: https://github.com/duoc-fullstack2-9v/team_7
- Branch: feature/implementacion

---

## 📞 Contacto

Para preguntas o soporte, contactar al equipo de desarrollo.

---

**Última actualización:** 14 de Octubre, 2025
