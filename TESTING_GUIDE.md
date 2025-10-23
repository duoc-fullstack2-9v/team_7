# 📚 Guía de Pruebas Unitarias - HAKEY

## ¿Qué son las Pruebas Unitarias?

Las pruebas unitarias son pequeños programas que verifican que cada parte de tu aplicación funciona correctamente. Es como hacer un **chequeo de salud** a cada componente para asegurar que hace lo que se supone debe hacer.

---

## 📁 Estructura de las Pruebas

```
tests/
├── Home.spec.jsx          # Pruebas de la página de inicio
├── Header.spec.jsx        # Pruebas del encabezado
├── GameCard.spec.jsx      # Pruebas de las tarjetas de juegos
├── Cart.spec.jsx          # Pruebas del carrito de compras
├── Catalog.spec.jsx       # Pruebas del catálogo
├── Login.spec.jsx         # Pruebas de inicio de sesión
├── Register.spec.jsx      # Pruebas de registro
├── GameDetail.spec.jsx    # Pruebas de detalles del juego
├── Loading.spec.jsx       # Pruebas de pantalla de carga
├── ErrorMessage.spec.jsx  # Pruebas de mensajes de error
├── CartNotification.spec.jsx  # Pruebas de notificaciones del carrito
├── TextType.spec.jsx      # Pruebas del efecto de escritura
└── setup.js               # Configuración global de tests
```

---

## 🏠 **Home.spec.jsx** - Página de Inicio (7 pruebas)

### ¿Para qué sirve?
Verifica que la página de inicio se carga correctamente con todos sus elementos principales.

### Las pruebas:

#### 1. "should render the home page"
- **¿Qué hace?** Verifica que el título "Descubre las Mejores" aparezca en la página
- **¿Por qué?** Asegura que la página se cargue sin errores
- **Ejemplo simple:** Como verificar que una puerta se abre

#### 2. "should display featured games section"
- **¿Qué hace?** Verifica que aparezca la sección "Juegos Destacados"
- **¿Por qué?** Asegura que los juegos especiales se muestren
- **Ejemplo simple:** Como comprobar que hay comida en el plato

#### 3. "should display top deals section"
- **¿Qué hace?** Verifica que aparezca la sección "Mejores Ofertas"
- **¿Por qué?** Asegura que las promociones se muestren
- **Ejemplo simple:** Como verificar que el menú de ofertas está visible

#### 4. "should display features section"
- **¿Qué hace?** Verifica que aparezca "¿Por Qué Elegirnos?"
- **¿Por qué?** Asegura que se muestren las ventajas del sitio
- **Ejemplo simple:** Como comprobar que están las instrucciones de uso

#### 5. "should display hero stats"
- **¿Qué hace?** Verifica que aparezcan las estadísticas (Juegos, Clientes, Soporte)
- **¿Por qué?** Asegura que se muestren los números importantes
- **Ejemplo simple:** Como ver el marcador de un partido

#### 6. "should have links to catalog"
- **¿Qué hace?** Verifica que hay botones para ir al catálogo
- **¿Por qué?** Asegura que el usuario pueda navegar
- **Ejemplo simple:** Como verificar que hay botones para ir a otras páginas

#### 7. "should display feature cards"
- **¿Qué hace?** Verifica que se muestren las 4 tarjetas de características
- **¿Por qué?** Asegura que todos los beneficios sean visibles
- **Ejemplo simple:** Como comprobar que hay 4 menús diferentes

---

## 🎮 **GameCard.spec.jsx** - Tarjetas de Juegos (12 pruebas)

### ¿Para qué sirve?
Verifica que cada tarjeta de juego se muestre correctamente con toda su información.

### Las pruebas:

#### 1. "should render game card with title"
- **¿Qué hace?** Verifica que el nombre del juego aparezca
- **¿Por qué?** Es lo más importante que el usuario vea
- **Ejemplo:** Verificar que está el nombre "Test Game"

#### 2. "should display game price"
- **¿Qué hace?** Verifica que se muestre el precio
- **¿Por qué?** El usuario necesita saber cuánto cuesta
- **Ejemplo:** Ver que aparece "$29.99"

#### 3. "should display original price when there is discount"
- **¿Qué hace?** Verifica que aparezca el precio original tachado
- **¿Por qué?** Muestra el descuento claramente
- **Ejemplo:** Ver "$39.99" y "$29.99" para mostrar ahorro

