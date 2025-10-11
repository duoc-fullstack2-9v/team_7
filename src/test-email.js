// 🧪 ARCHIVO DE PRUEBA - Ejecutar en consola del navegador

import emailjs from '@emailjs/browser';

// Inicializar con tu Public Key
emailjs.init('Ogr3gPICAE0wPJHvp');

// Función de prueba
export const testEmail = async () => {
  console.log('🧪 INICIANDO PRUEBA DE EMAIL...');
  
  try {
    const response = await emailjs.send(
      'service_4kg6gmo',           // Tu Service ID
      'template_b6v7yef',          // Tu Template ID
      {
        to_name: 'Prueba Test',
        to_email: 'tu_email@gmail.com',  // ← CAMBIA ESTO por tu email
        from_name: 'HAKEY',
        message: 'Este es un email de prueba desde HAKEY'
      }
    );
    
    console.log('✅ ¡EMAIL ENVIADO CON ÉXITO!', response);
    console.log('✅ Status:', response.status);
    console.log('✅ Text:', response.text);
    return true;
  } catch (error) {
    console.error('❌ ERROR AL ENVIAR EMAIL:', error);
    console.error('❌ Error completo:', JSON.stringify(error, null, 2));
    return false;
  }
};

// Ejecutar la prueba
testEmail();
