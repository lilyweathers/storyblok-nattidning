# Project plan

## Scope and acceptance criteria

The group will create a new Storyblok space and deliver the following:

- `author` content type with `name`, `bio`, and `photo`.
- `article` content type with `title`, `summary`, `content`, `category`, and an
  `author` reference restricted to author stories.
- `article-categories` datasource with at least two entries.
- At least two authors and four articles under `authors/` and `articles/`.
- A `categories/` story for every datasource value, rendered through a reusable
  filtered-posts block.
- Article list/detail, author detail, and category routes.
- Header, footer, metadata, static params, sitemap, robots, Vercel deployment,
  and a Storyblok-to-Vercel deploy webhook.
- A multilevel header menu for the VG criterion.

The supplied visual reference is a clean Swedish news layout with a top navigation,
a two-column featured story, category badges, a latest-news list, a popular/category
sidebar, and a subscription banner. Implementation should preserve that hierarchy,
use responsive stacking on narrow screens, and adapt its labels to the assignment's
required routes. The reference currently lives outside the repository at
`C:\Users\lilyw\OneDrive\Bilder\news_layout_.png`.

## Git workflow

Use a small-team trunk-based workflow:

- `main` is always reviewable and deployable. Enable branch protection after the
  GitHub repository is created: pull request required, one approval, and passing
  lint/build checks.
- Create each short-lived branch from an updated `main` using
  `feat/<topic>`, `chore/<topic>`, or `docs/<topic>`.
- Keep commits focused and use Conventional Commit messages.
- Push a branch after every coherent, passing commit so work is backed up and
  visible. Rebase or merge the latest `main` before requesting review.
- Prefer squash-merging each pull request so `main` retains one clear commit per
  deliverable. Delete merged remote branches.
- Do not commit `.env`, Storyblok tokens, `.next`, or `node_modules`.

There is no long-lived `develop` branch. With a team of two to four people it would
add coordination overhead without improving release safety.

## Delivery stages, branches, commits, and pushes

### 0. Foundation (this initialization)

Branch: `main`

Commit:

1. `chore: initialize Next.js Storyblok project`

Push `main`, then configure the GitHub repository and branch protection.

### 1. Storyblok schema and seed content

Branch: `docs/storyblok-content-model`

Storyblok work:

1. Create the new group space.
2. Add `author`, `article`, and category-page/block schemas exactly as specified.
3. Add the `article-categories` datasource, initially `Nyheter/nyheter` and
   `Guide/guide` (or the group-approved equivalents).
4. Create folders and seed at least two authors, four articles, and one category
   story per datasource value.
5. Record schema settings, story paths, ownership, and setup evidence in project
   documentation so every member can explain the model.

Suggested commit and push:

1. `docs: document Storyblok schema and seed content`

Merge before route work begins so all developers target the same model.

### 2. Storyblok data layer and article detail

Branch: `feat/article-detail`

Work:

1. Establish shared Storyblok fetch helpers and draft/published behavior.
2. Add `/articles/[slug]` using `resolve_relations: "article.author"`.
3. Render RichText, article metadata, and the linked resolved author.
4. Add not-found/error behavior without exposing tokens.

Suggested commits and pushes:

1. `feat: add Storyblok article data access`
2. `feat: build article detail page with author reference`
3. `test: cover article detail rendering`

### 3. Article list

Branch: `feat/article-list`

Work:

1. Add `/articles` with `content_type: "article"` and resolved authors.
2. Display title, summary, author name, category, and article links.
3. Apply the reference layout's article-list hierarchy responsively.

Suggested commits and pushes:

1. `feat: add resolved article list query`
2. `feat: build responsive article list`

### 4. Shared shell and CMS-driven navigation

Branch: `feat/site-shell`

Work:

1. Add a config/global content model if the group chooses CMS-driven navigation.
2. Build the header and footer, including Start and Artiklar.
3. Add category links and the VG multilevel Artiklar submenu.
4. Align the shell with the supplied layout and ensure keyboard/mobile access.

Suggested commits and pushes:

1. `feat: add global site configuration`
2. `feat: build responsive header and footer`
3. `feat: add accessible multilevel navigation`

### 5. Datasource category routing

Branch: `feat/category-routing`

Work:

1. Add `/categories/[slug]` and fetch the matching category story.
2. Render it with `StoryblokServerComponent`.
3. Add a filtered-posts block whose `filter_query` uses the URL/category slug.
4. Verify that adding a datasource entry plus story needs no new route file.

Suggested commits and pushes:

1. `feat: add content-driven category route`
2. `feat: filter article blocks by datasource category`

### 6. Author pages and reverse references

Branch: `feat/author-pages`

Work:

1. Add `/authors/[slug]` using `getStory()`.
2. Render name, photo, and bio.
3. Query articles with `filter_query: { author: { in: authorStory.uuid } }`.
4. Reuse the article card/list presentation.

Suggested commits and pushes:

1. `feat: build author profile page`
2. `feat: list articles by referenced author`

### 7. Metadata, static generation, and discovery

Branch: `feat/seo-static-generation`

Work:

1. Add article `generateMetadata` from title and summary.
2. Add `generateStaticParams` for article and author detail routes.
3. Add `robots.txt` and `sitemap.xml` using `SITE_URL`.
4. Populate the sitemap from Storyblok so new articles/authors are discovered
   without code changes.

Suggested commits and pushes:

1. `feat: add article metadata and static params`
2. `feat: generate robots and Storyblok sitemap`

### 8. QA, Vercel, and webhook

Branch: `chore/vercel-release`

Work:

1. Run lint/build and test desktop/mobile routes, empty states, broken references,
   keyboard navigation, and published Storyblok content.
2. Deploy from GitHub to Vercel and configure all documented environment variables.
3. Set `SITE_URL` to the production origin and update the Storyblok Visual Editor
   location.
4. Create a Vercel deploy hook, register it as a Storyblok webhook, publish a test
   edit, and verify a new deployment is triggered.
5. Add the GitHub and Vercel URLs to the README and retain submission evidence.

Suggested commits and pushes:

1. `test: verify required routes and content relationships`
2. `chore: configure production deployment metadata`
3. `docs: add deployment links and webhook verification`

Tag the reviewed release (for example `v1.0.0`) only after production acceptance.

## Pull request checklist

- The branch contains one assignment deliverable and has no secrets.
- Acceptance criteria for that stage are demonstrated in the PR description.
- `npm run lint` and `npm run build` pass.
- New UI is checked at mobile and desktop widths against the reference layout.
- Storyblok queries use the intended content type, relation resolution, and filters.
- Another group member reviewed the change and can explain it.
- The branch was pushed and merged through a pull request; `main` remains deployable.

## Recommended ownership and sequencing

Stage 1 is the shared prerequisite. After stage 2 establishes query conventions,
stages 3 and 4 can proceed in parallel if they avoid the same files. Stages 5 and 6
can then proceed in parallel. Stage 7 follows the final route structure, and stage 8
is the release gate. Assign one reviewer outside the implementer for every pull
request and rotate ownership so knowledge is shared.