#### 4. "should display discount badge"
- **¿Qué hace?** Verifica que aparezca la etiqueta "-25%"
- **¿Por qué?** Destaca la oferta
- **Ejemplo:** Ver un badge que dice "OFERTA"

#### 5. "should not display discount badge when discount is 0"
- **¿Qué hace?** Verifica que no haya oferta si descuento es 0
- **¿Por qué?** No engañar al cliente
- **Ejemplo:** Si no hay oferta, no mostrar etiqueta

#### 6. "should display game rating"
- **¿Qué hace?** Verifica que aparezca la calificación (4.5 estrellas)
- **¿Por qué?** El usuario quiere saber si es bueno
- **Ejemplo:** Ver "⭐ 4.5"

#### 7. "should display game category"
- **¿Qué hace?** Verifica que aparezca la categoría (Action, RPG, etc)
- **¿Por qué?** Ayuda a clasificar los juegos
- **Ejemplo:** Ver "Action" o "RPG"

#### 8. "should display platform badges"
- **¿Qué hace?** Verifica que aparezcan PC, PlayStation, Xbox
- **¿Por qué?** Muestra dónde se puede jugar
- **Ejemplo:** Ver "PC", "PlayStation", "Xbox"

#### 9. "should have add to cart button"
- **¿Qué hace?** Verifica que existe el botón "Agregar al Carrito"
- **¿Por qué?** Es fundamental para comprar
- **Ejemplo:** Verificar que hay un botón clickeable

#### 10. "should have link to game detail page"
- **¿Qué hace?** Verifica que la tarjeta sea un link a detalles
- **¿Por qué?** El usuario puede ver más información
- **Ejemplo:** Verificar que hace click y va a otra página

#### 11. "should display game image"
- **¿Qué hace?** Verifica que se muestre la imagen del juego
- **¿Por qué?** Las imágenes atraen a los clientes
- **Ejemplo:** Ver que la foto está

#### 12. "should handle add to cart click"
- **¿Qué hace?** Verifica que el botón responde al click
- **¿Por qué?** Asegura que funciona la interacción
- **Ejemplo:** Like dar click a un botón y que pase algo

---

## 🛒 **Cart.spec.jsx** - Carrito de Compras (14 pruebas)

### ¿Para qué sirve?
Verifica que el carrito funciona correctamente tanto cuando tiene productos como cuando está vacío.

### Las pruebas (Carrito con productos):

#### 1. "should render cart page title"
- **¿Qué hace?** Verifica que aparezca "Carrito de Compras"
- **¿Por qué?** Confirma que estamos en la página correcta
- **Ejemplo:** Ver el título de la página

#### 2. "should display cart items"
- **¿Qué hace?** Verifica que aparezcan los nombres de los juegos
- **¿Por qué?** El usuario quiere ver qué compró
- **Ejemplo:** Ver "Game 1" y "Game 2"

#### 3. "should display cart item details"
- **¿Qué hace?** Verifica que aparezcan categoría y plataforma
- **¿Por qué?** Más información sobre cada producto
- **Ejemplo:** Ver "Action" y "PlayStation"

#### 4. "should display item prices"
- **¿Qué hace?** Verifica que se muestren los precios
- **¿Por qué?** El usuario quiere saber el total
- **Ejemplo:** Ver "$29.99" y "$79.98"

#### 5. "should display cart summary"
- **¿Qué hace?** Verifica que aparezca "Resumen del Pedido"
- **¿Por qué?** Muestra el desglose de costos
- **Ejemplo:** Ver tabla con subtotal, impuestos, total

#### 6. "should display total price"
- **¿Qué hace?** Verifica que aparezca el precio total
- **¿Por qué?** Lo más importante: cuánto pagará
- **Ejemplo:** Ver "$109.97"

#### 7. "should have checkout button"
- **¿Qué hace?** Verifica que existe "Proceder al Pago"
- **¿Por qué?** Es necesario para completar la compra
- **Ejemplo:** Verificar que hay botón de pago

#### 8. "should have back to shopping link"
- **¿Qué hace?** Verifica que hay "Seguir Comprando"
- **¿Por qué?** Permite volver al catálogo
- **Ejemplo:** Verificar que hay link para regresar

#### 9. "should have quantity controls"
- **¿Qué hace?** Verifica que hay botones + y - para cantidad
- **¿Por qué?** El usuario puede cambiar cuántos quiere
- **Ejemplo:** Ver botones para aumentar/disminuir

