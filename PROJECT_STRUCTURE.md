# 📁 Estructura del Proyecto HAKEY

> **HAKEY** - Tienda de Game Keys con React + Vite y API Node.js/MySQL

---

## 🌳 Árbol de Archivos

```
HAKEY-NODEJS-REACT/
│
├── public/                         # Archivos públicos estáticos
│   └── vite.svg                   # Logo de Vite
│
├── src/                           # Código fuente principal
│   ├── assets/                    # Recursos (imágenes, logos)
│   │   └── logohy.png            # Logo de HAKEY
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── CartNotification.jsx  # Notificación al agregar al carrito
│   │   ├── CartNotification.css  # Estilos de notificación (verde)
│   │   ├── ErrorMessage.jsx      # Mensaje de error con retry
│   │   ├── ErrorMessage.css      # Estilos de error
│   │   ├── GameCard.jsx          # Tarjeta de juego del catálogo
│   │   ├── GameCard.css          # Estilos de tarjeta de juego
│   │   ├── Header.jsx            # Encabezado con navegación
│   │   ├── Header.css            # Estilos del header
│   │   ├── Loading.jsx           # Spinner de carga
│   │   ├── Loading.css           # Estilos del spinner
│   │   ├── ProtectedRoute.jsx    # HOC para rutas protegidas (admin)
│   │   ├── TextType.jsx          # Componente de efecto typing (GSAP)
│   │   └── TextType.css          # Estilos del efecto typing
│   │
│   ├── context/                  # Contextos de React
│   │   ├── AuthContext.jsx       # Gestión de autenticación
│   │   └── CartContext.jsx       # Gestión del carrito de compras
│   │
│   ├── hooks/                    # Custom Hooks
│   │   └── useGames.js           # Hook para obtener juegos de la API
│   │
│   ├── pages/                    # Páginas/Vistas principales
│   │   ├── AdminPanel.jsx        # Panel de administración CRUD
│   │   ├── AdminPanel.css        # Estilos del admin panel
│   │   ├── Cart.jsx              # Página del carrito de compras
│   │   ├── Cart.css              # Estilos del carrito
│   │   ├── Catalog.jsx           # Catálogo de juegos con filtros
│   │   ├── Catalog.css           # Estilos del catálogo
│   │   ├── GameDetail.jsx        # Detalles de un juego específico
│   │   ├── GameDetail.css        # Estilos de detalles
│   │   ├── Home.jsx              # Página de inicio
│   │   ├── Home.css              # Estilos del home
│   │   ├── Login.jsx             # Página de inicio de sesión
│   │   ├── Login.css             # Estilos del login
│   │   ├── Register.jsx          # Página de registro
│   │   └── Register.css          # Estilos del registro
│   │
│   ├── services/                 # Servicios/API
│   │   └── gamesApi.js           # Funciones para consumir API REST
│   │
│   ├── App.jsx                   # Componente raíz con rutas
│   ├── App.css                   # Estilos globales de App
│   ├── footer.jsx                # Componente de pie de página
│   ├── Footer.css                # Estilos del footer
│   ├── main.jsx                  # Punto de entrada de React
│   └── index.css                 # Estilos globales CSS
│
├── .gitignore                    # Archivos ignorados por Git
├── ADMIN_PANEL_GUIDE.md          # Guía del panel de administración
├── API_DOCUMENTATION.md          # Documentación de la API
├── eslint.config.js              # Configuración de ESLint
├── index.html                    # HTML principal
├── package.json                  # Dependencias y scripts
├── PROJECT_STRUCTURE.md          # Este archivo
├── README.md                     # Documentación del proyecto
├── TECNOLOGIAS.md                # Tecnologías utilizadas
└── vite.config.js                # Configuración de Vite

```

---

## 📄 Descripción de Archivos Principales

### 🎯 **Archivos de Configuración**

| Archivo            | Descripción                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `package.json`     | Dependencias del proyecto (React, React Router, GSAP, react-icons) |
| `vite.config.js`   | Configuración de Vite (build tool)                                 |
| `eslint.config.js` | Reglas de linting para código limpio                               |
| `index.html`       | HTML raíz donde se monta React                                     |

---

### 🎨 **Componentes (`src/components/`)**

