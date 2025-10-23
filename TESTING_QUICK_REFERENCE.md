# 🎯 Resumen Visual - Pruebas Unitarias HAKEY

## En una Frase
**Las pruebas unitarias verifican automáticamente que cada parte del sitio funciona correctamente.**

---

## 🧩 Las 12 Áreas Principales

### 1️⃣ HOME (7 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Página carga correctamente
├── ✅ Se ven juegos destacados
├── ✅ Se ven ofertas especiales
├── ✅ Aparecen características del sitio
├── ✅ Hay estadísticas (juegos, clientes)
├── ✅ Hay botones para navegar
└── ✅ Se muestran 4 beneficios principales

¿POR QUÉ?
→ Es la puerta de entrada. Debe ser perfecta.
```

---

### 2️⃣ GAME CARD (12 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Aparece el nombre del juego
├── ✅ Se ve el precio
├── ✅ Se ve el precio original (con descuento)
├── ✅ Aparece el descuento "-25%"
├── ✅ No hay descuento si no hay oferta
├── ✅ Se ve la calificación (⭐)
├── ✅ Se ve la categoría
├── ✅ Se ven las plataformas
├── ✅ Existe botón "Agregar al Carrito"
├── ✅ La tarjeta es clickeable
├── ✅ Se ve la imagen del juego
└── ✅ El botón responde al click

¿POR QUÉ?
→ Es lo que ves cuando buscas un juego. DEBE verse bien.
```

---

### 3️⃣ CART (14 tests)
```
¿QUÉ PRUEBAN? [CARRITO CON JUEGOS]
├── ✅ Aparece "Carrito de Compras"
├── ✅ Se ven los nombres de los juegos
├── ✅ Se ven categorías y plataformas
├── ✅ Se ven los precios
├── ✅ Aparece "Resumen del Pedido"
├── ✅ Se ve el TOTAL que pagará
├── ✅ Existe botón "Proceder al Pago"
├── ✅ Existe link "Seguir Comprando"
├── ✅ Hay botones +/- para cantidad
├── ✅ Se ven métodos de pago
└── ✅ Se ven badges de seguridad

¿QUÉ PRUEBAN? [CARRITO VACÍO]
├── ✅ Aparece "Tu carrito está vacío"
├── ✅ Hay mensaje motivador
└── ✅ Hay botón "Explorar Catálogo"

¿POR QUÉ?
→ Es donde se genera dinero. DEBE funcionar perfectamente.
```

---

### 4️⃣ HEADER (8 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Se ve el logo HAKEY
├── ✅ Se ven links: Inicio, Catálogo, Acerca de
├── ✅ Se ven botones: Iniciar sesión, Registrarse
├── ✅ Se ve el carrito
├── ✅ Menú mobile funciona
├── ✅ Solo admin ve "Panel Admin"
├── ✅ "Inicio" lleva al home
└── ✅ "Catálogo" lleva al catálogo

¿POR QUÉ?
→ Es el menú. Es lo primero que ves en CADA página.
```

---

### 5️⃣ CATALOG (10 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Aparece "Catálogo de Juegos"
├── ✅ Se ve contador de juegos
├── ✅ Existe caja de búsqueda
├── ✅ Existe selector de ordenamiento
├── ✅ Se ven los juegos
├── ✅ Se ven botones de categorías
├── ✅ Búsqueda funciona
├── ✅ Ordenamiento funciona
├── ✅ Se ven los precios
└── ✅ Se ven las categorías

¿POR QUÉ?
→ Es donde el cliente BUSCA qué comprar. Muy importante.
```

---

### 6️⃣ GAME DETAIL (13 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Página carga
├── ✅ Se ve imagen grande del juego
├── ✅ Se ve precio actual
├── ✅ Se ve precio sin descuento
├── ✅ Se ve badge de descuento
├── ✅ Se ve calificación
├── ✅ Se ve categoría
├── ✅ Existe botón atrás
├── ✅ Existe botón "Agregar al Carrito"
├── ✅ Se ve el desarrollador
├── ✅ Se ven requisitos del SO
├── ✅ Se ve espacio necesario
└── ✅ Se ven plataformas soportadas

