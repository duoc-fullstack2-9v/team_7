# Panel de Administrador - HAKEY

## 🎮 Descripción

Panel de administrador completo para gestionar el catálogo de juegos de HAKEY. Permite agregar nuevos juegos a la base de datos mediante un formulario interactivo con validaciones.

## 🔐 Acceso al Panel

### Credenciales de Administrador

Para acceder al panel de administrador, inicia sesión con:

- **Email:** `admin@hakey.com`
- **Contraseña:** Cualquier contraseña válida (mínimo 6 caracteres)

Una vez autenticado con estas credenciales, tendrás acceso completo al panel de administrador.

## 📋 Características del Panel

### Formulario de Creación de Juegos

El formulario incluye los siguientes campos:

#### Información Básica

- **Título del Juego** \* (requerido)
- **Categoría** \* (requerido): Acción, Aventura, RPG, Estrategia, Deportes, Simulación, Terror, Carreras
- **Descripción** \* (requerido, mínimo 10 caracteres)
- **Desarrollador** \* (requerido)
- **Publicador** \* (requerido)
- **Plataforma**: PC, PlayStation, Xbox, Nintendo Switch, Multi-plataforma
- **Fecha de Lanzamiento** (opcional)
- **Calificación** (0-5, opcional)

#### Precio y Descuento

- **Precio Original** \* (requerido, mayor a 0)
- **Descuento** (0-100%, opcional)
- **Vista previa del precio final** (calculado automáticamente)

#### Imagen

- **URL de la Imagen** \* (requerido, debe ser una URL válida .jpg, .jpeg, .png, .webp, .gif)
- Vista previa de la imagen en tiempo real

#### Requisitos del Sistema

- Sistema Operativo
- Procesador
- Memoria RAM
- Tarjeta Gráfica
- Almacenamiento

#### Características

- Agregar características del juego de forma dinámica
- Eliminar características agregadas

### Gestión de Juegos Existentes

El panel también incluye una sección para gestionar los juegos existentes en el catálogo:

- **Lista de juegos**: Visualiza todos los juegos con imagen, título, categoría, plataforma y precio
- **Botón de actualizar**: Recarga la lista de juegos manualmente
- **Botón de editar**: Permite modificar los datos de un juego existente
- **Botón de eliminar**: Permite eliminar juegos del catálogo
- **Modal de confirmación**: Confirma antes de eliminar para evitar eliminaciones accidentales
- **Modal de edición**: Formulario completo para actualizar los datos del juego

## ✅ Validaciones

El formulario incluye validaciones en tiempo real:

1. **Validación al escribir**: Los errores se muestran cuando dejas de escribir en un campo
2. **Validación al enviar**: Verifica que todos los campos requeridos estén completos
3. **Validaciones específicas**:
   - Título: Mínimo 2 caracteres
   - Descripción: Mínimo 10 caracteres
   - Precio: Debe ser un número mayor a 0
   - Descuento: Debe estar entre 0 y 100
   - Calificación: Debe estar entre 0 y 5
   - URL de imagen: Debe ser una URL válida de imagen

## 🚀 Uso del Panel

### 1. Acceso

1. Inicia sesión con las credenciales de administrador
2. Serás redirigido automáticamente al panel de administrador
3. También puedes acceder desde el menú de navegación (enlace "Panel Admin" en verde)

### 2. Agregar un Juego

1. Completa todos los campos requeridos (marcados con \*)
2. Opcionalmente, agrega descuento, calificación, requisitos y características
3. Verifica la vista previa de la imagen
4. Haz clic en "Guardar Juego"

### 3. Eliminar un Juego

1. Desplázate a la sección "Juegos en el Catálogo" (debajo del formulario)
2. Encuentra el juego que deseas eliminar
3. Haz clic en el botón "Eliminar" (rojo con ícono de papelera)
4. Confirma la eliminación en el modal que aparece
5. El juego será eliminado permanentemente del catálogo

**Nota**: La eliminación es irreversible. Asegúrate de que realmente deseas eliminar el juego antes de confirmar.

