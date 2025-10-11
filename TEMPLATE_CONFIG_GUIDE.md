# 🔧 Configuración del Template en EmailJS

## ⚠️ IMPORTANTE: Configuración de Variables

Cuando crees tu template en EmailJS, debes usar **EXACTAMENTE** estos nombres de variables:

---

## 📧 Template de Registro (Bienvenida)

### **1. Ve a EmailJS Dashboard**
👉 https://dashboard.emailjs.com/admin/templates

### **2. Edita tu template `template_b6v7yef`**

### **3. Configura las variables:**

#### **To Email (Destinatario):**
```
{{to_email}}
```
⚠️ Debe ser EXACTAMENTE `to_email` (no `user_email`, ni `email`)

#### **Subject (Asunto):**
```
¡Bienvenido a HAKEY, {{to_name}}!
```

#### **Content (Contenido del email):**
```
Hola {{to_name}},

{{message}}

Ahora puedes disfrutar de las mejores ofertas en game keys.

¡Gracias por unirte a HAKEY! 🎮

---
Equipo {{from_name}}
```

### **4. Variables que DEBES tener en el template:**
- ✅ `{{to_name}}` - Nombre del usuario
- ✅ `{{to_email}}` - Email del usuario
- ✅ `{{from_name}}` - Nombre de tu empresa (HAKEY)
- ✅ `{{message}}` - Mensaje personalizado

---

## 🛒 Template de Compra (Confirmación)

### **1. Crea un NUEVO template** (o edita uno diferente)
⚠️ NO uses el mismo template para registro y compra

### **2. Obtén el nuevo Template ID**
Ejemplo: `template_xyz123`

### **3. Actualiza el código:**
Abre `src/services/emailService.js` y cambia:

```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_4kg6gmo',
  templateIdRegistro: 'template_b6v7yef',  // ← Template de registro
  templateIdCompra: 'template_xyz123',     // ← Nuevo template de compra
  publicKey: 'Ogr3gPICAE0wPJHvp'
};
```

### **4. Configura el template de compra:**

#### **To Email:**
```
{{to_email}}
```

#### **Subject:**
```
✅ Compra Confirmada - Pedido HAKEY
```

#### **Content:**
```
Hola {{to_name}},

{{message}}

━━━━━━━━━━━━━━━━━━━━
📦 PRODUCTOS COMPRADOS:
━━━━━━━━━━━━━━━━━━━━

{{product_list}}

━━━━━━━━━━━━━━━━━━━━
💰 RESUMEN DE PAGO:
━━━━━━━━━━━━━━━━━━━━

Subtotal:  {{subtotal}}
IVA (19%): {{iva}}
━━━━━━━━━━━━━━━━━━━━
TOTAL:     {{total}}
━━━━━━━━━━━━━━━━━━━━

📅 Fecha: {{purchase_date}}

¡Gracias por tu compra! 🎮
Equipo {{from_name}}
```

### **5. Variables para template de compra:**
- ✅ `{{to_name}}`
- ✅ `{{to_email}}`
- ✅ `{{from_name}}`
- ✅ `{{message}}`
- ✅ `{{product_list}}`
- ✅ `{{subtotal}}`
- ✅ `{{iva}}`
- ✅ `{{total}}`
- ✅ `{{purchase_date}}`

---

## 🧪 Cómo Probar

### **Opción 1: Test en EmailJS**
1. Ve al template en el dashboard
2. Haz clic en "Test It"
3. Llena las variables manualmente
4. Envía el test a tu email

### **Opción 2: Test en tu app**
1. Abre la consola del navegador (F12)
2. Ve a `/register`
3. Llena el formulario con TU email real
4. Haz clic en "Crear Cuenta"
5. Revisa la consola:
   - ✅ Deberías ver: `🔄 Intentando enviar email...`
   - ✅ Luego: `✅ Email enviado exitosamente`
   - ❌ Si ves error: copia el mensaje completo

---

## 🐛 Errores Comunes

### ❌ Error: "Template not found"
**Solución:** Verifica que el Template ID esté correcto en `emailService.js`

### ❌ Error: "Invalid template parameters"
**Solución:** Las variables en el template deben coincidir EXACTAMENTE:
- ❌ `{{name}}` ← MAL
- ✅ `{{to_name}}` ← BIEN

### ❌ Error: "Service not found"
**Solución:** Verifica el Service ID

### ❌ No llega el email
**Soluciones:**
1. Revisa spam/promociones
2. Espera 1-2 minutos
3. Verifica que el email esté bien escrito
4. Revisa tu dashboard de EmailJS para ver si llegó la petición

---

## 📸 Captura de Pantalla de Ejemplo

Tu template debe verse así:

```
┌─────────────────────────────────────┐
│ Template Editor                     │
├─────────────────────────────────────┤
│ Template Name: Bienvenida HAKEY     │
│                                     │
│ To Email: {{to_email}}              │
│                                     │
│ Subject: ¡Bienvenido {{to_name}}!   │
│                                     │
│ Content:                            │
│ ┌─────────────────────────────┐    │
│ │ Hola {{to_name}},           │    │
│ │                             │    │
│ │ {{message}}                 │    │
│ │                             │    │
│ │ Saludos,                    │    │
│ │ {{from_name}}               │    │
│ └─────────────────────────────┘    │
│                                     │
│ [Test It]  [Save]                   │
└─────────────────────────────────────┘
```

---

## ✅ Checklist

Antes de probar, verifica:

- [ ] Template creado en EmailJS
- [ ] Variable `{{to_email}}` en el campo "To Email"
- [ ] Variables `{{to_name}}`, `{{message}}`, `{{from_name}}` en el contenido
- [ ] Template guardado (Save)
- [ ] Template ID copiado correctamente en `emailService.js`
- [ ] Service ID correcto
- [ ] Public Key correcta
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Consola del navegador abierta (F12)

---

¡Ahora prueba registrarte con tu email real! 📧
