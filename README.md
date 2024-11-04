# WarioWeb

Warioweb - Minigames battle royale, online, in-browser.

## Getting Started

### Prerequisites

- Node.js latest major
- pnpm (run:`corepack enable`)

### Usage

```bash
pnpm install;
pnpm dev;
```

### Create a component (using Chakra UI)

```bash
pnpm snippet <componentName>
```

[see component list here.](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts)

### Create a Route (using Tanstack Router)

[See Routing Concepts](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees)

### Where is the backend ?

[Here](https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes#the-routebeforeload-option)

### How about Auth ?

We use [arctic](https://arcticjs.dev/) for easy integration with most OAuth 2.0 providers.

Check [./app/routes/\_auth](./app/routes/_auth) and [./app/routes/index.tsx](./app/routes/index.tsx) for more details.

### Tooling

We use eslint integrated with typescript with any plugin provided by lib authors.

Most of them are set to strict and non intrusive.

### Building ?

```bash
pnpm build
```

### CI/CD

- [`.github/workflows/integration.yml`](`.github/workflows/integration.yml`)

### Deployment

- None
