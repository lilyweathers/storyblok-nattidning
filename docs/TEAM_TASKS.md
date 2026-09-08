# Team tasks

This document divides the remaining Nättidning assignment between Josef, Samuel,
and Lily. The goal is to keep the workload balanced while reducing conflicts in
shared files.

## Shared Git workflow

Do not work directly on `main`. Start every task from the latest `main`:

```bash
git switch main
git pull --ff-only
git switch -c feat/task-name
```

Before opening a pull request:

```bash
npm run lint
npm run build
git push -u origin feat/task-name
```

Review rotation:

- Samuel reviews Josef's pull requests.
- Lily reviews Samuel's pull requests.
- Josef reviews Lily's pull requests.

Every pull request should contain one coherent deliverable. Merge the foundational
work before starting a branch that depends on it. Vercel creates previews from
branches, while merges to `main` update production.

## Josef — Storyblok foundation and article detail

Josef owns the content architecture, shared Storyblok data access, and the complete
article-detail flow.

### Branch: `feat/storyblok-foundation`

Storyblok tasks:

- [ ] Create or verify that the group is using a new Storyblok space.
- [ ] Create the `author` content type:
  - `name`: Text
  - `bio`: Textarea
  - `photo`: Asset restricted to images
- [ ] Create the `article` content type:
  - `title`: Text
  - `summary`: Textarea
  - `content`: RichText
  - `category`: Single Option connected to `article-categories`
  - `author`: Reference restricted to `author` stories
- [ ] Create the `article-categories` datasource.
- [ ] Add at least two category values, such as `Nyheter/nyheter` and
  `Guide/guide`.
- [ ] Create the `authors/`, `articles/`, and `categories/` folders.
- [ ] Create at least two authors and four articles.
- [ ] Distribute the articles between both authors and multiple categories.
- [ ] Document the final schema and content paths so the whole group can explain
  them.

Suggested commit:

```text
docs: document Storyblok schema and seed content
```

This pull request is the first dependency and must merge before the route branches.

### Branch: `feat/article-detail`

Next.js tasks:

- [ ] Establish shared Storyblok fetching helpers in `src/lib/`.
- [ ] Add `/articles/[slug]`.
- [ ] Fetch articles with `resolve_relations: "article.author"`.
- [ ] Render the article's RichText content.
- [ ] Display the resolved author's name.
- [ ] Link the author to `/authors/[slug]`.
- [ ] Add useful loading, missing-content, and `notFound()` behavior.
- [ ] Add `generateMetadata` using the article title and summary.
- [ ] Add `generateStaticParams` for all article stories.
- [ ] Confirm that preview and published modes use the intended Storyblok version.

Suggested commits:

```text
feat: add Storyblok article data access
feat: build article detail page with resolved author
feat: add article metadata and static params
```

Josef remains the main owner of `src/lib/storyblok.js`. Samuel and Lily should
coordinate any Storyblok component registrations with Josef to avoid conflicts.

## Samuel — Layout, navigation, and article list

Samuel owns the visual system, shared presentation components, navigation, and the
article list.

### Branch: `feat/site-shell`

Design and shared-interface tasks:

- [X] Translate the supplied news layout into reusable styles and components.
- [X] Establish the page width, typography, spacing, colors, category badges,
  cards, and responsive breakpoints.
- [X] Build the header with Start, Artiklar, and category links.
- [X] Build the VG multilevel menu, for example Artiklar → Alla artiklar and author links.
- [X] Make the menu usable with keyboard controls and on mobile screens.
- [X] Build the footer with simple copyright or group information.
- [X] Add a simple homepage with a clear link to `/articles`.
- [X] Create reusable components such as `ArticleCard`, `CategoryBadge`, `Header`,
  `Footer`, and empty/error states.
- [X] If navigation will be CMS-controlled, create and document the Storyblok
  `config` content type and coordinate registration with Josef.

Suggested commits:

```text
feat: establish responsive news design system
feat: add header and footer
feat: add accessible multilevel navigation
```

### Branch: `feat/article-list`

Article-list tasks:

