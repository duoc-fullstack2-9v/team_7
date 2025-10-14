# Script para iniciar backend y frontend de HAKEY
# Ejecutar con: .\start-servers.ps1

Write-Host "🎮 Iniciando servidores de HAKEY..." -ForegroundColor Cyan
Write-Host ""

# Verificar si existe la carpeta backend
if (-not (Test-Path ".\backend")) {
    Write-Host "❌ Error: No se encuentra la carpeta backend" -ForegroundColor Red
    exit 1
}

# Verificar si existen las dependencias del backend
if (-not (Test-Path ".\backend\node_modules")) {
    Write-Host "📦 Instalando dependencias del backend..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Verificar si existen las dependencias del frontend
if (-not (Test-Path ".\node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    npm install
}

# Verificar archivos .env
if (-not (Test-Path ".\.env")) {
    Write-Host "⚠️  Advertencia: No se encuentra el archivo .env en la raíz" -ForegroundColor Yellow
    Write-Host "   Crea un archivo .env con: VITE_API_URL=http://localhost:4000/api" -ForegroundColor Yellow
}

if (-not (Test-Path ".\backend\.env")) {
    Write-Host "⚠️  Advertencia: No se encuentra el archivo backend\.env" -ForegroundColor Yellow
    Write-Host "   Configura tus credenciales de MySQL en backend\.env" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "¿Deseas continuar de todos modos? (s/n)"
    if ($continue -ne "s") {
        exit 0
    }
}

Write-Host ""
Write-Host "🚀 Iniciando Backend en puerto 4000..." -ForegroundColor Green
Write-Host "🌐 Iniciando Frontend en puerto 5173..." -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C para detener ambos servidores" -ForegroundColor Yellow
Write-Host ""

# Iniciar backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Server' -ForegroundColor Cyan; npm start"

# Esperar 2 segundos para que el backend inicie
Start-Sleep -Seconds 2

# Iniciar frontend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🎨 Frontend Server' -ForegroundColor Magenta; npm run dev"

Write-Host "✅ Servidores iniciados en ventanas separadas" -ForegroundColor Green
Write-Host ""
Write-Host "📝 URLs importantes:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:4000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Health:   http://localhost:4000/api/health" -ForegroundColor White
Write-Host ""
