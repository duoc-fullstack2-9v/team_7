# 🔧 Solución: API funciona en Postman pero no en el navegador

## ✅ Confirmado

- La API funciona perfectamente desde Postman
- El email se envía correctamente
- El formato JSON es correcto

## ❌ Problema

La API responde con error 500 desde el navegador pero funciona en Postman.

## 🎯 Causa: CORS (Cross-Origin Resource Sharing)

**¿Por qué funciona en Postman pero no en el navegador?**

- **Postman** NO verifica CORS (es una herramienta de desarrollo)
- **Navegadores** SÍ verifican CORS por seguridad
- Si tu API backend no tiene CORS habilitado, el navegador bloquea la petición

## 🛠️ Solución: Habilitar CORS en tu API Backend

### Opción 1: Express.js (Más común)

Si estás usando Express.js en tu backend:

**1. Instala el paquete CORS:**
```bash
cd /ruta/a/tu/backend
npm install cors
```

**2. Agrega CORS a tu servidor:**

```javascript
// server.js o app.js
const express = require('express');
const cors = require('cors');

const app = express();

// ⭐ AGREGAR ESTA LÍNEA ANTES DE TUS RUTAS
app.use(cors());

// O con opciones específicas:
app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Tus rutas aquí
app.post('/api/enviar-bienvenida', async (req, res) => {
  // ...
});

app.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
```

### Opción 2: Sin paquete CORS (Manual)

Si no quieres instalar el paquete, agrega manualmente los headers:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // O 'http://localhost:5173'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

### Opción 3: Fastify

Si usas Fastify:

```bash
npm install @fastify/cors
```

```javascript
const fastify = require('fastify')();
const cors = require('@fastify/cors');

await fastify.register(cors, {
  origin: 'http://localhost:5173'
});
```

### Opción 4: Node.js puro (HTTP)

Si usas el módulo HTTP nativo:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Agregar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Tu lógica aquí
});

server.listen(5000);
```

## 🧪 Cómo Verificar si es un Problema de CORS

### En el Navegador:

1. Abre DevTools (F12)
2. Ve a la pestaña **Console**
3. Si ves este error, es CORS:

```
Access to fetch at 'http://localhost:5000/api/enviar-bienvenida' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### En la pestaña Network:

1. Abre DevTools (F12)
2. Ve a **Network**
3. Recarga la página y haz el registro
4. Busca la petición a `enviar-bienvenida`
5. Revisa los **Response Headers**

**Si NO ves estos headers, necesitas CORS:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## ✅ Configuración Recomendada para Desarrollo

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// CORS - Permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Tus frontends
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (opcional pero útil)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Rutas
app.post('/api/enviar-bienvenida', async (req, res) => {
  try {
    const { email, nombre } = req.body;
    console.log('📧 Enviando email a:', email, nombre);
    
    // Tu lógica de envío de email aquí
    
    res.json({ 
      success: true, 
      message: 'Correo de bienvenida enviado exitosamente' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al enviar el correo electrónico',
      error: error.message 
    });
  }
});

app.post('/api/enviar-confirmacionCompra', async (req, res) => {
  try {
    const { email, nombre } = req.body;
    console.log('📧 Enviando confirmación a:', email, nombre);
    
    // Tu lógica de envío de email aquí
    
    res.json({ 
      success: true, 
      message: 'Confirmación enviada exitosamente' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al enviar el correo electrónico',
      error: error.message 
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
```

## 🔒 Configuración para Producción

```javascript
const allowedOrigins = [
  'https://tu-dominio.com',
  'https://www.tu-dominio.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS no permitido'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

## 🎯 Pasos Inmediatos

1. **Abre tu archivo de servidor backend** (probablemente `server.js` o `app.js`)

2. **Agrega estas líneas al inicio:**
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

3. **Instala CORS si no lo tienes:**
   ```bash
   npm install cors
   ```

4. **Reinicia tu servidor backend**
   ```bash
   # Detén el servidor (Ctrl+C) y reinicia
   npm start
   # o
   node server.js
   ```

5. **Prueba de nuevo desde el navegador**

## 📋 Checklist

- [ ] Instalado `npm install cors` en el backend
- [ ] Agregado `app.use(cors())` antes de las rutas
- [ ] Reiniciado el servidor backend
- [ ] Verificado que el servidor esté en puerto 5000
- [ ] Probado desde el navegador
- [ ] Verificado los headers de respuesta en DevTools

## 🆘 Si Sigue Sin Funcionar

1. **Verifica la consola del navegador** - Copia todos los errores
2. **Verifica la consola del backend** - Ve qué logs aparecen
3. **Usa DevTools Network** - Revisa los headers de la petición y respuesta
4. **Prueba con `curl`** desde la terminal:
   ```bash
   curl -X POST http://localhost:5000/api/enviar-bienvenida \
     -H "Content-Type: application/json" \
     -H "Origin: http://localhost:5173" \
     -d '{"email":"test@test.com","nombre":"Test"}' \
     -v
   ```

## 💡 Diferencia entre Postman y Navegador

| Aspecto | Postman | Navegador |
|---------|---------|-----------|
| Verifica CORS | ❌ No | ✅ Sí |
| Envía Origin | ❌ No | ✅ Sí |
| Preflight OPTIONS | ❌ No | ✅ Sí |
| Uso | Desarrollo | Producción |

Por eso Postman funciona pero el navegador no. **Necesitas CORS en tu backend.**