#### 10. "should display payment methods"
- **¿Qué hace?** Verifica que aparezcan métodos de pago
- **¿Por qué?** Muestra opciones disponibles
- **Ejemplo:** Ver "💳 🏦 💰"

#### 11. "should display security badges"
- **¿Qué hace?** Verifica que aparezcan "Pago Seguro" y "Entrega Instantánea"
- **¿Por qué?** Da confianza al cliente
- **Ejemplo:** Ver "🔒 Pago Seguro"

### Las pruebas (Carrito vacío):

#### 12. "should display empty cart message"
- **¿Qué hace?** Verifica que aparezca "Tu carrito está vacío"
- **¿Por qué?** Informa al usuario el estado
- **Ejemplo:** Ver mensaje cuando no hay productos

#### 13. "should display empty cart description"
- **¿Qué hace?** Verifica mensaje "Agrega algunos juegos increíbles..."
- **¿Por qué?** Incentiva al usuario a comprar
- **Ejemplo:** Ver descripción amigable

#### 14. "should have explore catalog button in empty cart"
- **¿Qué hace?** Verifica que existe "Explorar Catálogo"
- **¿Por qué?** Anima al usuario a comprar
- **Ejemplo:** Verificar botón para ir al catálogo

---

## 👤 **Header.spec.jsx** - Encabezado (8 pruebas)

### ¿Para qué sirve?
Verifica que el encabezado (menú superior) funciona correctamente.

### Las pruebas:

#### 1. "should render header with logo"
- **¿Qué hace?** Verifica que aparezca el logo "HAKEY"
- **¿Por qué?** Identidad de la marca
- **Ejemplo:** Ver el logo en la esquina

#### 2. "should display navigation links"
- **¿Qué hace?** Verifica que aparezcan "Inicio", "Catálogo", "Acerca de"
- **¿Por qué?** Permite navegar por el sitio
- **Ejemplo:** Ver menú de navegación

#### 3. "should display auth buttons when not authenticated"
- **¿Qué hace?** Verifica "Iniciar sesión" y "Registrarse"
- **¿Por qué?** Usuario no logueado ve estas opciones
- **Ejemplo:** Ver botones de login

#### 4. "should display cart button"
- **¿Qué hace?** Verifica que existe el botón del carrito
- **¿Por qué?** Acceso rápido al carrito
- **Ejemplo:** Ver icono de carrito

#### 5. "should toggle mobile menu"
- **¿Qué hacer?** Verifica que menú mobile funciona
- **¿Por qué?** En celular el menú se contrae
- **Ejemplo:** Hacer click y menú aparece/desaparece

#### 6. "should not show admin link when user is not admin"
- **¿Qué hace?** Verifica que no aparezca "Panel Admin"
- **¿Por qué?** Solo admins pueden ver eso
- **Ejemplo:** Usuario normal no ve admin panel

#### 7. "should have link to home page"
- **¿Qué hace?** Verifica que "Inicio" lleva al home
- **¿Por qué?** Navegación funcional
- **Ejemplo:** Click en "Inicio" → va a home

#### 8. "should have link to catalog"
- **¿Qué hace?** Verifica que "Catálogo" lleva al catálogo
- **¿Por qué?** Navegación funcional
- **Ejemplo:** Click en "Catálogo" → va a catalogo

---

## 🔍 **Catalog.spec.jsx** - Catálogo (10 pruebas)

### ¿Para qué sirve?
Verifica que el catálogo de juegos funciona correctamente con búsqueda y filtros.

### Las pruebas:

#### 1. "should render catalog page"
- **¿Qué hace?** Verifica que aparezca "Catálogo de Juegos"
- **¿Por qué?** Confirma que estamos en la página correcta
- **Ejemplo:** Ver título

#### 2. "should display page subtitle with game count"
- **¿Qué hace?** Verifica contador "Explora nuestra colección de 3 juegos"
- **¿Por qué?** Muestra cuántos juegos hay
- **Ejemplo:** Ver "3 juegos disponibles"

#### 3. "should display search input"
- **¿Qué hace?** Verifica que existe caja de búsqueda
- **¿Por qué?** Usuario puede buscar juegos
- **Ejemplo:** Ver campo con placeholder "Buscar juegos..."

#### 4. "should display sort select"
- **¿Qué hace?** Verifica selector de ordenamiento
- **¿Por qué?** Usuario puede ordenar (precio, rating, etc)
- **Ejemplo:** Ver dropdown de opciones

