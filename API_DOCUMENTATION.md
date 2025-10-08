# API de Juegos - Documentación

## URL Base

```
https://hakey-api-catalogo.vercel.app
```

## Endpoints Disponibles

### 1. **GET** - Obtener todos los juegos

```
GET https://hakey-api-catalogo.vercel.app/api/games
```

**Respuesta:** Array de objetos con todos los juegos

---

### 2. **GET** - Obtener un juego por ID

```
GET https://hakey-api-catalogo.vercel.app/api/games/:id
```

**Parámetros:**

- `id` (string): ID único del juego

**Respuesta:** Objeto con los datos del juego

---

### 3. **POST** - Crear un nuevo juego

```
POST https://hakey-api-catalogo.vercel.app/games
```

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body (Formato JSON):**

```json
{
  "title": "Nombre del Juego",
  "price": 29.99,
  "originalPrice": 59.99,
  "discount": 50,
  "image": "https://url-de-la-imagen.jpg",
  "category": "RPG",
  "platform": ["PC", "PlayStation", "Xbox"],
  "rating": 4.5,
  "description": "Descripción del juego...",
  "requirements": {
    "os": "Windows 10",
    "processor": "Intel Core i7-4790",
    "memory": "12 GB RAM",
    "graphics": "NVIDIA GeForce GTX 1060",
    "storage": "70 GB available space"
  },
  "features": ["Single Player", "Mundo Abierto", "Historia Rica"],
  "releaseDate": "2020-12-10",
  "publisher": "Publisher Name",
  "featured": true
}
```

---

### 4. **PUT** - Actualizar un juego completo

```
PUT https://hakey-api-catalogo.vercel.app/api/games/:id
```

**Parámetros:**

- `id` (string): ID del juego a actualizar

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body:** Objeto completo del juego (mismo formato que POST)

---

### 5. **PATCH** - Actualizar campos específicos

```
PATCH https://hakey-api-catalogo.vercel.app/api/games/:id
```

**Parámetros:**

- `id` (string): ID del juego a actualizar

**Headers:**

```json
{
  "Content-Type": "application/json"
}
```

**Body (Ejemplo):**

```json
{
  "price": 24.99,
  "discount": 60
}
```

---

### 6. **DELETE** - Eliminar un juego

```
DELETE https://hakey-api-catalogo.vercel.app/api/games/:id
```

**Parámetros:**

- `id` (string): ID del juego a eliminar

---

## Estructura de Datos del Juego

```typescript
{
  id: number | string,
  title: string,
  price: number,
  originalPrice: number,
  discount: number,
  image: string (URL),
  category: string,
  platform: string[],
  rating: number,
  description: string,
  requirements: {
    os: string,
    processor: string,
    memory: string,
    graphics: string,
    storage: string
  },
  features: string[],
  releaseDate: string (ISO date),
  publisher: string,
  featured: boolean
}
```

## Uso en la Aplicación

La aplicación ya está configurada para consumir esta API automáticamente. Los datos se cargan desde:

- **Home**: Muestra juegos destacados y ofertas
- **Catálogo**: Lista completa con filtros y búsqueda
- **Detalle del Juego**: Información completa del juego seleccionado

### Archivos Creados

1. **`src/services/gamesApi.js`**: Funciones para consumir la API
2. **`src/hooks/useGames.js`**: Hooks personalizados para gestión de estado
3. **`src/components/Loading.jsx`**: Componente de carga
4. **`src/components/ErrorMessage.jsx`**: Componente de error

### Funcionalidades Implementadas

✅ Carga de datos desde la API  
✅ Estados de carga (loading)  
✅ Manejo de errores  
✅ Reintentar carga (refetch)  
✅ Filtrado y búsqueda local  
✅ Ordenamiento de resultados  
✅ Categorías dinámicas

## Ejemplos de Uso

### Desde JavaScript (fetch)

```javascript
// Obtener todos los juegos
const games = await fetch(
  "https://hakey-api-catalogo.vercel.app/api/games"
).then((res) => res.json());

// Obtener un juego específico
const game = await fetch(
  "https://hakey-api-catalogo.vercel.app/api/games/1"
).then((res) => res.json());
```

### Usando las funciones del servicio

```javascript
import { getAllGames, getGameById } from "./services/gamesApi";

// En un componente
const games = await getAllGames();
const game = await getGameById("1");
```

### Usando los hooks personalizados

```javascript
import { useGames, useGame } from "./hooks/useGames";

// En un componente React
const { games, loading, error, refetch } = useGames();
const { game, loading, error } = useGame(gameId);
```
