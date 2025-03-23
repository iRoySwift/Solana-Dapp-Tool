# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

or

```bash
cd ./packages/common/ui
pnpm dlx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu table dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```

This will place the ui components in the `packages/ui/src/components` directory.

## update shadcn ui

```bash
cd ./packages/common/ui
pnpm up "@radix-ui/*" cmdk lucide-react recharts tailwind-merge clsx --latest
```

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@iroy/ui/components/ui/button";
```

## pnpm search dependencies

```zsh
pnpm list --recursive  --only-projects --depth=2
```

## add other common module to devDependencies

```zsh
pnpm add -D @iroy/eslint @iroy/typescript --filter @iroy/network --workspace
```

## add dependencies

```zsh
pnpm add axios qs js-cookie --filter @iroy/network
```

## add other common module to workspace root devDependencies

```zsh
pnpm add -wD @iroy/eslint @iroy/typescript --filter @iroy/network --workspace
```

## remove dev

```zsh
pnpm remove -D @iroy/eslint @iroy/typescript --filter @iroy/network
```
