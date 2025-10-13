# 🔧 Troubleshooting API de Correos

## ❌ Error Actual: 500 Internal Server Error

El error `500 Internal Server Error` indica que tu API está recibiendo la petición correctamente, pero está fallando al procesarla internamente.

## 📊 Diagnóstico

### Lo que está funcionando ✅
- La conexión a `http://localhost:5000` está establecida
- El endpoint `/api/enviar-bienvenida` es accesible
- El JSON se está enviando correctamente

### Lo que está fallando ❌
- El servidor está devolviendo error 500
- Hay un problema en el procesamiento del email en tu backend

## 🔍 Pasos para Diagnosticar

### 1. Revisa los logs del backend

En la terminal donde está corriendo tu API (`localhost:5000`), deberías ver logs con detalles del error. Busca:

```
Error: ...
Stack trace: ...
```

### 2. Verifica el formato del JSON que espera tu API

**Lo que estamos enviando:**
```json
{
  "email": "javier.arancibiaa2020@gmail.com",
  "nombre": "Javier Arancibia"
}
```

**Asegúrate de que tu API esté esperando exactamente estos campos:**
- `email` (string)
- `nombre` (string)

### 3. Verifica la configuración del servidor de email

El error 500 podría ser causado por:

- ❌ Credenciales de email incorrectas
- ❌ Servidor SMTP no configurado
- ❌ Puerto bloqueado
- ❌ API key de servicio de email inválida
- ❌ Template de email no encontrado

### 4. Prueba directamente con cURL

Ejecuta este comando en una terminal:

```bash
curl -X POST http://localhost:5000/api/enviar-bienvenida \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "nombre": "Test Usuario"
  }' \
  -v
```

Esto te mostrará la respuesta exacta del servidor.

## 🛠️ Soluciones Comunes

### Solución 1: Verifica las variables de entorno de tu API

Tu API backend necesita tener configuradas las credenciales del servicio de email. Verifica que tengas:

```env
# Ejemplo para nodemailer con Gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-app
EMAIL_SERVICE=gmail

# O ejemplo para SendGrid
SENDGRID_API_KEY=tu-api-key

# O ejemplo para otro servicio
SMTP_HOST=smtp.tuservicio.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASS=contraseña
```

### Solución 2: Verifica el código de tu API

**Ejemplo de endpoint correcto en Express.js:**

```javascript
// backend/routes/email.js o similar
app.post('/api/enviar-bienvenida', async (req, res) => {
  try {
    const { email, nombre } = req.body;
    
    // Validación
    if (!email || !nombre) {
      return res.status(400).json({ 
        message: 'Email y nombre son requeridos' 
      });
    }
    
    // Aquí va tu lógica de envío de email
    // Por ejemplo con nodemailer:
    await transporter.sendMail({
      from: '"HAKEY" <noreply@hakey.com>',
      to: email,
      subject: '¡Bienvenido a HAKEY!',
      html: `
        <h1>¡Hola ${nombre}!</h1>
        <p>Bienvenido a HAKEY...</p>
      `
    });
    
    res.json({ 
      success: true,
      message: 'Email enviado correctamente' 
    });
    
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ 
      message: 'Error al enviar el correo electrónico',
      error: error.message // Solo en desarrollo
    });
  }
});
```

### Solución 3: Habilita CORS en tu API

Si no tienes CORS habilitado, agrégalo:

```javascript
// backend/server.js o app.js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // URL de tu frontend
  methods: ['GET', 'POST'],
  credentials: true
}));
```

### Solución 4: Verifica que el servicio de email esté funcionando

**Para Gmail con nodemailer:**
```javascript
// Habilita "Acceso de aplicaciones menos seguras" 
// O usa una "Contraseña de aplicación"
```

**Para SendGrid:**
```javascript
// Verifica que tu API key sea válida
// Verifica que tu cuenta esté verificada
```

## 📝 Logs Mejorados en el Frontend

Ahora el código frontend mostrará más detalles. Después de intentar registrarte, revisa la consola del navegador y busca:

```
📦 Datos enviados: { email: "...", nombre: "..." }
📡 Status de respuesta: 500
❌ Error de la API: { message: "...", error: "..." }
```

Esto te dará pistas sobre qué está fallando exactamente.

## 🧪 Test de la API Backend

Crea este archivo de prueba en tu backend:

```javascript
// test-email.js en tu backend
const nodemailer = require('nodemailer');

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"Test" <test@test.com>',
      to: 'tu-email@gmail.com',
      subject: 'Test',
      text: 'Este es un email de prueba'
    });
    
    console.log('✅ Email enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testEmail();
```

Ejecuta: `node test-email.js`

## 🔒 Checklist de Verificación

- [ ] API está corriendo en `http://localhost:5000`
- [ ] Endpoint `/api/enviar-bienvenida` existe
- [ ] CORS está habilitado
- [ ] Variables de entorno están configuradas
- [ ] Servicio de email está configurado correctamente
- [ ] Los campos `email` y `nombre` se reciben correctamente
- [ ] Hay manejo de errores en el endpoint
- [ ] Los logs del backend muestran el error específico

## 📞 Siguiente Paso

1. **Intenta registrarte de nuevo** en el frontend
2. **Copia los logs completos** de la consola del navegador
3. **Copia los logs del backend** de la terminal donde corre la API
4. **Compártelos** para diagnóstico más específico

## 💡 Respuesta Esperada de la API

**Éxito (200):**
```json
{
  "success": true,
  "message": "Email enviado correctamente"
}
```

**Error (500):**
```json
{
  "message": "Error al enviar el correo electrónico",
  "error": "Detalles específicos del error"
}
```

## 🆘 Si Nada Funciona

Considera usar un servicio de email más simple para pruebas:

1. **Mailtrap.io** - Email de prueba gratuito
2. **SendGrid** - 100 emails/día gratis
3. **Mailgun** - 5,000 emails/mes gratis

Estos servicios son más fáciles de configurar y tienen mejor debugging.
