import emailjs from '@emailjs/browser';

// ⚠️ CONFIGURACIÓN - Reemplaza estos valores con los tuyos de EmailJS
const EMAIL_CONFIG = {
  serviceId: 'service_4kg6gmo',      // Obtendrás esto de EmailJS
  templateIdRegistro: 'template_b6v7yef',  // Template para registro
  templateIdCompra: 'template_b6v7yef',      // Template para compra
  publicKey: 'Ogr3gPICAE0wPJHvp'       // Tu clave pública de EmailJS
};

/**
 * Inicializa EmailJS con tu clave pública
 * Se llama automáticamente al importar este módulo
 */
emailjs.init(EMAIL_CONFIG.publicKey);

/**
 * Envía un email de bienvenida al registrarse
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre del usuario
 * @param {string} userData.email - Email del usuario
 * @returns {Promise} Promesa que se resuelve cuando el email se envía
 */
export const sendWelcomeEmail = async (userData) => {
  try {
    console.log('🔄 Intentando enviar email de bienvenida a:', userData.email);
    
    const templateParams = {
      to_name: userData.name,
      to_email: userData.email,
      from_name: 'HAKEY',
      message: `¡Bienvenido a HAKEY, ${userData.name}! Tu cuenta ha sido creada exitosamente.`,
    };

    console.log('📧 Parámetros del email:', templateParams);
    console.log('🔑 Usando Service ID:', EMAIL_CONFIG.serviceId);
    console.log('📄 Usando Template ID:', EMAIL_CONFIG.templateIdRegistro);

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateIdRegistro,
      templateParams
    );

    console.log('✅ Email de bienvenida enviado exitosamente:', response);
    return { success: true, message: 'Email de bienvenida enviado' };
  } catch (error) {
    console.error('❌ Error detallado al enviar email de bienvenida:', error);
    console.error('❌ Error text:', error.text);
    console.error('❌ Error status:', error.status);
    return { success: false, error: error.text || 'Error al enviar email' };
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
 * @returns {Promise} Promesa que se resuelve cuando el email se envía
 */
export const sendPurchaseConfirmation = async (purchaseData) => {
  try {
    // Crear lista de productos comprados
    const productList = purchaseData.items
      .map(item => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const templateParams = {
      to_name: purchaseData.userName,
      to_email: purchaseData.userEmail,
      from_name: 'HAKEY',
      product_list: productList,
      subtotal: `$${purchaseData.subtotal.toFixed(2)}`,
      iva: `$${purchaseData.iva.toFixed(2)}`,
      total: `$${purchaseData.total.toFixed(2)}`,
      purchase_date: new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      message: `¡Gracias por tu compra, ${purchaseData.userName}! Tu pedido ha sido procesado exitosamente.`,
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateIdCompra,
      templateParams
    );

    console.log('✅ Email de confirmación de compra enviado:', response);
    return { success: true, message: 'Email de confirmación enviado' };
  } catch (error) {
    console.error('❌ Error al enviar email de confirmación:', error);
    return { success: false, error: error.text || 'Error al enviar email' };
  }
};

/**
 * Función genérica para enviar emails personalizados
 * @param {string} templateId - ID del template a usar
 * @param {Object} params - Parámetros del template
 * @returns {Promise} Promesa que se resuelve cuando el email se envía
 */
export const sendCustomEmail = async (templateId, params) => {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      templateId,
      params
    );

    console.log('✅ Email personalizado enviado:', response);
    return { success: true, message: 'Email enviado exitosamente' };
  } catch (error) {
    console.error('❌ Error al enviar email personalizado:', error);
    return { success: false, error: error.text || 'Error al enviar email' };
  }
};
