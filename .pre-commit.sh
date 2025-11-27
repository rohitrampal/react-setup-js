#!/bin/bash

# Pre-Commit Hook Script
# Run this before committing to ensure code quality

set -e

echo "🔍 Running pre-commit checks..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⚠️  node_modules not found. Running npm install...${NC}"
  npm install
fi

# 1. Linting
echo "1️⃣  Running linter..."
if npm run lint; then
  echo -e "${GREEN}✅ Linter passed${NC}"
else
  echo -e "${RED}❌ Linter failed! Fix errors before committing.${NC}"
  exit 1
fi
echo ""

# 2. Format check
echo "2️⃣  Checking code format..."
if npm run format:check; then
  echo -e "${GREEN}✅ Code format is correct${NC}"
else
  echo -e "${YELLOW}⚠️  Code format issues found. Run 'npm run format' to fix.${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
echo ""

# 3. Check for merge conflicts
echo "3️⃣  Checking for merge conflicts..."
if grep -r "<<<<<<< HEAD" src/ 2>/dev/null || grep -r "=======" src/ 2>/dev/null | grep -v "===" || grep -r ">>>>>>>" src/ 2>/dev/null; then
  echo -e "${RED}❌ Merge conflicts found! Resolve them before committing.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ No merge conflicts${NC}"
fi
echo ""

# 4. Check for console.log
echo "4️⃣  Checking for console.log statements..."
if grep -r "console\.log\|console\.debug\|console\.info" src/ --exclude-dir=node_modules 2>/dev/null; then
  echo -e "${YELLOW}⚠️  console.log/debug/info found. Use console.warn/error only.${NC}"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
else
  echo -e "${GREEN}✅ No console.log statements${NC}"
fi
echo ""

# 5. Check for .env files in git
echo "5️⃣  Checking for .env files..."
if git ls-files | grep -E "\.env$|\.env\.(local|development|production)$"; then
  echo -e "${RED}❌ .env files are staged! Remove them from git.${NC}"
  echo "Run: git reset HEAD .env*"
  exit 1
else
  echo -e "${GREEN}✅ No .env files in git${NC}"
fi
echo ""

# 6. Check for secrets
echo "6️⃣  Checking for potential secrets..."
if grep -ri "password\s*=\s*['\"].*['\"]\|api[_-]?key\s*=\s*['\"].*['\"]\|secret\s*=\s*['\"].*['\"]" src/ --exclude-dir=node_modules 2>/dev/null; then
  echo -e "${RED}❌ Potential secrets found! Remove hardcoded secrets.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ No hardcoded secrets${NC}"
fi
echo ""

# 7. Build check (optional, can be slow)
read -p "Run build check? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "7️⃣  Running build..."
  if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
  else
    echo -e "${RED}❌ Build failed! Fix errors before committing.${NC}"
    exit 1
  fi
  echo ""
fi

echo -e "${GREEN}✅ All pre-commit checks passed!${NC}"
echo "You can now commit your changes."

