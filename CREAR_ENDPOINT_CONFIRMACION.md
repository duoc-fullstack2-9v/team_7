# 🔧 Crear Endpoint de Confirmación de Compra en el Backend

## 🎯 Situación Actual

✅ **Endpoint de bienvenida funcionando:** `POST /api/enviar-bienvenida`
❌ **Endpoint de confirmación falta crear:** `POST /api/enviar-confirmacionCompra`

## 📝 Código del Endpoint para tu Backend

### Express.js

Agrega este código en tu archivo de rutas (probablemente `server.js`, `app.js` o `routes/email.js`):

```javascript
// POST /api/enviar-confirmacionCompra
app.post('/api/enviar-confirmacionCompra', async (req, res) => {
  try {
    const { email, nombre, numeroOrden, fecha, productos, total } = req.body;
    
    // Validación de campos requeridos
    if (!email || !nombre || !productos || !total) {
      return res.status(400).json({ 
        success: false,
        message: 'Faltan campos requeridos: email, nombre, productos, total' 
      });
    }

    // Validar que productos sea un array
    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'El campo productos debe ser un array con al menos un producto' 
      });
    }

    console.log('📧 Enviando confirmación de compra a:', email);
    console.log('📦 Orden:', numeroOrden);
    console.log('🛒 Productos:', productos.length);
    console.log('💰 Total:', total);

    // Crear el contenido HTML del email
    const productosHTML = productos.map(producto => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          ${producto.nombre}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          ${producto.cantidad}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          $${producto.precio.toFixed(2)}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
          $${(producto.cantidad * producto.precio).toFixed(2)}
        </td>
      </tr>
    `).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmación de Compra - HAKEY</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">🎮 HAKEY</h1>
          <p style="color: white; margin: 10px 0 0 0;">Tu tienda de game keys</p>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
          <h2 style="color: #667eea; margin-top: 0;">¡Gracias por tu compra, ${nombre}!</h2>
          
          <p>Tu pedido ha sido procesado exitosamente. A continuación encontrarás los detalles de tu compra:</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Número de Orden:</strong> ${numeroOrden || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${fecha || new Date().toLocaleDateString('es-CL')}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <h3 style="color: #667eea; margin-top: 30px;">Detalles del Pedido</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #667eea; color: white;">
                <th style="padding: 12px; text-align: left;">Producto</th>
                <th style="padding: 12px; text-align: center;">Cantidad</th>
                <th style="padding: 12px; text-align: right;">Precio Unit.</th>
                <th style="padding: 12px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productosHTML}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #667eea;">
                  TOTAL:
                </td>
                <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea; border-top: 2px solid #667eea;">
                  $${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          
          <div style="background: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>📧 Importante:</strong> Recibirás tus game keys en un email separado dentro de las próximas 24 horas.</p>
          </div>
          
          <p style="margin-top: 30px;">Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>
          
          <p>¡Gracias por elegir HAKEY!</p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Atentamente,<br>
            <strong>El equipo de HAKEY</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Este es un email automático, por favor no respondas a este mensaje.
          </p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
            © 2025 HAKEY - Todos los derechos reservados
          </p>
        </div>
      </body>
      </html>
    `;

    // Enviar el email usando tu configuración de nodemailer
    // (Reemplaza esto con tu transporter configurado)
    await transporter.sendMail({
      from: `"HAKEY" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Confirmación de Compra - Orden ${numeroOrden || 'Nueva'}`,
      html: emailHTML
    });

    console.log('✅ Email de confirmación enviado exitosamente');

    res.json({ 
      success: true, 
      message: 'Correo de confirmación enviado exitosamente',
      numeroOrden: numeroOrden,
      destinatario: email
    });

  } catch (error) {
    console.error('❌ Error al enviar email de confirmación:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al enviar el correo electrónico',
      error: error.message 
    });
  }
});
```

## 📋 Checklist de Implementación

- [ ] Copia el código del endpoint en tu archivo de rutas
- [ ] Asegúrate de que `transporter` esté configurado (nodemailer)
- [ ] Verifica que las variables de entorno estén configuradas
- [ ] Reinicia el servidor backend
- [ ] Prueba con el script: `./test-confirmacion-compra.sh`

## 🔧 Si usas un archivo de rutas separado

Si tienes las rutas en un archivo separado (por ejemplo `routes/email.js`):

```javascript
// routes/email.js
const express = require('express');
const router = express.Router();
const { transporter } = require('../config/email'); // Tu configuración de email

// Endpoint de bienvenida (ya existente)
router.post('/enviar-bienvenida', async (req, res) => {
  // ... tu código existente
});

// Endpoint de confirmación de compra (NUEVO)
router.post('/enviar-confirmacionCompra', async (req, res) => {
  // ... código del endpoint de arriba
});

module.exports = router;
```

Y en tu `server.js`:

```javascript
const emailRoutes = require('./routes/email');
app.use('/api', emailRoutes);
```

## 🧪 Probar el Endpoint

### Opción 1: Usar el script
```bash
./test-confirmacion-compra.sh
```

### Opción 2: Usar cURL
```bash
curl -X POST http://localhost:5000/api/enviar-confirmacionCompra \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@email.com",
    "nombre": "Tu Nombre",
    "numeroOrden": "ORD-2025-001",
    "fecha": "12 de octubre de 2025",
    "productos": [
      {
        "nombre": "Producto 1",
        "cantidad": 2,
        "precio": 29.99
      }
    ],
    "total": 59.98
  }'
```

### Opción 3: Desde el frontend
Realiza una compra en la aplicación y verifica que el email llegue.

## 📊 Respuesta Esperada

**Success (200):**
```json
{
  "success": true,
  "message": "Correo de confirmación enviado exitosamente",
  "numeroOrden": "ORD-2025-001",
  "destinatario": "cliente@ejemplo.com"
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Faltan campos requeridos: email, nombre, productos, total"
}
```

**Error (500):**
```json
{
  "success": false,
  "message": "Error al enviar el correo electrónico",
  "error": "Detalle del error"
}
```

## 🎨 Personalización del Email

El template HTML incluye:

- ✅ Logo y branding de HAKEY
- ✅ Información del cliente
- ✅ Número de orden y fecha
- ✅ Tabla detallada de productos
- ✅ Cálculo de totales
- ✅ Diseño responsive
- ✅ Colores consistentes con la marca

Puedes personalizar:
- Los colores (busca `#667eea` y `#764ba2`)
- El texto del mensaje
- El logo (agrega una imagen)
- Los estilos de la tabla

## 🚀 Mejoras Opcionales

### 1. Agregar PDF de la factura
```javascript
const PDFDocument = require('pdfkit');
// Generar PDF y adjuntarlo al email
```

### 2. Agregar tracking
```javascript
// Guardar en base de datos
await Order.create({
  numeroOrden,
  email,
  productos,
  total,
  estado: 'confirmado'
});
```

### 3. Enviar copia al administrador
```javascript
await transporter.sendMail({
  from: `"HAKEY" <${process.env.EMAIL_USER}>`,
  to: process.env.ADMIN_EMAIL,
  subject: `Nueva Venta - ${numeroOrden}`,
  html: emailHTML
});
```

## ✅ Verificación Final

Después de implementar el endpoint:

1. **Reinicia tu servidor backend**
2. **Ejecuta:** `./test-confirmacion-compra.sh`
3. **Deberías ver:** HTTP Status: 200
4. **Revisa tu email** para ver el email de confirmación

## 🆘 Troubleshooting

### Error 404
- El endpoint no existe o la ruta está mal
- Verifica que hayas agregado el código al archivo correcto
- Reinicia el servidor

### Error 500
- Problema con el servidor de email
- Verifica las credenciales en `.env`
- Revisa los logs del backend

### Email no llega
- Revisa la carpeta de SPAM
- Verifica que el email sea válido
- Comprueba los logs del backend

## 📚 Documentación Relacionada

- `JSON_CONFIRMACION_COMPRA.md` - Formato del JSON
- `EMAIL_API_README.md` - Documentación general
- `TROUBLESHOOTING_API.md` - Solución de problemas
