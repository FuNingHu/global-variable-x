# Global Variable X

A URCap demonstrating global variable creation in Universal Robots PolyScopeX.

## Features

- Creates global variables using the new `VariableDeclaration` interface
- Generates URScript global variable declarations
- Dynamic program node labels displaying variable names
- Compatible with PolyScopeX SDK v0.19+

## Project Structure

```
global-variable-x/
├── global-variable-x-frontend/    # Angular frontend
│   ├── src/app/components/
│   │   └── global-variable-x-program/
│   ├── package.json
│   └── angular.json
├── manifest.yaml                  # URCap manifest
└── package.json                   # Build scripts
```

## Prerequisites

- Node.js v20+
- npm
- PolyScopeX SDK v0.19+

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

Outputs `.urcapx` file to `target/` directory.

## Deploy

```bash
npm run install-urcap
```

## Variable Creation Method Update

### Deprecated Approach (SDK < v0.19)

```typescript
// ❌ Old method - generateVariable() is deprecated
const api = new ProgramBehaviorAPI(self);
const variable = await api.symbolService.generateVariable('var', VariableValueType.BOOLEAN);
```

### Current Approach (SDK v0.19+)

```typescript
// ✅ New method - Direct VariableDeclaration object creation
const variable: VariableDeclaration = {
    id: generateUniqueId(),
    name: 'var',
    valueType: 'boolean',  // String literal instead of enum
    _IDENTIFIER: 'VariableDeclaration'
};
```

### Key Changes

| Aspect | Old | New |
|--------|-----|-----|
| **Method** | `api.symbolService.generateVariable()` | Direct object creation |
| **Type** | `URVariable` | `VariableDeclaration` |
| **Value Type** | `VariableValueType.BOOLEAN` (enum) | `'boolean'` (string literal) |
| **Async** | Required | Not required |
| **ID Generation** | Automatic | Manual (`generateUniqueId()`) |

### Benefits

- **Simpler**: No async calls or API dependencies
- **Faster**: Synchronous object creation
- **Clearer**: Explicit type definitions
- **Standard**: Aligns with TypeScript interfaces

## URScript Generation

The node generates global variable declarations:

```typescript
const generateScriptCodeBefore = (node: GlobalVariableXProgramNode): ScriptBuilder => {
    const builder = new ScriptBuilder();
    builder.globalVariable(node.parameters.variable.name, 'False');
    return builder;
};
```

Generated URScript:
```python
global var=False
```

## Usage

1. Build and install the URCap
2. Open PolyScopeX program editor
3. Add "Global Variable X Program" node from toolbox
4. Node automatically creates a boolean global variable named `var`
5. View generated URScript to see `global var=False` declaration

## SDK Dependencies

- **@universal-robots/contribution-api**: 49.1.4
- **@universal-robots/ui-angular-components**: 6.5.11
- **Angular**: 19.2.4
- **TypeScript**: 5.7.3

## Reference

- [Variable System Migration Guide](https://docs.universal-robots.com/PolyScopeX_SDK_Documentation/build/SDK-v0.19/HowToGuides/variable-system-migration.html)
- [PolyScopeX SDK Documentation](https://docs.universal-robots.com/PolyScopeX_SDK_Documentation/)

## License

See LICENSE file.

## Author

FuNingHu

## Changelog

### v1.0.0 (2026-01-20)
- Migrated from deprecated `generateVariable()` to `VariableDeclaration` interface
- Updated to SDK v0.19.62
- Removed `upgradeNode` for backward compatibility (new installs only)
- Fixed `substr()` deprecation (replaced with `slice()`)
- Simplified variable creation to synchronous pattern
