# Publishing Guide for n8n-nodes-jeenee-ui

## Pre-publish Checklist

Before publishing to npm, make sure:

- [ ] All tests pass
- [ ] Code is linted (`npm run lint`)
- [ ] Build is successful (`npm run build`)
- [ ] Version is updated in `package.json`
- [ ] CHANGELOG.md is updated
- [ ] README.md is complete and accurate
- [ ] You're logged into npm (`npm whoami`)

## First Time Setup

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials:
- Username
- Password
- Email
- 2FA code (if enabled)

### 2. Verify login

```bash
npm whoami
```

Should output your npm username.

## Publishing Process

### Option 1: Manual Publishing

#### 1. Update version

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

This will:
- Update version in `package.json`
- Create a git commit
- Create a git tag

#### 2. Build

```bash
npm run build
```

#### 3. Test package contents

```bash
npm pack --dry-run
```

This shows what will be included in the published package.

#### 4. Publish

```bash
# First time or public package
npm publish --access public

# Subsequent updates
npm publish
```

#### 5. Push to GitHub

```bash
git push origin main --tags
```

### Option 2: Using n8n-node CLI (Recommended)

The project includes `n8n-node` CLI which handles versioning and publishing:

```bash
npm run release
```

This will:
1. Run tests
2. Build the project
3. Bump version (you'll be prompted)
4. Create git tag
5. Push to GitHub
6. Publish to npm

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.X): Bug fixes, small improvements
- **Minor** (1.X.0): New features, backward compatible
- **Major** (X.0.0): Breaking changes

## After Publishing

### 1. Verify on npm

Check your package page:
```
https://www.npmjs.com/package/n8n-nodes-jeenee-ui
```

### 2. Test installation

```bash
npm create @n8n/node
# or in existing n8n installation
npm install n8n-nodes-jeenee-ui
```

### 3. Submit to n8n Community (Optional)

For verification and listing in n8n Cloud:
1. Go to [n8n Creator Portal](https://creators.n8n.io/nodes)
2. Submit your node for review
3. Wait for verification

## Troubleshooting

### Error: Package name already exists

Your package name might be taken. Update the `name` field in `package.json`.

### Error: 403 Forbidden

You don't have permission. Make sure:
- You're logged in: `npm whoami`
- For scoped packages: use `--access public`

### Error: Files not included

Check:
- `files` array in `package.json`
- `.npmignore` file
- Run `npm pack --dry-run` to preview

### Build errors

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## Unpublishing (Use with caution!)

You can only unpublish within 72 hours:

```bash
# Unpublish specific version
npm unpublish n8n-nodes-jeenee-ui@1.0.0

# Unpublish all versions (DANGEROUS!)
npm unpublish n8n-nodes-jeenee-ui --force
```

**Note**: Unpublishing is discouraged. Use `npm deprecate` instead:

```bash
npm deprecate n8n-nodes-jeenee-ui@1.0.0 "This version has critical bugs"
```

## Useful Commands

```bash
# Check what will be published
npm pack --dry-run

# View package info
npm view n8n-nodes-jeenee-ui

# List your published packages
npm ls --depth=0 -g

# Check package size
npm pack && tar -xvzf *.tgz && du -sh package && rm -rf package *.tgz
```

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [n8n Community Nodes](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/)
- [Semantic Versioning](https://semver.org/)