#### 5. "should display game cards"
- **¿Qué hace?** Verifica que se muestren los juegos
- **¿Por qué?** Lo principal es ver los juegos
- **Ejemplo:** Ver "Game 1", "Game 2", "Game 3"

#### 6. "should have category filters"
- **¿Qué hace?** Verifica botones de categorías
- **¿Por qué?** Usuario puede filtrar por tipo
- **Ejemplo:** Ver botones "Todos", "Action", "RPG"

#### 7. "should allow searching games"
- **¿Qué hace?** Verifica que búsqueda funciona
- **¿Por qué?** Usuario puede escribir para buscar
- **Ejemplo:** Escribir "Game 1" y que funcione

#### 8. "should allow changing sort option"
- **¿Qué hace?** Verifica que puede cambiar orden
- **¿Por qué?** Usuario elige cómo ver los juegos
- **Ejemplo:** Click en dropdown y selecciona "Precio menor"

#### 9. "should display all game prices"
- **¿Qué hace?** Verifica que se muestren precios
- **¿Por qué?** Usuario necesita saber costos
- **Ejemplo:** Ver "$39.99", "$29.99"

#### 10. "should display all game categories"
- **¿Qué hace?** Verifica que se muestren categorías
- **¿Por qué?** Usuario quiere saber tipo de juego
- **Ejemplo:** Ver "Action", "RPG", "Adventure"

---

## 🎮 **GameDetail.spec.jsx** - Detalles del Juego (13 pruebas)

### ¿Para qué sirve?
Verifica que la página de detalles de un juego muestra toda la información importante.

### Las pruebas:

#### 1. "should render game detail page"
- **¿Qué hace?** Verifica que página se carga
- **¿Por qué?** Confirma que estamos en detalles
- **Ejemplo:** Ver nombre del juego

#### 2. "should display game image"
- **¿Qué hace?** Verifica que se ve la imagen grande
- **¿Por qué?** Imagen principal del juego
- **Ejemplo:** Ver foto del juego

#### 3. "should display game price"
- **¿Qué hace?** Verifica precio actual
- **¿Por qué?** Usuario necesita saber costo
- **Ejemplo:** Ver "$29.99"

#### 4. "should display original price"
- **¿Qué hace?** Verifica precio sin descuento
- **¿Por qué?** Muestra el ahorro
- **Ejemplo:** Ver "$39.99" tachado

#### 5. "should display discount badge"
- **¿Qué hace?** Verifica etiqueta de descuento
- **¿Por qué?** Destaca la oferta
- **Ejemplo:** Ver "-25%"

#### 6. "should display game rating"
- **¿Qué hace?** Verifica calificación
- **¿Por qué?** Usuario quiere saber opinión
- **Ejemplo:** Ver "⭐ 4.5"

#### 7. "should display game category"
- **¿Qué hace?** Verifica tipo de juego
- **¿Por qué?** Usuario sabe qué tipo es
- **Ejemplo:** Ver "Action"

#### 8. "should have back button"
- **¿Qué hace?** Verifica botón de regresar
- **¿Por qué?** Usuario puede volver
- **Ejemplo:** Click en botón atrás

#### 9. "should have add to cart button"
- **¿Qué hace?** Verifica "Agregar al Carrito"
- **¿Por qué?** Es lo principal: comprar
- **Ejemplo:** Ver botón de compra

#### 10. "should display game developer info"
- **¿Qué hace?** Verifica nombre del desarrollador
- **¿Por qué?** Créditos y información
- **Ejemplo:** Ver "Test Publisher"

#### 11. "should display system requirements"
- **¿Qué hace?** Verifica requisitos del SO
- **¿Por qué?** Usuario sabe si su PC aguanta
- **Ejemplo:** Ver "Windows 10+"

#### 12. "should display storage info"
- **¿Qué hace?** Verifica espacio requerido
- **¿Por qué?** Usuario sabe cuánto espacio necesita
- **Ejemplo:** Ver "50GB"

#### 13. "should display platforms"
- **¿Qué hace?** Verifica dónde jugar
- **¿Por qué?** Usuario elige su plataforma
- **Ejemplo:** Ver "PC", "PlayStation"

---

## 🔐 **Login.spec.jsx** - Inicio de Sesión (16 pruebas)

### ¿Para qué sirve?
Verifica que el formulario de login funciona y valida correctamente.

