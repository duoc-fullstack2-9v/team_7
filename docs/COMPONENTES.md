## Documentación de Componentes y Mecanismos del Proyecto

Este documento explica cómo funcionan en el proyecto los siguientes aspectos:

- Componentes principales y su responsabilidad
- Jerarquía de componentes y flujo de datos (props)
- Uso de hooks personalizados y de React
- Mantenedor de carrito (CartContext): API, comportamiento y ejemplos

Los archivos citados están en `src/` y se indican las rutas concretas para referencia.

---

## 1. Componentes principales

Rutas de interés:

- `src/components/GameCard.jsx` — tarjeta de juego usada en listados
- `src/components/Header.jsx` — header principal, muestra el carrito y auth
- `src/components/CartNotification.jsx` — notificación simple para el carrito
- `src/pages/Cart.jsx` — página del carrito

Descripción rápida:

- GameCard: recibe una prop `game` (objeto) y muestra imagen, título, precio,
  plataformas y botón para agregar al carrito. Usa `useCart()` para llamar a
  `addToCart(game)`.

- Header: componente de cabecera que consume `useCart()` (para el contador)
  y `useAuth()` (para mostrar usuario / links). Muestra un badge con la
  cantidad de items y enlaces de navegación.

- CartNotification: componente presentacional que recibe `message` y la muestra
  (si `message` es falsy no renderiza). Se usa para notificar al usuario que
  un juego fue agregado.

- Cart (página): muestra el listado de items en el carrito (consumiendo
  `useCart()`), permite aumentar/disminuir cantidades, eliminar items y
  proceder a pago.

---

## 2. Jerarquía de componentes y flujo de props

Estructura típica en el árbol de la aplicación (simplificado):

App
├─ Header (usa useCart, useAuth)
├─ Routes
│ ├─ Home (usa listados)
│ │ └─ GameCard (prop: `game`)
│ ├─ Catalog (lista de GameCard)
│ └─ Cart (usa useCart)
└─ Footer

Flujo de datos:

- Los componentes que necesitan información del carrito o acciones sobre él
  no pasan props manualmente: consumen el contexto `CartContext` mediante el
  hook `useCart()` exportado en `src/context/CartContext.jsx`.

- Las propiedades específicas de cada tarjeta (`game`) se pasan desde el
  componente padre (por ejemplo, el listado en `Catalog` o `Home`) hacia
  `GameCard` a través de la prop `game`.

Ejemplo de uso de props (GameCard):

```
<GameCard game={game} />
```

Dentro de `GameCard.jsx` la firma esperada es:

- `game` (objeto) con campos como: `id`, `title`, `image`, `price`,
  `originalPrice`, `discount`, `platform` (array), `rating`, `category`.

---

## 3. Hooks usados en el proyecto

Hooks personalizados y su propósito:

- `src/hooks/useGames.js`
  - `useGames()` — hook para cargar todos los juegos desde la API (`getAllGames`).
    Retorna `{ games, loading, error, refetch }`.
  - `useGame(id)` — hook para cargar un juego por su `id`. Retorna `{ game, loading, error, refetch }`.

Cómo se usan generalmente:

- En páginas o componentes que listan juegos se invoca `const { games, loading } = useGames()`
  y se mappea `games.map(g => <GameCard key={g.id} game={g} />)`.

Hooks de React y contextos:

- `useState`, `useEffect` — gestión de estado local, side-effects y sincronización
  con `localStorage` (ver CartContext y AuthContext).
- `useContext` — para consumir `CartContext` y `AuthContext` mediante hooks
  auxiliares `useCart()` y `useAuth()`.

---

## 4. Mantenedor de carrito (CartContext)

Archivo: `src/context/CartContext.jsx`

Descripción:

- `CartContext` es un contexto React que centraliza el estado del carrito y
  expone una API con funciones para modificarlo. Además persiste el carrito en
  `localStorage` y maneja notificaciones temporales cuando se agrega un item.

API pública (lo que exporta el provider a consumidores a través de `useCart`):

- `cart` — array de objetos con los items: cada item contiene al menos `id`, `title`, `price`, `image`, `quantity`, `platform`, `category`, etc.
- `addToCart(game)` — agrega el `game` al carrito. Si ya existe incrementa la `quantity`.
- `removeFromCart(gameId)` — elimina un item por `id`.
- `updateQuantity(gameId, quantity)` — establece la cantidad; si `quantity <= 0` elimina el item.
- `clearCart()` — vacía el carrito.
- `getCartTotal()` — suma total (precio \* cantidad) y retorna número.
- `getCartItemsCount()` — cuenta total de unidades en el carrito (suma de `quantity`).
- `notification` — objeto con `{ message, type }` o `null`; para mostrar avisos.

