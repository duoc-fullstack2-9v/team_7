# Script para limpiar puertos ocupados
# Ejecutar con: .\kill-port.ps1 <puerto>
# Ejemplo: .\kill-port.ps1 4000

param(
    [Parameter(Mandatory=$true)]
    [int]$Port
)

Write-Host "🔍 Buscando procesos usando el puerto $Port..." -ForegroundColor Cyan

try {
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    
    if ($connections) {
        $processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
        
        foreach ($processId in $processIds) {
            $processInfo = Get-Process -Id $processId -ErrorAction SilentlyContinue
            
            if ($processInfo) {
                Write-Host "⚠️  Encontrado: $($processInfo.ProcessName) (PID: $processId)" -ForegroundColor Yellow
                Write-Host "🛑 Deteniendo proceso..." -ForegroundColor Yellow
                Stop-Process -Id $processId -Force
                Write-Host "✅ Proceso detenido" -ForegroundColor Green
            }
        }
        
        Start-Sleep -Seconds 1
        Write-Host ""
        Write-Host "✅ Puerto $Port liberado" -ForegroundColor Green
    } else {
        Write-Host "✅ No hay procesos usando el puerto $Port" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error al buscar procesos en el puerto $Port" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
