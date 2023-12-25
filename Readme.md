# DenoKV Issue

* If only node is used for @deno/kv, it works fine, but if vite is used, an error occurs.
* You can reproduce it in this repository.

## version

* Windows11 x64 22H2 22621.2861
* Node.js v18.17.0
* denokv 0.6.1

## min-node

* Install

```text
mkdri min-node
npm install @deno/kv
```

* Setup

```text
cd .\min-node\
npm install
```

* test

```text
node .\main.mjs
```

## min-vite

This is a project with denokv installed in a minimal environment of vite.  
In main.js, I just import deno.  
I get an error.

* Install

```text
npm create vite@latest
√ Project name: ... min-vite
√ Select a framework: » Vanilla
√ Select a variant: » JavaScript
cd .\min-vite\
npm install
npm install @deno/kv
```

* Setup

```text
cd .\min-vite\
npm install
```

* Test

```text
npm run dev
```

* Error

```powershell
14:29:20 [vite] page reload main.js (x2)
X [ERROR] Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)

    node_modules/@deno/kv/esm/napi_based.js:34:31:
      34 │ const DEFAULT_NAPI_INTERFACE = await import('./_napi_index.cjs');
         ╵                                ~~~~~

X [ERROR] No loader is configured for ".node" files: node_modules/@deno/kv-win32-x64-msvc/deno-kv-napi.win32-x64-msvc.node

    node_modules/@deno/kv/esm/_napi_index.cjs:41:36:
      41 │             nativeBinding = require('@deno/kv-win32-x64-msvc')
         ╵                                     ~~~~~~~~~~~~~~~~~~~~~~~~~

14:29:21 [vite] error while updating dependencies:
Error: Build failed with 2 errors:
node_modules/@deno/kv/esm/_napi_index.cjs:41:36: ERROR: No loader is configured for ".node" files: node_modules/@deno/kv-win32-x64-msvc/deno-kv-napi.win32-x64-msvc.node
node_modules/@deno/kv/esm/napi_based.js:34:31: ERROR: Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)
    at failureErrorWithLog (D:\workspace\test\denokv-for-issue\min-vite\node_modules\esbuild\lib\main.js:1650:15)
    at D:\workspace\test\denokv-for-issue\min-vite\node_modules\esbuild\lib\main.js:1058:25
    at D:\workspace\test\denokv-for-issue\min-vite\node_modules\esbuild\lib\main.js:1526:9
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

## Solutions

### Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)

You can work around this by installing the following packages  
[vite-plugin-top-level-await](https://github.com/Menci/vite-plugin-top-level-await)

### No loader is configured for ".node" files: node_modules/@deno/kv-win32-x64-msvc/deno-kv-napi.win32-x64-msvc.node

Processes that should have been executed on the server side were being executed on the client side.
This is not a issue.
