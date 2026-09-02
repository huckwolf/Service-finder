This tool is for learning purpose and it is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install app:

```bash
npm install && npm ci
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Docker And MongoDB

Start the app and MongoDB containers:

```bash
docker compose up -d
```

Load the seed JSON files from `private/mongodb_json` into MongoDB:

```bash
make db deploy
```

This imports:

- `tags.json` into the `tags` collection
- `target_audiences.json` into the `target_audiences` collection
- `services.json` into the `services` collection

The import uses `--drop`, so running it again replaces the existing data in those collections.

Check that MongoDB is running:

```bash
make db
```

Check the imported document counts:

```bash
make db-count
```

Expected seed counts:

```text
tags: 15
target_audiences: 10
services: 12
```

Useful Make targets:

| Command | What it does |
| --- | --- |
| `make db` | Checks whether the MongoDB container is ready. |
| `make db deploy` | Checks MongoDB, then imports all seed JSON files. |
| `make db-deploy` | Same import command as `make db deploy`. |
| `make db-count` | Prints document counts for the seeded collections. |
