#!/bin/bash

# Script de prueba para verificar la API de envío de correos
# Asegúrate de que la API esté corriendo en http://localhost:5000

echo "🧪 Probando API de Envío de Correos"
echo "===================================="
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
echo "📧 Prueba 1: Envío de Email de Bienvenida"
echo "----------------------------------------"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/enviar-bienvenida \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "nombre": "Usuario de Prueba"
  }' -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Email de bienvenida enviado exitosamente${NC}"
    echo "Respuesta: $BODY"
else
    echo -e "${RED}❌ Error al enviar email de bienvenida (HTTP $HTTP_CODE)${NC}"
    echo "Respuesta: $BODY"
fi

echo ""
echo "📧 Prueba 2: Envío de Email de Confirmación de Compra"
echo "---------------------------------------------------"
RESPONSE=$(curl -s -X POST http://localhost:5000/api/enviar-confirmacionCompra \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "nombre": "Usuario de Prueba"
  }' -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Email de confirmación de compra enviado exitosamente${NC}"
    echo "Respuesta: $BODY"
else
    echo -e "${RED}❌ Error al enviar email de confirmación (HTTP $HTTP_CODE)${NC}"
    echo "Respuesta: $BODY"
fi

echo ""
echo "===================================="
echo "🎉 Pruebas completadas"
