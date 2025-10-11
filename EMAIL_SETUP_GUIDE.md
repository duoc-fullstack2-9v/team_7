# 📧 Guía de Configuración de EmailJS para HAKEY

## 🎯 ¿Qué es EmailJS y cómo funciona?

**EmailJS** es un servicio que permite enviar emails directamente desde el navegador (frontend) sin necesidad de un servidor backend. Es perfecto para aplicaciones React como HAKEY.

### ✨ Ventajas:
- ✅ No requiere servidor backend
- ✅ Fácil configuración (5 minutos)
- ✅ Gratis hasta 200 emails/mes
- ✅ Plantillas personalizables
- ✅ Compatible con Gmail, Outlook, etc.

---

## 🚀 Configuración Paso a Paso

### **Paso 1: Crear cuenta en EmailJS**

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"** (Registrarse)
3. Crea una cuenta gratuita con tu email
4. Confirma tu email

---

### **Paso 2: Conectar tu servicio de email**

1. Una vez dentro, ve a **"Email Services"** en el menú lateral
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
   - **Recomendación:** Usa Gmail
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** que aparece (ej: `service_abc1234`)

> 💡 **Tip:** Si usas Gmail, necesitarás crear una "App Password" en tu cuenta de Google.

---

### **Paso 3: Crear plantillas de email**

#### **Plantilla 1: Email de Bienvenida (Registro)**

1. Ve a **"Email Templates"** en el menú
2. Haz clic en **"Create New Template"**
3. Configura la plantilla:

**Subject (Asunto):**
```
¡Bienvenido a HAKEY, {{to_name}}!
```

**Content (Contenido):**
```html
Hola {{to_name}},

¡Gracias por registrarte en HAKEY! 🎮

Tu cuenta ha sido creada exitosamente. Ahora puedes disfrutar de:

✅ Ofertas exclusivas en game keys
✅ Entrega instantánea
✅ Precios competitivos
✅ Soporte 24/7

Empieza a explorar nuestro catálogo de juegos aquí: https://tudominio.com/catalog

Si tienes alguna pregunta, no dudes en contactarnos.

¡Felices juegos! 🎮
Equipo HAKEY

---
Este es un email automático, por favor no respondas a este mensaje.
```

4. Haz clic en **"Save"**
5. **Copia el Template ID** (ej: `template_xyz5678`)

---

#### **Plantilla 2: Confirmación de Compra**

1. Crea otra plantilla nueva
2. Configura:

**Subject:**
```
✅ Compra Confirmada - Pedido de HAKEY
```

**Content:**
```html
Hola {{to_name}},

¡Tu compra ha sido procesada exitosamente! 🎉

DETALLES DEL PEDIDO:
━━━━━━━━━━━━━━━━━━━━
Fecha: {{purchase_date}}

PRODUCTOS:
{{product_list}}

━━━━━━━━━━━━━━━━━━━━
Subtotal:    {{subtotal}}
IVA (19%):   {{iva}}
━━━━━━━━━━━━━━━━━━━━
TOTAL:       {{total}}
━━━━━━━━━━━━━━━━━━━━

📧 Recibirás tus game keys por email en los próximos minutos.

¿Necesitas ayuda? Contáctanos en soporte@hakey.com

¡Gracias por confiar en HAKEY! 🎮
Equipo HAKEY

---
Este es un email automático, por favor no respondas a este mensaje.
```

3. Guarda y **copia el Template ID**

---

### **Paso 4: Obtener tu Public Key**

1. Ve a **"Account"** → **"General"** en el menú
2. Busca la sección **"API Keys"**
3. **Copia tu Public Key** (ej: `abc123XYZ456`)

---

### **Paso 5: Configurar el proyecto**

Abre el archivo `/src/services/emailService.js` y reemplaza los valores:

```javascript
const EMAIL_CONFIG = {
  serviceId: 'TU_SERVICE_ID',              // ← Pega aquí tu Service ID
  templateIdRegistro: 'TU_TEMPLATE_REGISTRO_ID',  // ← Template de bienvenida
  templateIdCompra: 'TU_TEMPLATE_COMPRA_ID',      // ← Template de compra
  publicKey: 'TU_PUBLIC_KEY'               // ← Tu Public Key
};
```

**Ejemplo configurado:**
```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_abc1234',
  templateIdRegistro: 'template_xyz5678',
  templateIdCompra: 'template_def9012',
  publicKey: 'abc123XYZ456'
};
```

---

## 📋 Cómo se envían los emails

### **1. Registro de Usuario**

Cuando un usuario se registra en `/register`:

