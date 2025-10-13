# 🧪 Credenciales de Prueba para Compras

## 👥 Usuarios de Prueba Disponibles

### Usuario 1: Javier Arancibia

| Campo | Valor |
|-------|-------|
| **Nombre Completo** | `Javier Arancibia` |
| **Email** | `jr.tecnon@gmail.com` |
| **Teléfono** | `972317686` |
| **Número de Tarjeta** | `1234567812345678` |
| **Fecha de Expiración** | `12/25` |
| **CVV** | `123` |

**Estado:** ✅ Activo
**Uso:** Pruebas de email a `jr.tecnon@gmail.com`

---

### Usuario 2: María García

| Campo | Valor |
|-------|-------|
| **Nombre Completo** | `María García` o `Maria Garcia` |
| **Email** | `maria.garcia@ejemplo.com` |
| **Teléfono** | `987654321` |
| **Número de Tarjeta** | `8765432187654321` |
| **Fecha de Expiración** | `06/26` |
| **CVV** | `456` |

**Estado:** ✅ Activo
**Uso:** Pruebas de email alternativo

---

## 📋 Cómo Usar

### Opción 1: Copiar y Pegar
1. Ve a la página de compra en el frontend
2. Copia los datos de uno de los usuarios de arriba
3. Pégalos en el formulario exactamente como aparecen
4. Haz clic en "Pagar"

### Opción 2: Escribir Manualmente
Asegúrate de escribir **exactamente** como se muestra (mayúsculas, minúsculas, espacios, etc.)

## ⚠️ Notas Importantes

### Sensibilidad del Nombre
- ✅ **Usuario 1:** `Javier Arancibia` (con mayúsculas)
- ✅ **Usuario 2:** `María García` o `Maria Garcia` (acepta ambas versiones)
- ❌ **Incorrecto:** `javier arancibia`, `JAVIER ARANCIBIA`, `Javier  Arancibia` (espacios extra)

### Formato de Campos
- **Teléfono:** Solo números, 9 dígitos
- **Tarjeta:** Solo números, 16 dígitos
- **Expiración:** Formato `MM/AA` (mes/año)
- **CVV:** Solo números, 3 dígitos

## 🎯 Ejemplos de Uso

### Ejemplo 1: Prueba Básica
```
Nombre: Javier Arancibia
Email: jr.tecnon@gmail.com
Teléfono: 972317686
Tarjeta: 1234567812345678
Expiración: 12/25
CVV: 123
```
✅ **Resultado:** Email enviado a `jr.tecnon@gmail.com`

### Ejemplo 2: Prueba con Email Alternativo
```
Nombre: Maria Garcia
Email: maria.garcia@ejemplo.com
Teléfono: 987654321
Tarjeta: 8765432187654321
Expiración: 06/26
CVV: 456
```
✅ **Resultado:** Email enviado a `maria.garcia@ejemplo.com`

## 🧪 Testing en Diferentes Escenarios

### Escenario 1: Verificar Email con Tildes
```
Nombre: María García  (con tildes)
✅ Acepta ambas versiones
```

### Escenario 2: Verificar Validaciones
```
Nombre: Juan Pérez
Email: juan@test.com
❌ No pasará - credenciales no coinciden
```

## 🔒 Seguridad

⚠️ **IMPORTANTE:** Estas son credenciales de prueba únicamente para el entorno de desarrollo.

- ✅ **En desarrollo:** Usar estas credenciales
- ❌ **En producción:** Nunca usar credenciales hardcodeadas
- 🔄 **Recomendación:** Implementar un sistema de procesamiento de pagos real (Stripe, PayPal, etc.)

## 📊 Flujo de Prueba Completo

1. **Agregar productos al carrito**
   ```
   - Agrega 2-3 juegos diferentes
   - Verifica que aparezcan en el carrito
   ```

2. **Ir al checkout**
   ```
   - Haz clic en "Proceder al pago"
   - Verifica el resumen del pedido
   ```