#### **CartNotification.jsx**

- **Propósito**: Notificación visual al agregar un juego al carrito
- **Características**:
  - Mensaje verde con icono de check
  - Animación de entrada/salida
  - Desaparece automáticamente después de 3 segundos
  - Posicionado en esquina superior derecha

#### **ErrorMessage.jsx**

- **Propósito**: Componente de error con opción de reintentar
- **Props**: `message`, `onRetry`
- **Uso**: Mostrar errores de API con botón de retry

#### **GameCard.jsx**

- **Propósito**: Tarjeta de juego para catálogo y listas
- **Características**:
  - Imagen con badge de descuento
  - Overlay con botón "Agregar al carrito"
  - Rating, plataformas, precio
  - Enlace a detalles del juego

#### **Header.jsx**

- **Propósito**: Barra de navegación principal
- **Características**:
  - Logo, menú de navegación
  - Icono de carrito con contador de items
  - Enlace a login/admin según estado de autenticación
  - Responsive con menú hamburguesa

#### **Loading.jsx**

- **Propósito**: Spinner de carga animado
- **Props**: `message` (opcional)
- **Uso**: Estados de carga en páginas y componentes

#### **ProtectedRoute.jsx**

- **Propósito**: HOC para proteger rutas (requiere autenticación)
- **Props**: `adminOnly` (boolean)
- **Uso**: Envuelve componentes que requieren login o permisos admin

#### **TextType.jsx**

- **Propósito**: Efecto de escritura/typing animado
- **Tecnología**: GSAP para animaciones
- **Características**:
  - Escribe y borra texto carácter por carácter
  - Cursor parpadeante animado
  - Soporte para múltiples textos en loop
  - Velocidad configurable
- **Uso**: Título principal del Home

---

### 🗂️ **Contextos (`src/context/`)**

#### **AuthContext.jsx**

- **Propósito**: Gestión global de autenticación
- **Estado gestionado**:
  - `user`: Datos del usuario actual
  - `isAuthenticated`: Booleano de estado de login
- **Funciones**:
  - `login(email, password)`: Iniciar sesión
  - `register(userData)`: Crear cuenta
  - `logout()`: Cerrar sesión
- **Persistencia**: LocalStorage

#### **CartContext.jsx**

- **Propósito**: Gestión global del carrito de compras
- **Estado gestionado**:
  - `cart`: Array de juegos en el carrito
  - `notification`: Mensaje de notificación
- **Funciones**:
  - `addToCart(game)`: Agregar juego (con notificación)
  - `removeFromCart(gameId)`: Eliminar juego
  - `updateQuantity(gameId, quantity)`: Cambiar cantidad
  - `clearCart()`: Vaciar carrito
  - `getCartTotal()`: Calcular total
  - `getCartItemsCount()`: Contar items
- **Persistencia**: LocalStorage

---

### 🎣 **Hooks (`src/hooks/`)**

#### **useGames.js**

- **Propósito**: Custom hook para obtener juegos de la API
- **Retorna**:
  - `games`: Array de juegos
  - `loading`: Estado de carga
  - `error`: Mensaje de error
  - `refetch()`: Función para recargar
- **Variantes**:
  - `useGames()`: Obtiene todos los juegos
  - `useGame(id)`: Obtiene un juego específico

---

### 📄 **Páginas (`src/pages/`)**

#### **Home.jsx**

- **Ruta**: `/`
- **Descripción**: Página de inicio con hero section
- **Secciones**:
  - Hero con efecto typing ("Game Keys", "Ofertas", "Aventuras")
  - Estadísticas (juegos disponibles, usuarios, descuentos)
  - Juegos destacados (featured)
  - Mejores ofertas (>20% descuento)
- **Características**: Scroll automático al inicio

#### **Catalog.jsx**

- **Ruta**: `/catalog`
- **Descripción**: Catálogo completo de juegos
- **Características**:
  - Búsqueda por título
  - Filtro por categoría (Todos, Acción, RPG, etc.)
  - Ordenamiento (destacados, precio, rating, nombre)
  - Grid responsive de GameCards
- **Estados**: Loading, error, sin resultados

#### **GameDetail.jsx**

