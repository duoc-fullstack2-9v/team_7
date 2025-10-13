# Migración a API de Envío de Correos

## 📋 Resumen de Cambios

Se ha migrado el sistema de envío de correos desde **EmailJS** a una **API personalizada** para centralizar y mejorar el control sobre el envío de emails.

## 🔄 Cambios Realizados

### 1. Servicio de Email (`src/services/emailService.js`)

**Antes:**
- Utilizaba `@emailjs/browser` para enviar correos
- Configuración con Service ID, Template ID y Public Key
- Lógica compleja con templates personalizados

**Después:**
- Utiliza `fetch` API nativa para llamadas HTTP
- Se conecta a la API en `http://localhost:5000/api`
- Envío simplificado solo con `email` y `nombre`

#### Endpoints de la API:

1. **Email de Bienvenida (Registro)**
   - URL: `POST http://localhost:5000/api/enviar-bienvenida`
   - Body:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "nombre": "Nombre Usuario"
     }
     ```

2. **Email de Confirmación de Compra**
   - URL: `POST http://localhost:5000/api/enviar-confirmacionCompra`
   - Body:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "nombre": "Nombre Usuario"
     }
     ```

### 2. Archivos Eliminados

- ❌ `src/test-email.js` - Script de prueba de EmailJS
- ❌ `src/pages/EmailTest.jsx` - Componente de prueba de EmailJS
- ❌ Dependencia `@emailjs/browser` del `package.json`

### 3. Archivos Actualizados

- ✅ `src/services/emailService.js` - Reescrito completamente
- ✅ `src/App.jsx` - Eliminada ruta `/email-test`
- ✅ `package.json` - Eliminada dependencia de EmailJS

### 4. Componentes que usan el servicio

Los siguientes componentes **NO requieren cambios** ya que mantienen la misma interfaz:

- `src/pages/Register.jsx` - Envía email al registrarse
- `src/pages/FormularioCompra.jsx` - Envía email al completar compra

## 🚀 Cómo Funciona

### Flujo de Registro:

1. Usuario completa el formulario de registro
2. Al hacer clic en "Crear Cuenta":
   - Se validan los datos
   - Se llama a `sendWelcomeEmail({ name, email })`
   - El servicio hace POST a `/api/enviar-bienvenida`
   - La API externa procesa y envía el email
   - Usuario recibe email de bienvenida

### Flujo de Compra:

1. Usuario completa el formulario de compra
2. Al hacer clic en "Pagar":
   - Se validan los datos
   - Se llama a `sendPurchaseConfirmation({ userName, userEmail, items, total, subtotal, iva })`
   - El servicio hace POST a `/api/enviar-confirmacionCompra`
   - La API externa procesa y envía el email
   - Usuario recibe email de confirmación

## 🔧 Configuración

### URL de la API

La URL de la API está configurada en `src/services/emailService.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Para cambiar la URL en producción, modifica esta constante.

### Variables de Entorno (Recomendado)

Para mejor manejo en diferentes ambientes, puedes usar:

```javascript
const API_BASE_URL = import.meta.env.VITE_EMAIL_API_URL || 'http://localhost:5000/api';
```

Y crear un archivo `.env`:

```env
VITE_EMAIL_API_URL=http://localhost:5000/api
```

## 🧪 Pruebas

Para probar el envío de correos:

1. Asegúrate de que la API esté corriendo en `http://localhost:5000`
2. Regístrate en la aplicación con un email real
3. Verifica que recibas el email de bienvenida
4. Realiza una compra y verifica el email de confirmación

## 📝 Notas Importantes

- ⚠️ La API debe estar corriendo antes de usar la aplicación
- ⚠️ Los emails se envían de forma asíncrona, puede haber un pequeño delay
- ✅ Los errores en el envío no bloquean el registro o compra
- ✅ Se mantienen logs en consola para debug

## 🔐 Seguridad

- Los datos sensibles ahora se manejan en el backend
- No hay claves API expuestas en el frontend
- Mayor control sobre el contenido de los emails

## 📦 Dependencias Removidas

```json
{
  "dependencies": {
    "@emailjs/browser": "^4.4.1"  // ❌ ELIMINADA
  }
}
```

## 🎯 Próximos Pasos

1. Configurar variables de entorno para la URL de la API
2. Implementar reintentos en caso de fallo de la API
3. Agregar notificaciones visuales al usuario sobre el estado del envío
4. Implementar queue system para emails en el backend
