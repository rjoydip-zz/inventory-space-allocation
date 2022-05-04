# inventory-space-allocation

Disigning and solving inventory space allocation using JavaScript.

## Requirement

- Node.js (>=14)
- MySQL workbench

## Technology used

- Next.js framework
- Prisma
- MySQL
- Taildwind.css
- Postman/Insomina

## Local Setup

- Install NPM modules
- Create database in MySQL/PgSQL workbench
- Change the provider according to the database choice in Prisma schama file
- Run NPM `db:migration` to create tables and schema
- RUN NPM `db:seed` to seed sample data
- Run NPM `dev` to run frontend & backend

Application will on [localhost](localhost:3000). API can be accessable in [API](localhost:3000/api)

## Prisma CLI command

- Pull database schema into prisma folder

```sh
npx prisma db pull
```

- Database migration during development

```sh
npx prisma migrate dev --preview-feature --name inventory-space-allocation --skip-generate --skip-seed
```

- Seed dummy data

```sh
npx prisma db push && node prisma/seed.js --skip-generate
```

## TODO

Below things can be done to make it a ready application.

- API improvement
- Show data on dashboard
- Need to use table instead of list view
- Lighthouse score improvement
- Need some performance optimization
- Offline mode support
- Remote/Cloud/NoSQL database use instead of MySQL
- git hooks modules