Comportamiento importante:

- Persistencia: el estado inicial del carrito se carga desde `localStorage` si existe `cart` guardado.
- Cada vez que `cart` cambia, se serializa y guarda en `localStorage`.
- Al llamar `addToCart` se crea una notificación con `message` y `type: 'success'` que se limpia automáticamente tras 3 segundos.

Ejemplo rápido de uso en un componente (sin props):

```
import { useCart } from '../context/CartContext';

const Example = () => {
  const { addToCart, getCartItemsCount, notification } = useCart();

  // agregar carrito:
  // addToCart(gameObject)
};
```

Detalles internos relevantes:

- Cuando se agrega un juego, `CartContext` busca por `id` en el array `cart`.
  Si existe, aplica map y aumenta `quantity`; si no, concatena el nuevo item con `quantity: 1`.
- `updateQuantity` elimina el item si la cantidad solicitada es 0 o negativa.

---

## 5. Integración con UI: ejemplo de flujo "Agregar al carrito"

1. El usuario hace clic en el botón "Agregar al Carrito" en `GameCard.jsx`.
2. `GameCard` llama `addToCart(game)` obtenido desde `useCart()`.
3. `CartContext` actualiza el estado, guarda en `localStorage` y establece
   `notification`.
4. Componentes que muestran la notificación (por ejemplo `CartNotification`) reciben
   `notification.message` y renderizan una alerta temporal.
5. `Header` muestra el nuevo conteo de items llamando a `getCartItemsCount()`.

---

## 6. Buenas prácticas y edge cases

- Validar que `game` tenga `id` antes de llamar `addToCart` para evitar items sin
  identificador.
- `updateQuantity` maneja `quantity <= 0` eliminando el item — es la forma
  esperada de borrar mediante cambios de cantidad.
- `localStorage` puede contener datos corruptos: `CartContext` intenta parsear y
  si falla limpia la clave y parte desde `[]`.

---

## 7. Referencias a archivos clave

- `src/context/CartContext.jsx` — implementación del CartProvider y hook `useCart()`.
- `src/components/GameCard.jsx` — tarjeta que invoca `addToCart(game)`.
- `src/components/CartNotification.jsx` — notificación que muestra `message`.
- `src/pages/Cart.jsx` — página donde se gestionan cantidades, borrado y resumen.
- `src/components/Header.jsx` — muestra el badge con `getCartItemsCount()` y enlaza al carrito.
- `src/hooks/useGames.js` — hooks para cargar datos de juegos desde `services/gamesApi.js`.

---

## 8. Siguientes pasos recomendados

- Añadir TypeScript o PropTypes para documentar y validar la forma de `game` y otras props.
- Crear tests unitarios para `CartContext` (agregar, actualizar, eliminar, persistencia).
- Añadir casos de error visibles para fallas en la carga de `gamesApi`.

---

Si quieres, puedo:

- Generar PropTypes/Typescript mínimos para `GameCard` y `CartContext`.
- Añadir los tests unitarios básicos para el `CartContext`.
- Expandir la documentación con diagramas (texto ASCII o imágenes) o ejemplos de JSON de `game`.

Indica qué prefieres y lo implemento.

---

## 9. Llamadas a la API (cómo funcionan en este sistema)

Esta sección describe cómo el frontend realiza llamadas a APIs externas o a servicios propios, qué archivos centralizan esas llamadas, formatos esperados y ejemplos prácticos.

Resumen:

- Los servicios HTTP están en `src/services/` (por ejemplo `src/services/usersApi.js` y `src/services/gamesApi.js`).
- Los hooks consumen esos servicios (por ejemplo `useGames()` usa `getAllGames()` desde `services/gamesApi.js`).
- El flujo general: componentes → hooks/services → endpoints → respuesta → normalización → UI.

  9.1. Servicios (archivo `src/services/*`)

- Responsabilidad: encapsular fetch/axios, URL base, encabezados, parsing de JSON y normalización de respuestas.
- Beneficio: cambiar la URL base o la estrategia de error en un único lugar sin tocar componentes.

