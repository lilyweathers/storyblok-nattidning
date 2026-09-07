# Storyblok Schema And Seed Content

## Space

Space name: Nattidning

Region: EU

This Storyblok space is used for the group examination project. The content model supports authors, articles, categories, and content-driven routes for the news site.

## Datasources

### article-categories

The `article-categories` datasource is used by articles to select a category.

| Name | Value |

| --- | --- |

| Nyheter | nyheter |

| Guide | guide |

## Content Types

### author

The `author` content type is used for writer profile pages and article references.

Fields:

| Field | Type | Notes |

| --- | --- | --- |

| name | Text | Author display name |

| bio | Textarea | Short author biography |

| photo | Asset | Restricted to images |

Stories are created inside:

```text

authors/

```

Created author stories:

```text

authors/REPLACE-WITH-AUTHOR-SLUG-1

authors/REPLACE-WITH-AUTHOR-SLUG-2

```

### article

The `article` content type is used for news articles.

Fields:

| Field | Type | Notes |

| --- | --- | --- |

| title | Text | Article title |

| summary | Textarea | Short article summary |

| content | RichText | Main article body |

| category | Single Option | Connected to `article-categories` datasource |

| author | Reference | Restricted to `author` stories |

Stories are created inside:

```text

articles/

```

Created article stories:

```text

articles/REPLACE-WITH-ARTICLE-SLUG-1

articles/REPLACE-WITH-ARTICLE-SLUG-2

articles/REPLACE-WITH-ARTICLE-SLUG-3

articles/REPLACE-WITH-ARTICLE-SLUG-4

```

The articles are distributed across both authors and both datasource categories.

## Category Stories

Category stories are created inside:

```text

categories/

```

Created category stories:

```text

categories/nyheter

categories/guide

```

The category story slugs match the datasource values:

| Datasource value | Category story path |

| --- | --- |

| nyheter | categories/nyheter |

| guide | categories/guide |

## Content Structure

Final content structure:

```text

home

authors/

  REPLACE-WITH-AUTHOR-SLUG-1

  REPLACE-WITH-AUTHOR-SLUG-2

articles/

  REPLACE-WITH-ARTICLE-SLUG-1

  REPLACE-WITH-ARTICLE-SLUG-2

  REPLACE-WITH-ARTICLE-SLUG-3

  REPLACE-WITH-ARTICLE-SLUG-4

categories/

  nyheter

  guide

```

## Verification

The following has been verified in Storyblok:

- The `author` content type exists with `name`, `bio`, and `photo`.

- The `article` content type exists with `title`, `summary`, `content`, `category`, and `author`.

- The `category` field uses the `article-categories` datasource.

- The `author` field references author stories.

- At least two author stories exist.

- At least four article stories exist.

- Articles are connected to authors.

- Articles use at least two different categories.

- Category stories exist for each datasource value.

## Ownership

Josef created and verified the Storyblok foundation.

This content model is the foundation for the Next.js routes:

```text

/articles

/articles/[slug]

/authors/[slug]

/categories/[slug]

`)