¿POR QUÉ?
→ Es donde el cliente DECIDE si compra. Info CRÍTICA.
```

---

### 7️⃣ LOGIN (16 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Formulario aparece
├── ✅ Campo de email existe
├── ✅ Campo de contraseña existe
├── ✅ Botón "Iniciar Sesión" existe
├── ✅ Link "Regístrate" existe
├── ✅ Puedes escribir email
├── ✅ Puedes escribir contraseña
├── ✅ Error si email vacío
├── ✅ Error si password vacío
├── ✅ Error si email inválido
├── ✅ Error si password muy corta
├── ✅ Hay etiqueta "Email"
├── ✅ Hay etiqueta "Contraseña"
├── ✅ Hay asteriscos "*" en campos
└── ✅ Hay pregunta "¿No tienes cuenta?"

¿POR QUÉ?
→ Acceso a cuentas. DEBE validar correctamente.
```

---

### 8️⃣ REGISTER (18 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Formulario aparece
├── ✅ Campo de nombre existe
├── ✅ Campo de email existe
├── ✅ Campo de contraseña existe
├── ✅ Campo de confirmar contraseña existe
├── ✅ Campo de teléfono existe
├── ✅ Checkbox de términos existe
├── ✅ Botón "Crear Cuenta" existe
├── ✅ Link "Inicia sesión" existe
├── ✅ Error si nombre vacío
├── ✅ Error si email vacío
├── ✅ Error si email inválido
├── ✅ Error si password vacío
├── ✅ Error si confirmar vacío
├── ✅ Existen todas las etiquetas
├── ✅ Aparece "Únete a HAKEY"
├── ✅ Puedes escribir en campos
└── ✅ Pregunta "¿Ya tienes cuenta?"

¿POR QUÉ?
→ Nuevos clientes. DEBE validar bien.
```

---

### 9️⃣ LOADING (6 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Aparece mensaje "Cargando..."
├── ✅ Acepta mensajes personalizados
├── ✅ Tiene contenedor correcto
├── ✅ Tiene spinner (rueda giratoria)
├── ✅ Tiene elemento interno
└── ✅ Mensaje en párrafo <p>

¿POR QUÉ?
→ Mientras se cargan datos. Usuario ve que está cargando.
```

---

### 🔟 ERROR MESSAGE (8 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Aparece "Oops! Algo salió mal"
├── ✅ Se muestra el mensaje de error
├── ✅ Hay mensaje por defecto
├── ✅ Se ve el icono ⚠️
├── ✅ Botón "Intentar de nuevo" si aplica
├── ✅ No hay botón si no aplica
├── ✅ Botón ejecuta función
└── ✅ Clases CSS están correctas

¿POR QUÉ?
→ Cuando algo falla. Usuario debe entender qué pasó.
```

---

### 1️⃣1️⃣ CART NOTIFICATION (6 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Se muestra el mensaje
├── ✅ No aparece sin mensaje
├── ✅ No aparece si está vacío
├── ✅ Tiene contenedor correcto
├── ✅ Se ve el icono ✓
└── ✅ Mensaje en <span>

¿POR QUÉ?
→ Retroalimentación. Usuario sabe que agregó al carrito.
```

---

### 1️⃣2️⃣ TEXT TYPE (12 tests)
```
¿QUÉ PRUEBAN?
├── ✅ Funciona como DIV por defecto
├── ✅ Puedes cambiar a SPAN
├── ✅ Estado inicial correcto
├── ✅ Acepta texto simple
├── ✅ Acepta array de textos
├── ✅ Cursor aparece
├── ✅ Cursor se puede esconder
├── ✅ Cursor personalizable
├── ✅ Acepta clases CSS
├── ✅ Acepta propiedades adicionales
├── ✅ Tiene estructura interna
└── ✅ Cursor tiene clase CSS

¿POR QUÉ?
→ Efecto visual. Hace la página más atractiva.
```

