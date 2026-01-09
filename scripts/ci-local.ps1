# Script para simular CI localmente antes de fazer push (Windows PowerShell)
# Usage: .\scripts\ci-local.ps1

$ErrorActionPreference = "Stop"

Write-Host "🔍 Starting local CI checks..." -ForegroundColor Cyan
Write-Host ""

function Print-Status {
    param($Name, $Success)
    if ($Success) {
        Write-Host "✓ $Name passed" -ForegroundColor Green
    } else {
        Write-Host "✗ $Name failed" -ForegroundColor Red
        exit 1
    }
}

# 1. Check if node_modules exists
Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}
Print-Status "Dependencies" $true

# 2. Run ESLint
Write-Host ""
Write-Host "🔍 Running ESLint..." -ForegroundColor Cyan
try {
    npm run lint
    Print-Status "ESLint" $true
} catch {
    Print-Status "ESLint" $false
}

# 3. Run TypeScript check
Write-Host ""
Write-Host "📝 Running TypeScript check..." -ForegroundColor Cyan
try {
    npx tsc --noEmit
    Print-Status "TypeScript" $true
} catch {
    Print-Status "TypeScript" $false
}

# 4. Build application
Write-Host ""
Write-Host "🏗️  Building application..." -ForegroundColor Cyan
try {
    npm run build
    Print-Status "Build" $true
} catch {
    Print-Status "Build" $false
}

# 5. Check build size
Write-Host ""
Write-Host "📊 Build Statistics:" -ForegroundColor Cyan
if (Test-Path "dist") {
    $buildSize = (Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   Build size: $([math]::Round($buildSize, 2)) MB"

    $fileCount = (Get-ChildItem dist -Recurse -File).Count
    Write-Host "   Total files: $fileCount"

    Write-Host "   Main files:"
    Get-ChildItem dist\*.html, dist\*.js, dist\*.css -ErrorAction SilentlyContinue | ForEach-Object {
        $size = [math]::Round($_.Length / 1KB, 2)
        Write-Host "     - $($_.Name) ($size KB)"
    }
} else {
    Write-Host "   dist folder not found" -ForegroundColor Yellow
}

# 6. Security audit
Write-Host ""
Write-Host "🔒 Running security audit..." -ForegroundColor Cyan
try {
    npm audit --audit-level=moderate
} catch {
    Write-Host "⚠ Some vulnerabilities found (check output above)" -ForegroundColor Yellow
}

# 7. Docker validation (optional)
Write-Host ""
Write-Host "🐳 Validating Docker setup..." -ForegroundColor Cyan
if (Get-Command docker -ErrorAction SilentlyContinue) {
    if (Test-Path "Dockerfile") {
        Write-Host "   Checking Dockerfile syntax..."
        try {
            docker build -t fiap-blog-frontend:test . | Out-Null
            Print-Status "Docker build" $true

            # Cleanup test image
            docker rmi fiap-blog-frontend:test | Out-Null
        } catch {
            Print-Status "Docker build" $false
        }
    } else {
        Write-Host "⚠ Dockerfile not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ Docker not installed, skipping Docker checks" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "✓ All CI checks passed!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can safely push your changes:"
Write-Host "  git add ."
Write-Host "  git commit -m `"your message`""
Write-Host "  git push origin <branch>"
Write-Host ""