3. **Completar formulario (Usuario 1)**
   ```
   Nombre: Javier Arancibia
   Email: jr.tecnon@gmail.com
   Teléfono: 972317686
   Tarjeta: 1234567812345678
   Expiración: 12/25
   CVV: 123
   ```

4. **Enviar formulario**
   ```
   - Haz clic en "Pagar"
   - Espera procesamiento
   - Deberías ver redirección a "Compra Exitosa"
   ```

5. **Verificar email**
   ```
   - Revisa la bandeja de entrada de jr.tecnon@gmail.com
   - Busca el email de confirmación
   - Verifica que contenga los productos correctos
   ```

6. **Repetir con Usuario 2** (Opcional)
   ```
   - Usa las credenciales de María García
   - Verifica que el email llegue a maria.garcia@ejemplo.com
   ```

## 🐛 Troubleshooting

### ❌ Error: "Los credenciales son incorrectos"

**Causa:** Uno o más campos no coinciden exactamente.

**Solución:**
1. Verifica que todos los campos sean exactos
2. Revisa mayúsculas y minúsculas en el nombre
3. Asegúrate de no tener espacios extra
4. Copia y pega directamente desde este documento

### ❌ Email no llega

**Causa:** Problema con el servidor de correo.

**Solución:**
1. Revisa la consola del navegador
2. Verifica que el backend esté corriendo
3. Revisa los logs del backend
4. Comprueba la carpeta de SPAM

### ✅ Compra exitosa pero sin email

**Comportamiento normal:** El sistema no bloquea la compra si el email falla. Revisa los logs para ver el error específico.

## 📝 Logs Esperados

### En la consola del navegador:
```javascript
🔄 Intentando enviar email de confirmación de compra a: jr.tecnon@gmail.com
📦 Datos enviados: {
  email: "jr.tecnon@gmail.com",
  nombre: "Javier Arancibia",
  numeroOrden: "ORD-1728777600000",
  fecha: "12 de octubre de 2025",
  productos: [...],
  total: 109.97
}
📡 Status de respuesta: 200
✅ Email de confirmación de compra enviado: {success: true, ...}
```

### En el backend:
```
📧 Enviando confirmación de compra a: jr.tecnon@gmail.com
📦 Orden: ORD-1728777600000
🛒 Productos: 2
💰 Total: 109.97
✅ Email de confirmación enviado exitosamente
```

## 🎓 Agregar Más Usuarios de Prueba

Si necesitas agregar más usuarios, edita el archivo `FormularioCompra.jsx`:

```javascript
// Usuario 3 - Ejemplo
const usuario3 = {
    numeroTarjeta: formData.numeroTarjeta === "1111222233334444",
    cvv: formData.cvv === "789",
    fechaExpiracion: formData.fechaExpiracion === "03/27",
    numero: formData.numero === "912345678",
    email: formData.email === "nuevo@email.com",
    nombre: formData.nombre.toLowerCase() === "nuevo usuario"
};

// Agregar a la validación
const esUsuario3 = Object.values(usuario3).every(value => value === true);

if (esUsuario1 || esUsuario2 || esUsuario3) {
    // ... código de procesamiento
}
```

## 📚 Recursos Adicionales

- `FormularioCompra.jsx` - Código del formulario de compra
- `emailService.js` - Servicio de envío de emails
- `test-confirmacion-compra.sh` - Script de prueba automatizado
- `JSON_CONFIRMACION_COMPRA.md` - Formato del JSON de confirmación

## 🎯 Checklist de Prueba

- [ ] Probado con Usuario 1 (Javier Arancibia)
- [ ] Email recibido en jr.tecnon@gmail.com
- [ ] Probado con Usuario 2 (María García)
- [ ] Email recibido en maria.garcia@ejemplo.com
- [ ] Verificado contenido del email
- [ ] Verificado productos en el email
- [ ] Verificado total en el email
- [ ] Verificado número de orden
- [ ] Probado con credenciales incorrectas
- [ ] Verificado mensaje de error

---

**Última actualización:** 12 de octubre de 2025
**Estado:** ✅ Funcionando correctamente
