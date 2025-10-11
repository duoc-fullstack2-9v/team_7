import { useState } from 'react';
import { sendWelcomeEmail } from '../services/emailService';

// Componente de prueba para verificar EmailJS
const EmailTest = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testEmail = async () => {
    setLoading(true);
    setStatus('Enviando...');
    
    console.log('🧪 INICIANDO TEST DE EMAIL...');
    
    try {
      const result = await sendWelcomeEmail({
        name: 'Usuario de Prueba',
        email: 'tu_email@gmail.com' // ← CAMBIA ESTO por tu email
      });
      
      if (result.success) {
        setStatus('✅ Email enviado! Revisa tu inbox');
        console.log('✅ TEST EXITOSO');
      } else {
        setStatus('❌ Error: ' + result.error);
        console.error('❌ TEST FALLIDO:', result.error);
      }
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
      console.error('❌ ERROR EN TEST:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#1a0f2e', 
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🧪 Test de Email</h1>
      <p>Presiona el botón para enviar un email de prueba</p>
      
      <button 
        onClick={testEmail}
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: '#7000a3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '1rem'
        }}
      >
        {loading ? 'Enviando...' : 'Enviar Email de Prueba'}
      </button>
      
      {status && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: status.includes('✅') ? '#23a800' : '#ef4444',
          borderRadius: '8px'
        }}>
          {status}
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h3>📋 Instrucciones:</h3>
        <ol>
          <li>Abre la consola del navegador (F12)</li>
          <li>Cambia "tu_email@gmail.com" por TU email en el código</li>
          <li>Haz clic en el botón</li>
          <li>Revisa la consola para ver los logs</li>
          <li>Revisa tu inbox (y spam)</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailTest;