- **Ruta**: `/game/:id`
- **Descripción**: Detalles completos de un juego
- **Secciones**:
  - Imagen principal
  - Título, categoría, rating
  - Precios (original + descuento)
  - Descripción completa
  - Requisitos del sistema
  - Características incluidas
  - Fecha de lanzamiento, publisher
  - Botón "Agregar al carrito"
  - Juegos relacionados (misma categoría)
- **Características**: Scroll automático, botón "Volver"

#### **Cart.jsx**

- **Ruta**: `/cart`
- **Descripción**: Carrito de compras
- **Características**:
  - Lista de juegos agregados
  - Control de cantidad (+/-)
  - Eliminar items
  - Resumen de compra (subtotal, descuento, total)
  - Botón "Vaciar carrito"
  - Estado vacío con enlace al catálogo
- **Responsive**: Tabla en desktop, cards en mobile

#### **Login.jsx**

- **Ruta**: `/login`
- **Descripción**: Inicio de sesión
- **Campos**:
  - Email
  - Password
- **Características**:
  - Validación de formulario
  - Mensajes de error
  - Enlace a registro
  - Redirección post-login (admin si es admin, home si usuario normal)

#### **Register.jsx**

- **Ruta**: `/register`
- **Descripción**: Registro de usuario
- **Campos**:
  - Nombre
  - Email
  - Password
  - Confirmación de password
- **Validaciones**:
  - Email válido
  - Passwords coinciden
  - Todos los campos requeridos

#### **AdminPanel.jsx**

- **Ruta**: `/admin`
- **Protección**: Solo usuarios admin
- **Descripción**: Panel CRUD completo para gestionar juegos
- **Funciones**:
  - **Crear**: Formulario para agregar nuevos juegos
  - **Leer**: Lista de todos los juegos con scroll
  - **Actualizar**: Modal de edición con todos los campos
  - **Eliminar**: Confirmación antes de borrar
- **Campos del formulario**:
  - Título, descripción, imagen (URL)
  - Precio original, descuento
  - Categoría, plataforma, rating
  - Fecha de lanzamiento, publisher
  - Requisitos del sistema (OS, procesador, RAM, gráficos, almacenamiento)
  - Características incluidas (array)
- **Características**:
  - Vista previa de imagen
  - Validaciones en tiempo real
  - Mensajes de éxito/error
  - Botones de acción (editar/eliminar) en cada juego

---

### 🔌 **Servicios (`src/services/`)**

#### **gamesApi.js**

- **Propósito**: Capa de servicios para la API REST
- **URL Base**: `https://hakey-api-catalogo.vercel.app/api/games`

**Funciones principales**:

| Función                                  | Método | Endpoint         | Descripción                  |
| ---------------------------------------- | ------ | ---------------- | ---------------------------- |
| `getAllGames()`                          | GET    | `/api/games`     | Obtiene todos los juegos     |
| `getGameById(id)`                        | GET    | `/api/games/:id` | Obtiene un juego por ID      |
| `createGame(gameData)`                   | POST   | `/api/games`     | Crea un nuevo juego          |
| `patchGame(id, gameData)`                | PATCH  | `/api/games/:id` | Actualiza un juego (parcial) |
| `deleteGame(id)`                         | DELETE | `/api/games/:id` | Elimina un juego             |
| `filterGamesByCategory(games, category)` | -      | -                | Filtro local por categoría   |
| `searchGames(games, searchTerm)`         | -      | -                | Búsqueda local por título    |
| `sortGames(games, sortBy)`               | -      | -                | Ordenamiento local           |

**Formato de datos del juego**:

```javascript
{
  id: number,
  title: string,
  description: string,
  price: number,              // Precio con descuento aplicado
  originalPrice: number,      // Precio original
  discount: number,           // Porcentaje de descuento (0-100)
  image: string,              // URL de la imagen
  category: string,           // "Acción", "RPG", "Estrategia", etc.
  platform: array,            // ["PC", "PlayStation", "Xbox"]
  rating: number,             // 0-5
  requirements: {
    os: string,
    processor: string,
    memory: string,
    graphics: string,
    storage: string
  },
  features: array,            // ["Multijugador", "Logros", etc.]
  releaseDate: string,        // "YYYY-MM-DD"
  publisher: string,
  featured: boolean           // Si aparece en destacados
}
```

