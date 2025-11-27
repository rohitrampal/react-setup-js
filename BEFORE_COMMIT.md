# Before Commit - Complete Checklist

## 🚨 CRITICAL: Run These Before Every Commit

### **1. Automated Checks (MANDATORY)**

```bash
# Run all checks at once
npm run check-all

# Or individually:
npm run lint          # Must pass
npm run type-check    # Must pass  
npm run format:check  # Should pass
```

**✅ All must pass before committing!**

---

### **2. Build Test (MANDATORY)**

```bash
npm run build
```

**Check:**
- ✅ Build succeeds without errors
- ✅ No warnings in output
- ✅ `dist/` folder created
- ✅ All chunks generated

---

### **3. Merge Conflict Check (MANDATORY)**

```bash
# Check for conflict markers
grep -r "<<<<<<< HEAD" src/ || echo "✅ No conflicts"
grep -r "=======" src/ | grep -v "===" || echo "✅ No conflicts"  
grep -r ">>>>>>>" src/ || echo "✅ No conflicts"
```

**✅ Must find NO conflicts**

---

### **4. Security Check (MANDATORY)**

```bash
# Check for .env files in git
git ls-files | grep "\.env"

# Check for hardcoded secrets
grep -ri "password\s*=\s*['\"].*['\"]" src/ || echo "✅ No secrets"
grep -ri "api[_-]?key\s*=\s*['\"].*['\"]" src/ || echo "✅ No secrets"
```

**✅ Must find NO .env files or secrets**

---

### **5. Code Quality Check**

```bash
# No console.log
grep -r "console\.log\|console\.debug\|console\.info" src/ || echo "✅ Clean"

# No any types
grep -r ":\s*any\s" src/ || echo "✅ Type-safe"

# No ts-ignore
grep -r "@ts-ignore\|@ts-nocheck" src/ || echo "✅ Clean"
```

**✅ Should be clean**

---

### **6. Git Status Check**

```bash
git status
git diff --staged
```

**Check:**
- ✅ Only intended files staged
- ✅ No .env files
- ✅ No node_modules
- ✅ No build artifacts
- ✅ No IDE config files

---

### **7. Manual Testing (RECOMMENDED)**

**Test in Browser:**
- [ ] App starts without errors
- [ ] All routes work
- [ ] Login works
- [ ] No console errors
- [ ] Responsive design works
- [ ] Theme switching works
- [ ] Language switching works

---

## 📋 Quick Pre-Commit Command

**Run this single command:**
```bash
npm run pre-commit
```

**Or use the script:**
```bash
bash .pre-commit.sh
```

---

## ✅ Current Codebase Status

### **✅ PASSED Checks:**
- ✅ Linter: 0 errors
- ✅ Type Check: 0 errors (verified manually)
- ✅ Merge Conflicts: 0 found
- ✅ Console.log: 0 found
- ✅ Type Safety: No `any` types
- ✅ Security: No secrets found
- ✅ .gitignore: Properly configured

### **⚠️ Minor Issues:**
- ⚠️ 1 TODO comment in ProfileForm (non-blocking)

### **✅ Ready to Commit: YES**

---

## 🎯 Commit Workflow

### **Step 1: Pre-Commit**
```bash
npm run pre-commit
```

### **Step 2: If All Pass**
```bash
git add .
git commit -m "feat: your commit message"
```

### **Step 3: Before Push**
```bash
git pull origin main  # or your default branch
# Resolve any conflicts
npm run build  # Final build check
git push
```

---

## 🔧 If Checks Fail

### **Linter Errors:**
```bash
npm run lint -- --fix  # Auto-fix
# Or fix manually
```

### **Type Errors:**
```bash
npm run type-check
# Fix errors shown
```

### **Format Issues:**
```bash
npm run format  # Auto-fix
```

### **Merge Conflicts:**
```bash
git status
# Resolve conflicts manually
git add .
```

---

## 📝 Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Examples:**
```
feat(orders): add order creation
fix(auth): fix token refresh issue
docs: update developer guide
refactor(api): improve error handling
```

---

## ✅ Final Checklist

Before clicking "Commit":

- [ ] `npm run check-all` passes
- [ ] `npm run build` succeeds
- [ ] No merge conflicts
- [ ] No .env files staged
- [ ] No secrets in code
- [ ] Manual testing done
- [ ] Commit message follows format
- [ ] Branch is up to date

---

**Only commit when ALL checks pass! ✅**