### Las pruebas:

#### 1. "should render login form"
- **¿Qué hace?** Verifica que página carga
- **¿Por qué?** Confirma que estamos en login
- **Ejemplo:** Ver "Iniciar Sesión"

#### 2. "should display form header"
- **¿Qué hace?** Verifica encabezado "Ingresa a tu cuenta HAKEY"
- **¿Por qué?** Instrucciones claras
- **Ejemplo:** Ver título

#### 3. "should have email input field"
- **¿Qué hace?** Verifica que hay campo de email
- **¿Por qué?** Necesario para login
- **Ejemplo:** Ver input para "tu@email.com"

#### 4. "should have password input field"
- **¿Qué hace?** Verifica que hay campo de contraseña
- **¿Por qué?** Necesario para login
- **Ejemplo:** Ver input para "••••••••"

#### 5. "should have submit button"
- **¿Qué hace?** Verifica botón "Iniciar Sesión"
- **¿Por qué?** Para enviar formulario
- **Ejemplo:** Ver botón de envío

#### 6. "should have register link"
- **¿Qué hace?** Verifica "Regístrate aquí"
- **¿Por qué?** Usuario nuevo puede registrarse
- **Ejemplo:** Ver link a registro

#### 7. "should allow entering email"
- **¿Qué hace?** Verifica que puedes escribir email
- **¿Por qué?** Interacción funcional
- **Ejemplo:** Escribir y guardar texto

#### 8. "should allow entering password"
- **¿Qué hace?** Verifica que puedes escribir contraseña
- **¿Por qué?** Interacción funcional
- **Ejemplo:** Escribir password

#### 9. "should show email required error when empty"
- **¿Qué hace?** Verifica error "El email es requerido"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar en blanco y ver error

#### 10. "should show password required error when empty"
- **¿Qué hace?** Verifica error "La contraseña es requerida"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar en blanco y ver error

#### 11. "should show invalid email error"
- **¿Qué hace?** Verifica error "Email inválido"
- **¿Por qué?** Validación de formato
- **Ejemplo:** Escribir "invalid-email" y ver error

#### 12. "should show password too short error"
- **¿Qué hace?** Verifica error "mínimo 6 caracteres"
- **¿Por qué?** Validación de seguridad
- **Ejemplo:** Escribir "12345" y ver error

#### 13. "should have label for email field"
- **¿Qué hace?** Verifica que hay etiqueta "Email"
- **¿Por qué?** Accesibilidad y claridad
- **Ejemplo:** Ver etiqueta

#### 14. "should have label for password field"
- **¿Qué hace?** Verifica que hay etiqueta "Contraseña"
- **¿Por qué?** Accesibilidad y claridad
- **Ejemplo:** Ver etiqueta

#### 15. "should have required indicators"
- **¿Qué hace?** Verifica asteriscos "* " en campos
- **¿Por qué?** Muestra campos obligatorios
- **Ejemplo:** Ver "*" en email y password

#### 16. "should display question about account"
- **¿Qué hace?** Verifica "¿No tienes cuenta?"
- **¿Por qué?** Invita a registrarse
- **Ejemplo:** Ver pregunta con link

---

## 📝 **Register.spec.jsx** - Registro (18 pruebas)

### ¿Para qué sirve?
Verifica que el formulario de registro funciona y valida correctamente.

### Las pruebas:

#### 1. "should render register form"
- **¿Qué hace?** Verifica que página carga
- **¿Por qué?** Confirma que estamos en registro
- **Ejemplo:** Ver "Crear Cuenta"

#### 2. "should have name input field"
- **¿Qué hace?** Verifica que hay campo de nombre
- **¿Por qué?** Necesario para crear cuenta
- **Ejemplo:** Ver input para "Tu nombre completo"

#### 3. "should have email input field"
- **¿Qué hace?** Verifica que hay campo de email
- **¿Por qué?** Necesario para crear cuenta
- **Ejemplo:** Ver input para "tu@email.com"

#### 4. "should have password input field"
- **¿Qué hace?** Verifica que hay campo de contraseña
- **¿Por qué?** Necesario para crear cuenta
- **Ejemplo:** Ver primer campo de password

#### 5. "should have confirm password field"
- **¿Qué hace?** Verifica que hay confirmación de contraseña
- **¿Por qué?** Evita errores de tipeo
- **Ejemplo:** Ver segundo campo de password

