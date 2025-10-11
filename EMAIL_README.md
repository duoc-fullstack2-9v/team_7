# 📧 Sistema de Emails Automáticos - HAKEY

## ✅ ¿Qué hace?

El sistema envía emails automáticamente en dos momentos:

### 1️⃣ **Al Registrarse** 
- Email de bienvenida
- Se envía al email que el usuario ponga en el formulario de registro

### 2️⃣ **Al Comprar**
- Email de confirmación de compra
- Incluye: productos, precios, IVA, total y fecha
- Se envía al email del formulario de compra

---

## 🚀 Configuración Rápida (5 minutos)

### Paso 1: Crea cuenta en EmailJS
👉 https://www.emailjs.com/ → Sign Up

### Paso 2: Obtén tus credenciales
1. Service ID (conecta tu Gmail/email)
2. Template ID de Registro
3. Template ID de Compra  
4. Public Key

### Paso 3: Configura el archivo
Abre: `src/services/emailService.js`

Reemplaza:
```javascript
const EMAIL_CONFIG = {
  serviceId: 'service_abc1234',           // ← TU Service ID
  templateIdRegistro: 'template_xyz5678', // ← TU Template Registro
  templateIdCompra: 'template_def9012',   // ← TU Template Compra
  publicKey: 'abc123XYZ456'               // ← TU Public Key
};
```

---

## 📖 Guía Completa

👉 Lee **EMAIL_SETUP_GUIDE.md** para instrucciones detalladas paso a paso.

---

## ✨ Características

- ✅ Envío automático de emails
- ✅ Sin backend necesario
- ✅ Plantillas personalizables
- ✅ Gratis (200 emails/mes)
- ✅ Manejo de errores
- ✅ Console logs para debugging

---

## 🧪 Prueba que Funciona

### Registro:
1. Ve a `/register`
2. Usa TU email real
3. Completa el registro
4. Revisa tu inbox (y spam)

### Compra:
1. Agrega juegos al carrito
2. Ve a `/formularioCompra`
3. Usa estos datos:
   - Nombre: `Javier Arancibia`
   - Email: `tu_email@gmail.com` ← TU EMAIL
   - Teléfono: `972317686`
   - Tarjeta: `1234567812345678`
   - Fecha: `12/25`
   - CVV: `123`
4. Completa la compra
5. Revisa tu email

---

## 🐛 ¿No funciona?

1. Revisa la consola del navegador (F12)
2. Verifica que los IDs estén bien copiados
3. Revisa la carpeta de spam
4. Lee EMAIL_SETUP_GUIDE.md

---

Desarrollado para HAKEY 🎮
