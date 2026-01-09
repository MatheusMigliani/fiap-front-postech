#!/bin/bash

# Script para simular CI localmente antes de fazer push
# Usage: ./scripts/ci-local.sh

set -e  # Exit on error

echo "🔍 Starting local CI checks..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 passed${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        exit 1
    fi
}

# 1. Check if node_modules exists
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi
print_status "Dependencies"

# 2. Run ESLint
echo ""
echo "🔍 Running ESLint..."
npm run lint
print_status "ESLint"

# 3. Run TypeScript check
echo ""
echo "📝 Running TypeScript check..."
npx tsc --noEmit
print_status "TypeScript"

# 4. Build application
echo ""
echo "🏗️  Building application..."
npm run build
print_status "Build"

# 5. Check build size
echo ""
echo "📊 Build Statistics:"
if [ -d "dist" ]; then
    BUILD_SIZE=$(du -sh dist | cut -f1)
    echo "   Build size: $BUILD_SIZE"

    # Count files
    FILE_COUNT=$(find dist -type f | wc -l)
    echo "   Total files: $FILE_COUNT"

    # List main files
    echo "   Main files:"
    ls -lh dist/*.html dist/*.js dist/*.css 2>/dev/null | awk '{print "     - "$9" ("$5")"}'
else
    echo "   dist folder not found"
fi

# 6. Security audit
echo ""
echo "🔒 Running security audit..."
npm audit --audit-level=moderate || echo -e "${YELLOW}⚠ Some vulnerabilities found (check output above)${NC}"

# 7. Docker validation (optional)
echo ""
echo "🐳 Validating Docker setup..."
if command -v docker &> /dev/null; then
    if [ -f "Dockerfile" ]; then
        echo "   Checking Dockerfile syntax..."
        docker build --no-cache -t fiap-blog-frontend:test . > /dev/null 2>&1
        print_status "Docker build"

        # Cleanup test image
        docker rmi fiap-blog-frontend:test > /dev/null 2>&1
    else
        echo -e "${YELLOW}⚠ Dockerfile not found${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Docker not installed, skipping Docker checks${NC}"
fi

# Summary
echo ""
echo "=================================="
echo -e "${GREEN}✓ All CI checks passed!${NC}"
echo "=================================="
echo ""
echo "You can safely push your changes:"
echo "  git add ."
echo "  git commit -m \"your message\""
echo "  git push origin <branch>"
echo ""