Ejemplos de servicios en el repo:

- `src/services/usersApi.js` — login, register, getUserById, updateUser, deleteUser, getAllUsers. Maneja respuestas que pueden venir en inglés (`user`) o español (`usuario`) y normaliza el objeto de usuario.
- `src/services/gamesApi.js` — getAllGames, getGameById, create/patch/delete juegos (si el backend lo soporta).

  9.2. Formatos de request y response (convenciones usadas)

- Login (request): el frontend envía un payload con ambos formatos para compatibilidad:

  {
  "email": "jr.tecnon@gmail.com",
  "password": "Javier120.",
  "correo": "jr.tecnon@gmail.com",
  "contrasena": "Javier120."
  }

- Login (response) — variantes aceptadas por el frontend:

  Variante en inglés:
  {
  "success": true,
  "user": { "id": 4, "nombre": "Javier", "correo": "jr.tecnon@gmail.com", "isAdmin": 1 }
  }

  Variante en español:
  {
  "message": "Login exitoso",
  "usuario": { "id": 4, "nombre": "Javier", "correo": "jr.tecnon@gmail.com", "is_admin": 1 }
  }

El frontend normaliza ambas formas y convierte `is_admin`/`isAdmin` a booleano en `AuthContext`.

9.3. Ejemplo de llamada (login) — cómo lo hace `usersApi.loginUser`

```
// payload construido en services/usersApi.js
const payload = {
  email: credentials.email || credentials.correo,
  password: credentials.password || credentials.contrasena,
  correo: credentials.email || credentials.correo,
  contrasena: credentials.password || credentials.contrasena,
};

const resp = await fetch(`${API_BASE_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

// luego el servicio valida content-type, parsea JSON y extrae
// data.user || data.usuario || data
```

9.4. Ejemplo de llamada (obtener juegos) — cómo lo usa `useGames`

- `src/hooks/useGames.js` hace internamente algo parecido a:

```
const { getAllGames } = require('../services/gamesApi');
useEffect(() => {
  setLoading(true);
  try {
    const data = await getAllGames();
    setGames(data);
  } finally {
    setLoading(false);
  }
}, []);
```

Donde `getAllGames()` es un servicio que hace `fetch('/api/games')` y retorna un array de objetos `game`.

9.5. Manejo de errores y convenciones

- Los servicios centralizan el manejo de errores: comprueban `response.ok`, convierten la respuesta a JSON y devuelven un objeto uniforme como `{ success: true, user: ... }` o `{ success: false, error: 'mensaje' }`.
- En hooks y componentes se verifica `loading` y `error` para mostrar mensajes de UI o retries.
- Logs: los servicios incluyen console.log para debugging (se pueden eliminar en producción).

  9.6. Consideraciones de seguridad (auth)

- Hoy la aplicación guarda el objeto `user` en `localStorage` para persistencia entre recargas. Esto es práctico pero vulnerable a XSS. Recomendamos:

  - Mejor: usar cookie httpOnly para sesión/token y un endpoint `/api/auth/me` que devuelva el usuario.
  - Mitigación intermedia: siempre verificar el rol en el servidor antes de permitir acciones sensibles y validar con un endpoint al montar la app.

  9.7. Buenas prácticas al añadir nuevos endpoints

1. Crear la función en `src/services/<area>.js` que encapsule la llamada (URL, headers, body, parseo).
2. Hacer que la función devuelva un objeto normalizado `{ success: boolean, data?, error? }`.
3. Consumir la función desde un hook (si es dato de UI) o directamente desde el componente si es una acción puntual.
4. Añadir tests unitarios para el servicio (mockear fetch) y un test/hook para el comportamiento esperado.

9.8. Depuración rápida (network)

- Si una llamada falla: comprobar en DevTools → Network el request y response. Verificar:
  - URL y método
  - Status code (200, 401, 500...)
  - Content-Type (debe ser `application/json` si el servicio lo espera)
  - CORS (si la petición es a otro dominio y el servidor no permite el origin)

---

Con esto la documentación incluye una descripción práctica de cómo se hacen y consumen las llamadas a la API en este proyecto. Si quieres, puedo:

- Añadir ejemplos concretos de `gamesApi.js` (endpoints reales y shapes de respuesta) o
- Generar un diagrama simple que muestre el flujo: componente → hook → service → API → respuesta → normalización → UI.
