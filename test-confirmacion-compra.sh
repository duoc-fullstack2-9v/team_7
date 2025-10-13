#!/bin/bash

# Script de prueba para el endpoint de confirmación de compra
# Prueba con el formato exacto que envía el frontend

echo "🧪 Prueba de Email de Confirmación de Compra"
echo "============================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que la API esté corriendo
echo "📡 Verificando que la API esté disponible..."
if curl -s http://localhost:5000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API está corriendo${NC}"
else
    echo -e "${RED}❌ API no está disponible en http://localhost:5000${NC}"
    echo -e "${YELLOW}⚠️  Inicia la API antes de ejecutar esta prueba${NC}"
    exit 1
fi

echo ""
echo "📧 Enviando email de confirmación de compra..."
echo "-----------------------------------------------"

# JSON de prueba con el formato exacto
RESPONSE=$(curl -s -X POST http://localhost:5000/api/enviar-confirmacionCompra \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jr.tecnon@gmail.com",
    "nombre": "Juan Pérez",
    "numeroOrden": "ORD-2025-001",
    "fecha": "12 de octubre de 2025",
    "productos": [
      {
        "nombre": "Grand Theft Auto V",
        "cantidad": 2,
        "precio": 29.99
      },
      {
        "nombre": "Red Dead Redemption 2",
        "cantidad": 1,
        "precio": 49.99
      }
    ],
    "total": 109.97
  }' -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo ""
echo "📊 Resultado:"
echo "-------------"
echo "HTTP Status: $HTTP_CODE"
echo "Respuesta: $BODY"
echo ""

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    echo -e "${GREEN}✅ Email de confirmación enviado exitosamente${NC}"
    echo ""
    echo "🎉 ¡Todo funciona correctamente!"
    echo ""
    echo "📧 Revisa el email en: jr.tecnon@gmail.com"
    echo ""
    echo "El email debería contener:"
    echo "  - Nombre: Juan Pérez"
    echo "  - Número de orden: ORD-2025-001"
    echo "  - Fecha: 12 de octubre de 2025"
    echo "  - Productos:"
    echo "    * Grand Theft Auto V x2 - \$29.99"
    echo "    * Red Dead Redemption 2 x1 - \$49.99"
    echo "  - Total: \$109.97"
else
    echo -e "${RED}❌ Error al enviar email (HTTP $HTTP_CODE)${NC}"
    echo ""
    echo "Posibles causas:"
    echo "  - La API no está configurada correctamente"
    echo "  - El servidor de email tiene problemas"
    echo "  - El formato del JSON no es el esperado"
    echo ""
    echo "Revisa los logs del backend para más detalles"
fi

echo ""
echo "============================================="
echo "🏁 Prueba completada"
