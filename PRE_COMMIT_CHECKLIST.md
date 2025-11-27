# Pre-Commit Checklist

## ✅ Mandatory Checks Before Every Commit

### **1. Code Quality Checks**

#### **Run Linter**
```bash
npm run lint
```
- ✅ Must pass with **0 errors**
- ✅ Fix all warnings (if critical)

#### **Run Type Check**
```bash
npm run type-check
```
- ✅ Must pass with **0 TypeScript errors**
- ✅ No `any` types (unless absolutely necessary)
- ✅ No `@ts-ignore` or `@ts-nocheck`

#### **Format Code**
```bash
npm run format
```
- ✅ Code must be formatted
- ✅ 2 spaces indentation
- ✅ Single quotes
- ✅ No semicolons

---

### **2. Build Verification**

#### **Test Production Build**
```bash
npm run build
```
- ✅ Build must succeed
- ✅ No build errors
- ✅ No warnings (check output)
- ✅ All chunks generated correctly

#### **Test Preview**
```bash
npm run preview
```
- ✅ App loads correctly
- ✅ No runtime errors in console

---

### **3. Code Review Checklist**

#### **✅ No Merge Conflicts**
```bash
# Check for conflict markers
grep -r "<<<<<<< HEAD" src/
grep -r "=======" src/
grep -r ">>>>>>>" src/
```
- ✅ No conflict markers found

#### **✅ No Console Logs**
```bash
# Check for console.log/debug/info
grep -r "console\.log\|console\.debug\|console\.info" src/
```
- ✅ No console.log statements (use console.warn/error only)

#### **✅ No TODO/FIXME in Production Code**
```bash
# Check for TODO comments
grep -r "TODO\|FIXME\|XXX\|HACK" src/
```
- ✅ No TODO comments (or move to issues)
- ✅ All FIXME resolved

#### **✅ No Hardcoded Secrets**
```bash
# Check for secrets
grep -r "password\|secret\|api_key\|token" src/ --ignore-case
```
- ✅ No hardcoded secrets
- ✅ All secrets in .env files

#### **✅ All Imports Valid**
- ✅ No unused imports
- ✅ No missing imports
- ✅ All paths use `@/` aliases

#### **✅ Error Handling**
- ✅ All API calls have error handling
- ✅ Components wrapped in error boundaries
- ✅ No unhandled promises

#### **✅ Type Safety**
- ✅ No `any` types
- ✅ All props typed
- ✅ All functions have return types (where needed)

---

### **4. Testing Checklist**

#### **Manual Testing**
- ✅ App starts without errors
- ✅ All routes work
- ✅ Authentication works
- ✅ No console errors
- ✅ Responsive design works
- ✅ Dark/light theme works
- ✅ Language switching works

#### **Browser Testing**
- ✅ Test in Chrome
- ✅ Test in Firefox
- ✅ Test in Safari (if on Mac)
- ✅ Mobile responsive (dev tools)

---

### **5. Git Pre-Commit Checks**

#### **Check Git Status**
```bash
git status
```
- ✅ Only intended files staged
- ✅ No accidental files (node_modules, .env, etc.)

#### **Check .gitignore**
- ✅ `.env` files not committed
- ✅ `node_modules` not committed
- ✅ Build artifacts not committed
- ✅ IDE files not committed

#### **Check Branch**
```bash
git branch
```
- ✅ On correct branch
- ✅ Branch is up to date with remote
- ✅ No uncommitted changes from other branches

---

### **6. Documentation**

#### **Update Documentation (if needed)**
- ✅ README.md updated (if new features)
- ✅ DEVELOPER_GUIDE.md updated (if architecture changed)
- ✅ Code comments added (for complex logic)

---

### **7. Security Checks**

#### **Dependency Audit**
```bash
npm audit
```
- ✅ No critical vulnerabilities
- ✅ Fix high vulnerabilities before commit

#### **Security Review**
- ✅ No XSS vulnerabilities
- ✅ Input sanitization in place
- ✅ CSRF protection active
- ✅ No exposed API keys

---

### **8. Performance Checks**

#### **Bundle Size**
```bash
npm run build
# Check dist/ folder size
```
- ✅ Bundle size reasonable
- ✅ No unnecessary large dependencies

#### **Lazy Loading**
- ✅ Heavy components lazy loaded
- ✅ Routes lazy loaded
- ✅ Images lazy loaded

---

## 🚨 Critical Issues to Fix Before Commit

### **MUST FIX:**
1. ❌ TypeScript errors
2. ❌ Linter errors
3. ❌ Build failures
4. ❌ Merge conflicts
5. ❌ Console errors in browser
6. ❌ Missing error handling
7. ❌ Security vulnerabilities

### **SHOULD FIX:**
1. ⚠️ TypeScript warnings
2. ⚠️ Linter warnings
3. ⚠️ TODO comments
4. ⚠️ Console.log statements
5. ⚠️ Unused imports
6. ⚠️ Missing types

---

## 📋 Quick Pre-Commit Script

Create a script to run all checks:

```bash
#!/bin/bash
# pre-commit.sh

echo "🔍 Running pre-commit checks..."

echo "1. Linting..."
npm run lint || exit 1

echo "2. Type checking..."
npm run type-check || exit 1

echo "3. Formatting..."
npm run format || exit 1

echo "4. Building..."
npm run build || exit 1

echo "5. Checking for merge conflicts..."
if grep -r "<<<<<<< HEAD" src/; then
  echo "❌ Merge conflicts found!"
  exit 1
fi

echo "6. Checking for console.log..."
if grep -r "console\.log\|console\.debug\|console\.info" src/; then
  echo "⚠️  Console.log found (use console.warn/error only)"
  # exit 1  # Uncomment to fail on console.log
fi

echo "✅ All checks passed!"
```

---

## 🔧 Setup Pre-Commit Hook (Optional)

### **Install husky (if not already)**
```bash
npm install --save-dev husky lint-staged
```

### **Setup husky**
```bash
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

---

## 📝 Commit Message Guidelines

### **Format:**
```
type(scope): subject

body (optional)

footer (optional)
```

### **Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### **Example:**
```
feat(orders): add order creation with optimistic updates

- Add useCreateOrder hook
- Implement optimistic UI updates
- Add error handling
```

---

## ✅ Final Checklist

Before clicking "Commit":

- [ ] All linter checks pass
- [ ] All type checks pass
- [ ] Build succeeds
- [ ] No merge conflicts
- [ ] No console errors
- [ ] Manual testing done
- [ ] Code formatted
- [ ] No secrets committed
- [ ] Documentation updated (if needed)
- [ ] Commit message follows guidelines

---

**Only commit when ALL checks pass! ✅**

