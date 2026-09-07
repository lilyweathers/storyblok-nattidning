# Nättidning

Group examination project: a news site built with Next.js and Storyblok. Articles
are connected to authors through Storyblok references and can be browsed by
datasource-backed categories.

The repository currently contains only the initialized Storyblok/Next.js starter.
Application features and Storyblok models have deliberately not been started.
See [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) for the agreed delivery and Git
workflow.

## Local setup

Requirements:

- Node.js 24 (the version used to validate the initial setup)
- npm
- A new Storyblok space owned by the group

Install dependencies and configure the local environment:

```sh
npm ci
copy .env.example .env
```

Set `STORYBLOK_DELIVERY_API_TOKEN` and `STORYBLOK_REGION` in `.env`. Never commit
that file. Then start the app:

```sh
npm run dev
```

For Storyblok Visual Editor preview, use HTTPS:

```sh
npx next dev --experimental-https
```

## Quality checks

Before opening a pull request, run:

```sh
npm run lint
npm run build
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `STORYBLOK_DELIVERY_API_TOKEN` | Storyblok Delivery API preview/public token |
| `STORYBLOK_API_BASE_URL` | Delivery API base URL |
| `STORYBLOK_REGION` | Region of the group's Storyblok space |
| `SITE_URL` | Canonical production URL used by robots and sitemap |

## Delivery target

- Production: https://storyblok-nattidning.vercel.app
- Repository: https://github.com/lilyweathers/storyblok-nattidning

The GitHub repository is connected to Vercel. Pushes to `main` trigger production
deployments automatically. Runtime secrets are configured in Vercel and must not
be committed to this repository.