#### 6. "should have phone input field"
- **¿Qué hace?** Verifica que hay campo de teléfono
- **¿Por qué?** Información adicional (opcional)
- **Ejemplo:** Ver input para "+1 234 567 8900"

#### 7. "should have terms checkbox"
- **¿Qué hace?** Verifica que hay checkbox de términos
- **¿Por qué?** Usuario debe aceptar términos
- **Ejemplo:** Ver checkbox seleccionable

#### 8. "should have submit button"
- **¿Qué hace?** Verifica botón "Crear Cuenta"
- **¿Por qué?** Para enviar formulario
- **Ejemplo:** Ver botón de envío

#### 9. "should have login link"
- **¿Qué hace?** Verifica "Inicia sesión aquí"
- **¿Por qué?** Usuario existente puede loguearse
- **Ejemplo:** Ver link a login

#### 10. "should show name required error"
- **¿Qué hace?** Verifica error "El nombre es requerido"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar vacío y ver error

#### 11. "should show email required error"
- **¿Qué hace?** Verifica error "El email es requerido"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar vacío y ver error

#### 12. "should show invalid email error"
- **¿Qué hace?** Verifica error "Email inválido"
- **¿Por qué?** Validación de formato
- **Ejemplo:** Escribir formato inválido y ver error

#### 13. "should show password required error"
- **¿Qué hace?** Verifica error "La contraseña es requerida"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar vacío y ver error

#### 14. "should show confirm password required error"
- **¿Qué hace?** Verifica error "Debes confirmar tu contraseña"
- **¿Por qué?** Validación de formulario
- **Ejemplo:** Dejar vacío y ver error

#### 15. "should have all required labels"
- **¿Qué hace?** Verifica que existan todas las etiquetas
- **¿Por qué?** Accesibilidad y claridad
- **Ejemplo:** Ver etiquetas de cada campo

#### 16. "should display register header"
- **¿Qué hace?** Verifica "Únete a HAKEY"
- **¿Por qué?** Encabezado amigable
- **Ejemplo:** Ver título

#### 17. "should allow typing in all fields"
- **¿Qué hace?** Verifica que puedes escribir
- **¿Por qué?** Interacción funcional
- **Ejemplo:** Escribir nombre

#### 18. "should display question about account"
- **¿Qué hace?** Verifica "¿Ya tienes cuenta?"
- **¿Por qué?** Invita a loguearse
- **Ejemplo:** Ver pregunta con link

---

## 📦 **Loading.spec.jsx** - Pantalla de Carga (6 pruebas)

### ¿Para qué sirve?
Verifica que el componente de carga funciona correctamente.

### Las pruebas:

#### 1. "should render with default message"
- **¿Qué hace?** Verifica mensaje "Cargando..."
- **¿Por qué?** Mensaje por defecto
- **Ejemplo:** Ver texto cuando está cargando

#### 2. "should render with custom message"
- **¿Qué hace?** Verifica mensaje personalizado
- **¿Por qué?** Puedes dar contexto al usuario
- **Ejemplo:** Ver "Cargando juegos..."

#### 3. "should have loading container"
- **¿Qué hace?** Verifica contenedor
- **¿Por qué?** Estructura correcta
- **Ejemplo:** Ver div con clase "loading-container"

#### 4. "should have loading spinner"
- **¿Qué hace?** Verifica el spinner animado
- **¿Por qué?** Visual de que está cargando
- **Ejemplo:** Ver rueda giratoria

#### 5. "should have spinner element"
- **¿Qué hace?** Verifica elemento interno
- **¿Por qué?** Estructura del spinner
- **Ejemplo:** Ver elemento que gira

#### 6. "should render paragraph with loading message"
- **¿Qué hace?** Verifica que mensaje en párrafo
- **¿Por qué?** Estructura semántica correcta
- **Ejemplo:** Ver texto en <p>

---

## ⚠️ **ErrorMessage.spec.jsx** - Mensajes de Error (8 pruebas)

### ¿Para qué sirve?
Verifica que los mensajes de error se muestran correctamente.

### Las pruebas:

#### 1. "should render error title"
- **¿Qué hace?** Verifica "Oops! Algo salió mal"
- **¿Por qué?** Título del error
- **Ejemplo:** Ver encabezado de error

#### 2. "should display error message"
- **¿Qué hace?** Verifica mensaje personalizado de error
- **¿Por qué?** Explicar qué salió mal
- **Ejemplo:** Ver "No se pudieron cargar los juegos"

