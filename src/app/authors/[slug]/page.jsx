import Image from 'next/image';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import { getStories, getStory } from '@/lib/storyblokData';

export async function generateStaticParams() {
	try {
		const authors = await getStories({
			content_type: 'author',
			starts_with: 'authors/',
		});

		return authors.map((author) => ({
			slug: author.slug,
		}));
	} catch {
		return [];
	}
}

export default async function AuthorPage({ params }) {
	const { slug } = await params;

	try {
		const author = await getStory(`authors/${slug}`);
		const articles = await getStories({
			content_type: 'article',
			starts_with: 'articles/',
			filter_query: {
				author: {
					in: author.uuid,
				},
			},
			sort_by: 'first_published_at:desc',
		});
		const { name, bio, photo } = author.content;

		if (!name) {
			return (
				<main>
					<EmptyState
						title="Författaren saknar innehåll"
						message="Författarprofilen finns i Storyblok men behöver ett namn innan den kan visas."
					/>
				</main>
			);
		}

		return (
			<main className="author-page">
				<section className="author-profile">
					<div className="author-profile-layout">
						{photo?.filename ? (
							<Image
								className="author-photo"
								src={photo.filename}
								alt={photo.alt || `Porträtt av ${name}`}
								width={640}
								height={640}
								sizes="(max-width: 720px) 100vw, 320px"
								priority
							/>
						) : (
							<div className="author-photo-placeholder" aria-hidden="true">
								{name.charAt(0)}
							</div>
						)}

						<div>
							<p className="eyebrow">Författare</p>
							<h1>{name}</h1>
							{bio && <p className="author-bio">{bio}</p>}
						</div>
					</div>
				</section>

				<section className="author-articles" aria-labelledby="author-articles-title">
					<h2 id="author-articles-title">Artiklar av {name}</h2>

					{articles.length > 0 ? (
						<div className="author-article-list">
							{articles.map((article) => (
								<ArticleCard
									key={article.uuid}
									title={article.content.title}
									summary={article.content.summary}
									category={article.content.category}
									href={`/articles/${article.slug}`}
								/>
							))}
						</div>
					) : (
						<EmptyState
							title="Inga artiklar ännu"
							message={`${name} har inga publicerade artiklar just nu.`}
						/>
					)}
				</section>
			</main>
		);
	} catch (error) {
		if (error.status === 404 || error.response?.status === 404) {
			notFound();
		}

		throw error;
	}
}
