// URL base de la API de envío de correos
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Envía un email de bienvenida al registrarse
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre del usuario (se mapea a 'nombre' en la API)
 * @param {string} userData.email - Email del usuario
 * @returns {Promise} Promesa que se resuelve cuando el email se envía
 */
export const sendWelcomeEmail = async (userData) => {
  try {
    console.log('🔄 Intentando enviar email de bienvenida a:', userData.email);
    console.log('📦 Datos enviados:', { email: userData.email, nombre: userData.name });
    
    const response = await fetch(`${API_BASE_URL}/enviar-bienvenida`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        nombre: userData.name,
      }),
    });

    console.log('📡 Status de respuesta:', response.status);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('❌ Error de la API:', errorData);
      } catch (parseError) {
        const errorText = await response.text();
        console.error('❌ Respuesta de error (texto):', errorText);
        throw new Error(`Error ${response.status}: ${errorText || 'Error al enviar email'}`);
      }
      throw new Error(errorData.message || errorData.error || 'Error al enviar email');
    }

    const data = await response.json();
    console.log('✅ Email de bienvenida enviado exitosamente:', data);
    return { success: true, message: 'Email de bienvenida enviado' };
  } catch (error) {
    console.error('❌ Error detallado al enviar email de bienvenida:', error);
    console.error('❌ Stack:', error.stack);
    return { success: false, error: error.message || 'Error al enviar email' };
  }
};

/**
 * Envía un email de confirmación de compra
 * @param {Object} purchaseData - Datos de la compra
 * @param {string} purchaseData.userName - Nombre del comprador
 * @param {string} purchaseData.userEmail - Email del comprador
 * @param {Array} purchaseData.items - Items comprados
 * @param {number} purchaseData.total - Total de la compra
 * @param {number} purchaseData.subtotal - Subtotal antes de impuestos
 * @param {number} purchaseData.iva - IVA aplicado
 * @param {string} [purchaseData.numeroOrden] - Número de orden (opcional)
 * @returns {Promise} Promesa que se resuelve cuando el email se envía
 */
export const sendPurchaseConfirmation = async (purchaseData) => {
  try {
    console.log('🔄 Intentando enviar email de confirmación de compra a:', purchaseData.userEmail);
    
    // Generar número de orden único si no se proporciona
    const numeroOrden = purchaseData.numeroOrden || `ORD-${Date.now()}`;
    
    // Formatear fecha actual
    const fecha = new Date().toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Formatear productos para la API
    const productos = purchaseData.items.map(item => ({
      nombre: item.title,
      cantidad: item.quantity,
      precio: parseFloat(item.price)
    }));
    
    // Preparar el payload completo para la API
    const payload = {
      email: purchaseData.userEmail,
      nombre: purchaseData.userName,
      numeroOrden: numeroOrden,
      fecha: fecha,
      productos: productos,
      total: parseFloat(purchaseData.total.toFixed(2))
    };
    
    console.log('📦 Datos enviados:', payload);
    
    const response = await fetch(`${API_BASE_URL}/enviar-confirmacionCompra`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 Status de respuesta:', response.status);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('❌ Error de la API:', errorData);
      } catch (parseError) {
        const errorText = await response.text();
        console.error('❌ Respuesta de error (texto):', errorText);
        throw new Error(`Error ${response.status}: ${errorText || 'Error al enviar email'}`);
      }
      throw new Error(errorData.message || errorData.error || 'Error al enviar email');
    }

    const data = await response.json();
    console.log('✅ Email de confirmación de compra enviado:', data);
    return { success: true, message: 'Email de confirmación enviado', numeroOrden };
  } catch (error) {
    console.error('❌ Error al enviar email de confirmación:', error);
    console.error('❌ Stack:', error.stack);
    return { success: false, error: error.message || 'Error al enviar email' };
  }
};