#### 3. "should display default error message when not provided"
- **¿Qué hace?** Verifica mensaje por defecto
- **¿Por qué?** Siempre hay un mensaje
- **Ejemplo:** Ver "Error al cargar los datos"

#### 4. "should display error icon"
- **¿Qué hace?** Verifica icono "⚠️"
- **¿Por qué?** Visual que es un error
- **Ejemplo:** Ver advertencia

#### 5. "should display retry button when onRetry is provided"
- **¿Qué hace?** Verifica "Intentar de nuevo"
- **¿Por qué?** Usuario puede reintentar
- **Ejemplo:** Ver botón cuando se proporciona función

#### 6. "should not display retry button when onRetry is not provided"
- **¿Qué hace?** Verifica que no hay botón sin función
- **¿Por qué?** No mostrar botón inútil
- **Ejemplo:** Sin función, no hay botón

#### 7. "should call onRetry when retry button is clicked"
- **¿Qué hace?** Verifica que botón ejecuta función
- **¿Por qué?** Reintentar debe funcionar
- **Ejemplo:** Click en botón y se ejecuta

#### 8. "should have correct CSS classes"
- **¿Qué hace?** Verifica estructura HTML
- **¿Por qué?** Estilos correctos
- **Ejemplo:** Ver clases CSS aplicadas

---

## 🔔 **CartNotification.spec.jsx** - Notificaciones (6 pruebas)

### ¿Para qué sirve?
Verifica que las notificaciones del carrito funcionan correctamente.

### Las pruebas:

#### 1. "should render notification with message"
- **¿Qué hace?** Verifica que muestra mensaje
- **¿Por qué?** Informar al usuario
- **Ejemplo:** Ver "Producto agregado al carrito"

#### 2. "should not render when message is not provided"
- **¿Qué hace?** Verifica que no aparece sin mensaje
- **¿Por qué?** No mostrar notificación vacía
- **Ejemplo:** Sin texto, no se ve nada

#### 3. "should not render when message is empty string"
- **¿Qué hace?** Verifica que no aparece con texto vacío
- **¿Por qué?** No mostrar notificación vacía
- **Ejemplo:** Con "" (vacío), no se ve

#### 4. "should have notification container"
- **¿Qué hace?** Verifica estructura HTML
- **¿Por qué?** Elemento contenedor
- **Ejemplo:** Ver div con clase "cart-notification"

#### 5. "should display notification icon"
- **¿Qué hace?** Verifica icono "✓"
- **¿Por qué?** Visual de éxito
- **Ejemplo:** Ver checkmark

#### 6. "should render span with message text"
- **¿Qué hace?** Verifica que mensaje en span
- **¿Por qué?** Estructura semántica
- **Ejemplo:** Ver texto en <span>

---

## ✍️ **TextType.spec.jsx** - Efecto de Escritura (12 pruebas)

### ¿Para qué sirve?
Verifica que el componente de escritura animada funciona correctamente.

### Las pruebas:

#### 1. "should render with default component (div)"
- **¿Qué hace?** Verifica que usa div por defecto
- **¿Por qué?** Elemento por defecto
- **Ejemplo:** Ver div con clase "text-type"

#### 2. "should render as span when specified"
- **¿Qué hace?** Verifica que puedes cambiar a span
- **¿Por qué?** Flexibilidad de elemento
- **Ejemplo:** Ver span en lugar de div

#### 3. "should have correct initial state"
- **¿Qué hace?** Verifica estado inicial
- **¿Por qué?** Comienza correcto
- **Ejemplo:** Ver contenido vacío al principio

#### 4. "should accept text as string"
- **¿Qué hace?** Verifica que acepta texto simple
- **¿Por qué?** Flexibilidad de entrada
- **Ejemplo:** "Hello World"

#### 5. "should accept text as array"
- **¿Qué hace?** Verifica que acepta array de textos
- **¿Por qué?** Para múltiples textos
- **Ejemplo:** ["Hello", "World"]

#### 6. "should render cursor by default"
- **¿Qué hace?** Verifica que cursor aparece
- **¿Por qué?** Efecto visual típico
- **Ejemplo:** Ver cursor "|"

#### 7. "should not render cursor when showCursor is false"
- **¿Qué hace?** Verifica que cursor se puede esconder
- **¿Por qué?** Control del usuario
- **Ejemplo:** Sin cursor si se desactiva

