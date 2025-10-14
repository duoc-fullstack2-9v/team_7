# Script para limpiar el puerto 4000 y reiniciar el backend
# Ejecutar con: .\restart-backend.ps1

Write-Host "🔄 Limpiando puerto 4000..." -ForegroundColor Cyan

# Intentar encontrar el proceso usando el puerto 4000
try {
    $process = Get-NetTCPConnection -LocalPort 4000 -ErrorAction SilentlyContinue | Select-Object -First 1
    
    if ($process) {
        $processId = $process.OwningProcess
        $processInfo = Get-Process -Id $processId -ErrorAction SilentlyContinue
        
        if ($processInfo) {
            Write-Host "⚠️  Encontrado proceso $($processInfo.ProcessName) (PID: $processId) usando puerto 4000" -ForegroundColor Yellow
            Write-Host "🛑 Deteniendo proceso..." -ForegroundColor Yellow
            Stop-Process -Id $processId -Force
            Start-Sleep -Seconds 1
            Write-Host "✅ Proceso detenido" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ Puerto 4000 está libre" -ForegroundColor Green
    }
} catch {
    Write-Host "✅ Puerto 4000 está libre" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Iniciando backend en puerto 4000..." -ForegroundColor Cyan
Write-Host ""

# Iniciar el backend
npm start