### 4. Editar un Juego

1. Desplázate a la sección "Juegos en el Catálogo" (debajo del formulario)
2. Encuentra el juego que deseas editar
3. Haz clic en el botón "Editar" (morado con ícono de lápiz)
4. Se abrirá un modal con los datos actuales del juego
5. Modifica los campos que desees actualizar
6. Haz clic en "Guardar Cambios"
7. Los cambios se aplicarán inmediatamente en el catálogo

**Campos editables:**

- Título
- Categoría
- Plataforma
- Descripción
- Precio Original
- Descuento
- Publicador
- Calificación
- URL de Imagen
- Fecha de Lanzamiento

### 5. Actualizar la Lista de Juegos

- Haz clic en el botón "Actualizar" (ícono de flechas circulares) en la sección "Juegos en el Catálogo"
- La lista se recargará automáticamente después de agregar, editar o eliminar un juego

### 6. Confirmación

- Al guardar exitosamente, verás un mensaje de confirmación en verde
- El formulario se limpiará automáticamente para agregar otro juego
- El nuevo juego se enviará a tu API mediante POST

## 🔌 Integración con la API

El panel envía los datos a tu API mediante:

### Crear Juego (POST)

- **Endpoint**: `https://hakey-api-catalogo.vercel.app/games`
- **Método**: POST
- **Headers**: `Content-Type: application/json`

### Eliminar Juego (DELETE)

- **Endpoint**: `https://hakey-api-catalogo.vercel.app/api/games/:id`
- **Método**: DELETE
- **Parámetros**: ID del juego a eliminar

### Editar Juego (PATCH)

- **Endpoint**: `https://hakey-api-catalogo.vercel.app/api/games/:id`
- **Método**: PATCH
- **Headers**: `Content-Type: application/json`
- **Body**: Campos a actualizar (mismo formato que POST, pero solo los campos que cambien)

### Listar Juegos (GET)

- **Endpoint**: `https://hakey-api-catalogo.vercel.app/api/games`
- **Método**: GET

### Estructura de Datos Enviados

```json
{
  "title": "Título del juego",
  "description": "Descripción del juego",
  "price": 47.99,
  "originalPrice": 59.99,
  "discount": 20,
  "category": "Acción",
  "platform": ["PC"],
  "rating": 4.5,
  "image": "https://ejemplo.com/imagen.jpg",
  "releaseDate": "2024-01-01",
  "publisher": "Publicador",
  "requirements": {
    "os": "Windows 10",
    "processor": "Intel Core i5",
    "memory": "8 GB",
    "graphics": "NVIDIA GTX 770",
    "storage": "50 GB"
  },
  "features": ["Multijugador", "Un jugador", "Logros"],
  "featured": false
}
```

**Nota importante:**

- `price` es el precio final con descuento aplicado
- `originalPrice` es el precio antes del descuento
- `platform` es un array de plataformas
- El campo `developer` no es requerido por la API

## 🎨 Interfaz

- Diseño moderno con la nueva paleta de colores (morados y verdes)
- Responsive y adaptable a móviles
- Vista previa en tiempo real de imágenes y precios
- Mensajes de error claros y específicos
- Animaciones suaves

## 🔒 Seguridad

- Ruta protegida: Solo usuarios con `isAdmin: true` pueden acceder
- Usuarios no autenticados son redirigidos al login
- Usuarios autenticados pero no admin son redirigidos al home

## 📱 Navegación para Administradores

Los administradores verán:

- Enlace "Panel Admin" en el menú de navegación (en verde)
- Icono de configuración (⚙️) en el menú de usuario
- Ambos llevan al panel de administrador

## 🛠️ Personalización

Para cambiar el email de administrador, edita:

```javascript
// src/pages/Login.jsx
const isAdmin = formData.email.toLowerCase() === "admin@hakey.com";
```

Cambia `"admin@hakey.com"` por el email que desees usar como administrador.

---

¡Listo para agregar juegos a tu catálogo! 🎮