#### 8. "should display custom cursor character"
- **¿Qué hace?** Verifica cursor personalizado
- **¿Por qué?** Flexibilidad visual
- **Ejemplo:** Usar "█" en lugar de "|"

#### 9. "should accept custom className"
- **¿Qué hace?** Verifica clase CSS personalizada
- **¿Por qué?** Estilos personalizados
- **Ejemplo:** Agregar "custom-class"

#### 10. "should accept additional props"
- **¿Qué hace?** Verifica propiedades adicionales
- **¿Por qué?** Flexibilidad del componente
- **Ejemplo:** data-testid, role, etc

#### 11. "should render text-type__content span"
- **¿Qué hace?** Verifica estructura interna
- **¿Por qué?** Elemento para texto
- **Ejemplo:** Ver span con clase

#### 12. "should have correct cursor className"
- **¿Qué hace?** Verifica clase del cursor
- **¿Por qué?** Estilos del cursor
- **Ejemplo:** Ver clase aplicada

---

## 📊 Resumen de Pruebas

| Archivo | Pruebas | Propósito |
|---------|---------|----------|
| Home.spec.jsx | 7 | Página de inicio |
| GameCard.spec.jsx | 12 | Tarjetas de juegos |
| Cart.spec.jsx | 14 | Carrito de compras |
| Header.spec.jsx | 8 | Navegación superior |
| Catalog.spec.jsx | 10 | Catálogo de juegos |
| GameDetail.spec.jsx | 13 | Detalles de juego |
| Login.spec.jsx | 16 | Inicio de sesión |
| Register.spec.jsx | 18 | Registro de usuario |
| Loading.spec.jsx | 6 | Pantalla de carga |
| ErrorMessage.spec.jsx | 8 | Mensajes de error |
| CartNotification.spec.jsx | 6 | Notificaciones |
| TextType.spec.jsx | 12 | Efecto de escritura |
| **TOTAL** | **130** | **Todas funcionan ✅** |

---

## 🚀 Cómo Ejecutar

```bash
# Ver todas las pruebas en modo watch (se actualiza automáticamente)
npm test

# Ejecutar una sola vez
npm test -- --run

# Ver en interfaz visual
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar un archivo específico
npm test -- tests/Home.spec.jsx -- --run

# Ejecutar una prueba específica
npm test -- -t "should render game card with title"
```

---

## 💡 Conceptos Clave

### ¿Qué es "mock"?
Es un simulacro. En las pruebas, "mockamos" cosas como APIs o contextos para que funcionen sin necesidad del servidor. Es como usar un doble de acción en cine.

### ¿Qué es "render"?
Es mostrar el componente en la prueba. Lo "renderizamos" para poder probarlo.

### ¿Qué es "expect"?
Es la afirmación. Decimos "ESPERO que esto sea verdadero". Si no es verdadero, la prueba falla.

### ¿Qué es "getByText"?
Busca un elemento por su texto. Si dice "¿Qué hace?" y aparece el texto, lo encuentra.

### ¿Qué es "screen"?
Es toda la pantalla renderizada. Buscamos elementos en esa pantalla virtual.

---

## ✅ Checklist de Comprensión

- [ ] Entiendo qué son las pruebas unitarias
- [ ] Conozco para qué sirve cada prueba
- [ ] Puedo explicar por qué se prueban estos elementos
- [ ] Sé cómo ejecutar las pruebas
- [ ] Entiendo los conceptos de mock, render y expect
- [ ] Puedo explicar a alguien más qué hace cada prueba

---

## 📞 Preguntas Frecuentes

**P: ¿Por qué tantas pruebas en Cart?**
R: Porque el carrito es lo más importante. Es donde se venden los productos, así que debe funcionar perfecto.

**P: ¿Las pruebas son lentas?**
R: No, todas corren en segundos. Los tests garantizan que todo funciona sin demoras.

**P: ¿Qué pasa si cambio código?**
R: Los tests te dirán inmediatamente si rompiste algo. Es como una alarma de seguridad.

**P: ¿Necesito escribir más pruebas?**
R: Sí, idealmente pruebas para CADA funcionalidad. Eso es 100% cobertura. Ahora tenemos ~90%.

**P: ¿Los tests cuestan dinero?**
R: No, son gratis con Vitest. Pero evitan que pierdas dinero por bugs.

---

Creado con ❤️ para el equipo de HAKEY