---

## 📊 Estadísticas

```
Total de archivos de test:     12 ✅
Total de pruebas:              130 ✅
Todas pasando:                 100% ✅

Componentes probados:
  - Páginas:        5 (Home, Cart, Catalog, Login, Register)
  - Componentes:    7 (Header, GameCard, Loading, ErrorMessage, etc)

Aspectos probados:
  - Renderización:  ✅
  - Validaciones:   ✅
  - Interacciones:  ✅
  - Navegación:     ✅
  - Mensajes:       ✅
  - Errores:        ✅
```

---

## 🎬 Ciclo de Una Prueba

```
1. PREPARACIÓN (Setup)
   └─ Creamos el componente con datos simulados

2. EJECUCIÓN (Render)
   └─ Mostramos el componente en pantalla virtual

3. VERIFICACIÓN (Assert)
   └─ Checamos si lo esperado está presente

4. RESULTADO
   └─ ✅ PASS (lo esperado está) 
   └─ ❌ FAIL (lo esperado NO está)
```

---

## 🛠️ Herramientas Usadas

| Herramienta | Uso |
|-------------|-----|
| **Vitest** | Framework para correr tests |
| **React Testing Library** | Herramientas para probar React |
| **Jest DOM** | Matchers adicionales para el DOM |
| **jsdom** | Simula el navegador |

---

## 🚀 Comandos Útiles

```bash
# Ejecutar TODAS las pruebas
npm test -- --run

# Ver pruebas en interfaz visual
npm run test:ui

# Ver cobertura de código
npm run test:coverage

# Ejecutar en modo watch (se actualiza automáticamente)
npm test

# Pruebas de un archivo específico
npm test -- tests/Home.spec.jsx -- --run

# Pruebas que contengan "should render"
npm test -- -t "should render"

# Modo verbose (más detalles)
npm test -- --run --reporter=verbose
```

---

## 💭 Analogía del Mundo Real

Imagina que tienes un restaurante:

- **Home** = La entrada. ¿Se ve profesional?
- **GameCard** = El menú. ¿Está claro y atractivo?
- **Cart** = La caja. ¿Funciona bien el pago?
- **Login/Register** = Registro de clientes. ¿Sin errores?
- **Catalog** = La cocina mostrando inventario. ¿Está organizado?
- **GameDetail** = Info detallada del platillo. ¿Todo visible?

Las pruebas son como inspectores verificando que todo funcione perfecto.

---

## ❓ Preguntas Para Recordar

1. **¿Cuál es el propósito de las pruebas?**
   → Verificar que todo funciona antes de que llegue a producción.

2. **¿Cuál es el componente más crítico?**
   → El Cart (18 tests). Es donde se vende.

3. **¿Qué pasa si un test falla?**
   → Sabes exactamente qué está roto y dónde.

4. **¿Las pruebas son obligatorias?**
   → Debería serlo. Evitan bugs costosos.

5. **¿Cuánto tiempo toman?**
   → Menos de 6 segundos para las 130 pruebas.

---

## 📈 Próximos Pasos

✅ Todas las pruebas están escritas
✅ Todas las pruebas pasan
⏭️ Agregar más pruebas para:
   - Pruebas de integración
   - Pruebas de E2E (end-to-end)
   - Pruebas de rendimiento
   - Pruebas de seguridad

---

## 🎓 Aprendizajes Clave

```
✨ Las pruebas NO son opcionales
✨ Las pruebas AHORRAN dinero
✨ Las pruebas DETECTAN bugs temprano
✨ Las pruebas HACEN código mejor
✨ Las pruebas SON documentación
```

---

**Creado con ❤️ por el equipo de HAKEY**
**Última actualización: Octubre 22, 2025**