- [ ] Add `/articles`.
- [ ] Fetch stories using `content_type: "article"`.
- [ ] Resolve authors using `resolve_relations: "article.author"`.
- [ ] Display each article's title, summary, category, and author name.
- [ ] Link every card to `/articles/[slug]`.
- [ ] Reuse `ArticleCard` rather than duplicating markup.
- [ ] Match the reference layout's news-list hierarchy at desktop and mobile
  widths.
- [ ] Add an appropriate empty state when no articles are available.

Suggested commits:

```text
feat: add resolved article list query
feat: build responsive article list
```

Samuel is the main owner of `src/app/layout.js`, `src/app/globals.css`, navigation,
and shared visual components.

## Lily — Authors, categories, SEO, and release

Lily owns reverse-reference queries, content-driven category routing, search-engine
discovery, and final production verification.

### Branch: `feat/author-pages`

Author tasks:

- [ ] Add `/authors/[slug]`.
- [ ] Fetch the author using `getStory()`.
- [ ] Display the author's name, photo, and bio.
- [ ] Find related articles using:

```js
filter_query: {
	author: {
		in: authorStory.uuid,
	},
}
```

- [ ] Display the results with Samuel's `ArticleCard`.
- [ ] Add `generateStaticParams` for all authors.
- [ ] Handle missing authors and authors without articles.

Suggested commits:

```text
feat: build author profile pages
feat: list articles by referenced author
feat: add author static params
```

### Branch: `feat/category-routing`

Storyblok and Next.js tasks:

- [ ] Create the `category` content type.
- [ ] Create a reusable `filtered-posts` block.
- [ ] Create one story under `categories/` for every datasource value.
- [ ] Add `/categories/[slug]`.
- [ ] Fetch the matching category story.
- [ ] Render its content with `StoryblokServerComponent`.
- [ ] Filter articles with `filter_query` using the category/URL slug.
- [ ] Confirm that adding a datasource entry and Storyblok story creates a new
  category page without adding another Next.js route file.

Suggested commits:

```text
feat: add content-driven category pages
feat: filter articles by datasource category
```

### Branch: `feat/seo-and-release`

SEO and production tasks:

- [ ] Add `robots.txt` using `SITE_URL`.
- [ ] Add `sitemap.xml` using Storyblok `getStories()`.
- [ ] Include article and author URLs automatically in the sitemap.
- [ ] Verify `SITE_URL` and Storyblok variables in Vercel.
- [ ] Create a Vercel deploy hook.
- [ ] Register that hook as a Storyblok publication webhook.
- [ ] Publish a test change and confirm that it triggers a new deployment.
- [ ] Point the Storyblok Visual Editor location at the production URL.
- [ ] Add submission links and webhook evidence to the documentation.
- [ ] Perform final production checks with Josef and Samuel.

Suggested commits:

```text
feat: generate robots and Storyblok sitemap
docs: document webhook and production setup
```

Lily will need Vercel project access for the webhook, environment settings, logs,
and final deployment verification.

## Merge order

Use this order so dependencies arrive before they are needed:

1. Josef — `feat/storyblok-foundation`
2. Samuel — `feat/site-shell`
3. Josef — `feat/article-detail`
4. Samuel — `feat/article-list`
5. Lily — `feat/author-pages`
6. Lily — `feat/category-routing`
7. Lily — `feat/seo-and-release`

Josef and Samuel can work in parallel after agreeing on the Storyblok model. Lily
can begin the author and category queries after Josef's foundation is merged, then
rebase after Samuel's reusable `ArticleCard` is available.

## Final group checklist

Josef, Samuel, and Lily should jointly verify and be able to explain:

- [ ] Article-to-author reference resolution.
- [ ] Author-to-article reverse filtering by author UUID.
- [ ] Datasource filtering by category.
- [ ] Content-driven `/categories/[slug]` routing.
- [ ] RichText rendering.
- [ ] Article metadata and article/author static parameters.
- [ ] Responsive header, footer, article views, and multilevel menu.
- [ ] `robots.txt` and `sitemap.xml` generation from `SITE_URL` and Storyblok.
- [ ] Feature-branch and pull-request collaboration.
- [ ] Storyblok publication webhook triggering a Vercel deployment.
- [ ] Adding a new author, article, or category without unrelated code changes.
