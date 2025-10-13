# 📧 Configuración de API de Envío de Correos

## 🎯 Descripción

Esta aplicación ahora utiliza una API externa para el envío de correos electrónicos en lugar de EmailJS. La API maneja:

- ✅ Emails de bienvenida al registrarse
- ✅ Emails de confirmación de compra

## 🔌 Endpoints de la API

### 1. Email de Bienvenida

**Endpoint:** `POST http://localhost:5000/api/enviar-bienvenida`

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "nombre": "Nombre del Usuario"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Email de bienvenida enviado correctamente"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

### 2. Email de Confirmación de Compra

**Endpoint:** `POST http://localhost:5000/api/enviar-confirmacionCompra`

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "nombre": "Nombre del Usuario"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Email de confirmación enviado correctamente"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## 🚀 Cómo Iniciar

### 1. Iniciar la API de Correos

Primero, asegúrate de que la API esté corriendo en el puerto 5000:

```bash
# En el directorio de la API
cd /ruta/a/tu/api
npm start  # o el comando que uses para iniciar la API
```

Verifica que esté corriendo:
```bash
curl http://localhost:5000
```

### 2. Iniciar la Aplicación Frontend

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar en modo desarrollo
npm run dev
```

## 🧪 Probar la Integración

### Opción 1: Usando el Script de Prueba

```bash
./test-email-api.sh
```

Este script automáticamente prueba ambos endpoints.

### Opción 2: Prueba Manual con cURL

**Probar Email de Bienvenida:**
```bash
curl -X POST http://localhost:5000/api/enviar-bienvenida \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@email.com",
    "nombre": "Tu Nombre"
  }'
```

**Probar Email de Confirmación:**
```bash
curl -X POST http://localhost:5000/api/enviar-confirmacionCompra \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@email.com",
    "nombre": "Tu Nombre"
  }'
```

### Opción 3: Prueba desde la Aplicación

1. Navega a `http://localhost:5173/register`
2. Completa el formulario de registro
3. Verifica tu email para el mensaje de bienvenida
4. Realiza una compra de prueba
5. Verifica tu email para la confirmación

## ⚙️ Configuración

### Cambiar URL de la API

Edita `src/services/emailService.js`:

```javascript
const API_BASE_URL = 'http://tu-api-url.com/api';
```

### Usar Variables de Entorno (Recomendado)

1. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_EMAIL_API_URL=http://localhost:5000/api
```

2. Actualiza `src/services/emailService.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_EMAIL_API_URL || 'http://localhost:5000/api';
```

3. Reinicia el servidor de desarrollo

## 🐛 Troubleshooting

### Error: "Failed to fetch"

**Problema:** La API no está disponible o hay un problema de CORS.

**Solución:**
1. Verifica que la API esté corriendo: `curl http://localhost:5000`
2. Asegúrate de que la API tenga CORS habilitado
3. Verifica la URL en `emailService.js`

### Error: "Network request failed"

**Problema:** Conexión de red o firewall.

**Solución:**
1. Verifica tu conexión a internet
2. Revisa el firewall
3. Intenta con `http://127.0.0.1:5000` en lugar de `localhost`

### Email no llega

**Problema:** El email se envía pero no llega.

**Solución:**
1. Revisa la carpeta de SPAM
2. Verifica los logs del backend
3. Comprueba que el email esté correctamente configurado en la API

### Error 400: Bad Request

**Problema:** El formato del JSON es incorrecto.

**Solución:**
1. Verifica que estás enviando `email` y `nombre` (no `name`)
2. Asegúrate de que el Content-Type sea `application/json`

## 📝 Logs y Debugging

La aplicación imprime logs en la consola del navegador:

```javascript
// Logs de éxito
✅ Email de bienvenida enviado exitosamente

// Logs de error
❌ Error detallado al enviar email de bienvenida: [detalles del error]
```

Abre las DevTools (F12) y ve a la pestaña Console para ver los logs.

## 🔐 Seguridad

- ✅ No hay claves API expuestas en el frontend
- ✅ Validación de datos en el backend
- ✅ HTTPS recomendado en producción
- ✅ Rate limiting recomendado en la API

## 📊 Flujo de Datos

```
Usuario → Formulario → emailService.js → API Backend → Servidor Email → Usuario
```

1. Usuario completa formulario
2. `emailService.js` hace POST a la API
3. API procesa y envía el email
4. Usuario recibe el email

## 🎓 Ejemplos de Uso

### En Register.jsx:

```javascript
import { sendWelcomeEmail } from "../services/emailService";

const emailResult = await sendWelcomeEmail({
  name: formData.name,    // Se convierte a 'nombre' en la API
  email: formData.email
});

if (emailResult.success) {
  console.log('Email enviado');
}
```

### En FormularioCompra.jsx:

```javascript
import { sendPurchaseConfirmation } from "../services/emailService";

const emailResult = await sendPurchaseConfirmation({
  userName: formData.nombre,
  userEmail: formData.email,
  items: cart,
  total: total,
  subtotal: subtotal,
  iva: iva
});

if (emailResult.success) {
  console.log('Confirmación enviada');
}
```

## 📚 Recursos Adicionales

- [Documentación de Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MIGRATION_EMAIL_API.md](./MIGRATION_EMAIL_API.md) - Detalles de la migración
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentación general de la API

## 🆘 Soporte

Si encuentras problemas:

1. Revisa la consola del navegador (F12)
2. Verifica los logs del backend
3. Usa el script de prueba: `./test-email-api.sh`
4. Revisa este documento y MIGRATION_EMAIL_API.md