---

### 🎨 **Archivos de Estilos**

#### **index.css**

- **Propósito**: Estilos globales y variables CSS
- **Variables CSS**:
  ```css
  --primary-purple: #7000a3
  --accent-purple: #992acb
  --primary-green: #23a800
  --secondary-green: #2dd400
  --dark-bg: #0f0920
  --darker-bg: #05030f
  --card-bg: #1a0f2e
  --text-light: #f5f5f5
  --text-gray: #a0a0a0
  ```
- **Reset**: Box-sizing, márgenes, padding
- **Tipografía**: Font-family principal

#### **App.css**

- **Propósito**: Estilos del layout principal
- **Clases**:
  - `.app`: Contenedor principal con flexbox
  - `.main-content`: Contenido entre header y footer
  - `.container`: Wrapper con max-width y padding

#### **Estilos de componentes**

- Cada componente tiene su archivo CSS
- Naming convention: `.component-name__element`
- Responsive con media queries

---

### 🚀 **Archivos de Entrada**

#### **main.jsx**

- **Propósito**: Punto de entrada de React
- **Funciones**:
  - Monta la aplicación en `#root`
  - Envuelve App en React.StrictMode
  - Importa estilos globales

#### **App.jsx**

- **Propósito**: Componente raíz con Router
- **Estructura**:
  ```jsx
  <AuthProvider>
    <CartProvider>
      <Router>
        <Header />
        <CartNotification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  </AuthProvider>
  ```

---

## 🔗 **Rutas de la Aplicación**

| Ruta        | Componente | Protección | Descripción                  |
| ----------- | ---------- | ---------- | ---------------------------- |
| `/`         | Home       | Pública    | Página de inicio             |
| `/catalog`  | Catalog    | Pública    | Catálogo de juegos           |
| `/game/:id` | GameDetail | Pública    | Detalles de un juego         |
| `/cart`     | Cart       | Pública    | Carrito de compras           |
| `/login`    | Login      | Pública    | Inicio de sesión             |
| `/register` | Register   | Pública    | Registro de usuario          |
| `/admin`    | AdminPanel | Admin only | Panel de administración CRUD |

---

## 🎨 **Paleta de Colores**

| Color           | Hex       | Uso                                 |
| --------------- | --------- | ----------------------------------- |
| Purple Primary  | `#7000a3` | Botones, links, acentos principales |
| Purple Accent   | `#992acb` | Gradientes, hover states            |
| Green Primary   | `#23a800` | Notificaciones de éxito             |
| Green Secondary | `#2dd400` | Gradientes de éxito                 |
| Dark BG         | `#0f0920` | Fondo principal                     |
| Darker BG       | `#05030f` | Fondo más oscuro                    |
| Card BG         | `#1a0f2e` | Fondo de tarjetas                   |
| Text Light      | `#f5f5f5` | Texto principal                     |
| Text Gray       | `#a0a0a0` | Texto secundario                    |

---

## 📦 **Dependencias Principales**

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "react-icons": "^5.4.0",
  "gsap": "^3.12.5"
}
```

---

## 🛠️ **Scripts NPM**

```bash
npm run dev          # Inicia servidor de desarrollo (Vite)
npm run build        # Construye para producción
npm run preview      # Preview de build de producción
npm run lint         # Ejecuta ESLint
```

---

## 🌐 **API Backend**

- **URL**: `https://hakey-api-catalogo.vercel.app`
- **Base de datos**: MySQL
- **Hosting**: Vercel
- **Documentación**: Ver `API_DOCUMENTATION.md`

---

## 📝 **Notas Importantes**

1. **LocalStorage**:

   - Carrito: `cart`
   - Usuario: `user`

2. **Admin**:

   - Email admin: `admin@hakey.com`
   - Flag: `isAdmin: true`

3. **Responsive**:

   - Breakpoints: 768px (tablet), 480px (mobile)
   - Mobile-first approach

4. **Animaciones**:

   - GSAP para TextType
   - CSS transitions para hover/interacciones

5. **SEO**:
   - Scroll automático en cambio de ruta
   - Títulos descriptivos por página

---

**Autor**: Javier  
**Versión**: 1.0.0  
**Última actualización**: Octubre 2025
