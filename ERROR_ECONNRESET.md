# 🔴 Error: read ECONNRESET

## 🎯 Diagnóstico

**Error detectado:**
```json
{
  "success": false,
  "message": "Error al enviar el correo electrónico",
  "error": "read ECONNRESET"
}
```

**Causa:** El servidor de correo está rechazando o cerrando la conexión inesperadamente.

## ❌ Lo que NO está funcionando

El problema **NO** es con el código del frontend (React). El frontend está enviando los datos correctamente.

El problema **SÍ** es con la configuración del servidor de correo en tu backend (API en puerto 5000).

## 🔍 Causas Comunes de ECONNRESET

### 1. Credenciales Incorrectas de Email

**Gmail:** Si estás usando Gmail, necesitas:
- ✅ Habilitar "Verificación en 2 pasos"
- ✅ Generar una "Contraseña de aplicación"
- ❌ NO usar tu contraseña normal de Gmail

**Cómo generar contraseña de aplicación en Gmail:**
1. Ve a https://myaccount.google.com/security
2. Habilita "Verificación en 2 pasos"
3. Busca "Contraseñas de aplicaciones"
4. Genera una contraseña para "Correo"
5. Usa ESA contraseña en tu backend

### 2. Puerto SMTP Bloqueado

Algunos proveedores de internet bloquean el puerto 587 o 465.

**Solución:** Prueba con diferentes puertos:
- Puerto 587 (TLS)
- Puerto 465 (SSL)
- Puerto 25 (sin cifrado - no recomendado)

### 3. Configuración Incorrecta de TLS/SSL

**En tu backend, verifica:**

```javascript
// ❌ MAL - puede causar ECONNRESET
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true, // INCORRECTO para puerto 587
  auth: { user: '...', pass: '...' }
});

// ✅ BIEN - configuración correcta
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false para puerto 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Solo para desarrollo
  }
});
```

### 4. Límites de Rate Limiting

Gmail tiene límites:
- 500 emails/día para cuentas gratuitas
- 100 emails/hora

Si superaste el límite, espera unas horas.

## ✅ Soluciones

### Solución 1: Usar Gmail con Configuración Correcta

**En tu archivo `.env` del backend:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # Contraseña de aplicación de 16 dígitos
```

**En tu código del backend:**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Prueba la conexión
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error de conexión:', error);
  } else {
    console.log('✅ Servidor listo para enviar emails');
  }
});
```

### Solución 2: Usar Configuración SMTP Detallada

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para puerto 465, false para otros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000, // 10 segundos
  greetingTimeout: 10000
});
```

### Solución 3: Usar un Servicio de Email Alternativo

Si Gmail sigue dando problemas, prueba:

#### **Opción A: Mailtrap (Recomendado para desarrollo)**
```javascript
// Gratis, solo para pruebas, no envía emails reales
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'tu-mailtrap-user',
    pass: 'tu-mailtrap-password'
  }
});
```
Regístrate en: https://mailtrap.io

#### **Opción B: SendGrid**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'destinatario@ejemplo.com',
  from: 'tu-email-verificado@ejemplo.com',
  subject: 'Bienvenido',
  text: 'Contenido del email'
};

await sgMail.send(msg);
```
Regístrate en: https://sendgrid.com (100 emails/día gratis)

#### **Opción C: Ethereal Email (Solo pruebas)**
```javascript
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass
  }
});
```

### Solución 4: Deshabilitar Antivirus/Firewall Temporalmente

Algunos antivirus bloquean las conexiones SMTP.

**Solo para pruebas:**
1. Deshabilita temporalmente el antivirus
2. Prueba enviar un email
3. Si funciona, configura una excepción para Node.js

## 🧪 Test de Conexión SMTP

Crea este archivo en tu backend:

```javascript
// test-smtp.js
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTP() {
  console.log('🔄 Probando conexión SMTP...');
  console.log('Usuario:', process.env.EMAIL_USER);
  console.log('Contraseña:', process.env.EMAIL_PASS ? '****' : 'NO CONFIGURADA');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true, // Mostrar debug info
    logger: true  // Mostrar logs
  });

  try {
    // Verificar conexión
    await transporter.verify();
    console.log('✅ Conexión SMTP exitosa');
    
    // Enviar email de prueba
    const info = await transporter.sendMail({
      from: `"HAKEY Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Enviarte a ti mismo
      subject: 'Test de Conexión SMTP',
      text: 'Si recibes este email, la configuración está correcta',
      html: '<b>Si recibes este email, la configuración está correcta</b>'
    });
    
    console.log('✅ Email enviado:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSMTP();
```

**Ejecuta:**
```bash
node test-smtp.js
```

## 📋 Checklist de Verificación

- [ ] Tienes una contraseña de aplicación de Gmail (no tu contraseña normal)
- [ ] Las variables de entorno están configuradas correctamente
- [ ] El archivo `.env` está en el directorio correcto del backend
- [ ] Estás usando `secure: false` para puerto 587
- [ ] Has habilitado "Verificación en 2 pasos" en Gmail
- [ ] No estás superando los límites de Gmail
- [ ] El firewall/antivirus no está bloqueando la conexión
- [ ] Las credenciales en `.env` no tienen espacios o comillas extra

## 🎯 Configuración Recomendada para Gmail

**Archivo `.env`:**
```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
```

**Código del backend:**
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint
app.post('/api/enviar-bienvenida', async (req, res) => {
  try {
    const { email, nombre } = req.body;
    
    await transporter.sendMail({
      from: `"HAKEY" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Bienvenido a HAKEY!',
      html: `
        <h1>¡Hola ${nombre}!</h1>
        <p>Bienvenido a HAKEY...</p>
      `
    });
    
    res.json({ success: true, message: 'Email enviado' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al enviar email',
      error: error.message 
    });
  }
});
```

## 🆘 Si Nada Funciona

1. **Usa Mailtrap para desarrollo** (más fácil de configurar)
2. **Verifica los logs completos** del backend con debug activado
3. **Prueba con otro proveedor de email** (SendGrid, Mailgun)
4. **Comparte los logs completos** para ayuda específica

## ✨ El Frontend Está Bien

Recuerda: **Tu código React está correcto**. El problema es solo con la configuración del servidor de correo en el backend.