```javascript
// Automáticamente se envía un email con:
- Nombre del usuario
- Email del usuario
- Mensaje de bienvenida
```

El email se envía a la dirección que el usuario ingresó en el formulario.

---

### **2. Confirmación de Compra**

Cuando un usuario completa una compra en `/formularioCompra`:

```javascript
// Automáticamente se envía un email con:
- Nombre del comprador
- Lista de productos comprados
- Subtotal
- IVA (19%)
- Total de la compra
- Fecha y hora de la compra
```

---

## 🔍 Verificar que funciona

### **Prueba 1: Registro**
1. Ve a `/register`
2. Llena el formulario con TU email real
3. Registra la cuenta
4. Revisa tu bandeja de entrada (y spam)
5. Deberías recibir el email de bienvenida

### **Prueba 2: Compra**
1. Agrega productos al carrito
2. Ve a `/formularioCompra`
3. Usa estos datos de prueba:
   - **Nombre:** `Javier Arancibia`
   - **Email:** `tu_email_real@gmail.com` ← Usa tu email
   - **Teléfono:** `972317686`
   - **Tarjeta:** `1234567812345678`
   - **Fecha:** `12/25`
   - **CVV:** `123`
4. Completa la compra
5. Revisa tu email - deberías recibir la confirmación

---

## 🐛 Solución de Problemas

### ❌ No llegan los emails

**Posibles causas:**

1. **Credenciales incorrectas**
   - Verifica que Service ID, Template IDs y Public Key estén bien copiados
   - No debe haber espacios extra

2. **Gmail bloqueando**
   - Si usas Gmail, necesitas habilitar "Aplicaciones menos seguras" o crear una App Password
   - Ve a: https://myaccount.google.com/apppasswords

3. **Emails en spam**
   - Revisa tu carpeta de spam
   - Marca como "No es spam" para futuros emails

4. **Límite excedido**
   - Plan gratuito: 200 emails/mes
   - Revisa tu dashboard de EmailJS

---

### 🔧 Debugging

Abre la consola del navegador (F12) y busca:

- ✅ `Email de bienvenida enviado` = Funcionó
- ✅ `Email de confirmación enviado` = Funcionó
- ❌ `Error al enviar email` = Revisar configuración

---

## 📊 Variables disponibles en las plantillas

### **Plantilla de Registro:**
- `{{to_name}}` - Nombre del usuario
- `{{to_email}}` - Email del usuario
- `{{from_name}}` - "HAKEY"
- `{{message}}` - Mensaje personalizado

### **Plantilla de Compra:**
- `{{to_name}}` - Nombre del comprador
- `{{to_email}}` - Email del comprador
- `{{product_list}}` - Lista de productos
- `{{subtotal}}` - Subtotal formateado
- `{{iva}}` - IVA formateado
- `{{total}}` - Total formateado
- `{{purchase_date}}` - Fecha de compra
- `{{from_name}}` - "HAKEY"
- `{{message}}` - Mensaje personalizado

---

## 💰 Planes de EmailJS

| Plan | Emails/mes | Precio |
|------|-----------|--------|
| **Free** | 200 | $0 |
| **Personal** | 1,000 | $7/mes |
| **Professional** | 10,000 | $30/mes |

Para empezar, el plan gratuito es suficiente.

---

## 🎨 Personalización Avanzada

### Agregar logo de HAKEY en emails:

1. Sube tu logo a un hosting (ej: Imgur, Cloudinary)
2. En la plantilla HTML, agrega:

```html
<img src="URL_DE_TU_LOGO" alt="HAKEY Logo" style="width: 150px; margin-bottom: 20px;">
```

### Usar HTML en plantillas:

Puedes usar HTML completo para emails más bonitos:

```html
<div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
  <h1 style="color: #7000a3;">¡Bienvenido a HAKEY!</h1>
  <p style="font-size: 16px; line-height: 1.6;">Hola {{to_name}},</p>
  <!-- Tu contenido aquí -->
</div>
```

---

## 📞 Soporte

- **Documentación oficial:** https://www.emailjs.com/docs/
- **Dashboard:** https://dashboard.emailjs.com/
- **Soporte:** support@emailjs.com

---

## ✅ Checklist Final

Antes de poner en producción, verifica:

- [ ] Service ID configurado correctamente
- [ ] Template de registro creado y ID copiado
- [ ] Template de compra creado y ID copiado
- [ ] Public Key copiada
- [ ] Probado con email real
- [ ] Emails no van a spam
- [ ] Consola sin errores

---

¡Listo! Tu sistema de emails está funcionando. Cada vez que alguien se registre o compre, recibirá un email automático. 🎉📧
