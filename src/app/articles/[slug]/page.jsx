import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StoryblokServerRichText } from '@storyblok/react/rsc';
import CategoryBadge from '@/components/CategoryBadge';
import EmptyState from '@/components/EmptyState';
import { getStories, getStory } from '@/lib/storyblokData';

export async function generateMetadata({ params }) {
	const { slug } = await params;

	try {
		const article = await getStory(`articles/${slug}`);
		const content = article.content;

		return {
			title: content.title,
			description: content.summary,
		};
	} catch {
		return {
			title: 'Artikel saknas',
		};
	}
}

export async function generateStaticParams() {
	try {
		const articles = await getStories({
			content_type: 'article',
			starts_with: 'articles/',
		});

		return articles.map((article) => ({
			slug: article.slug,
		}));
	} catch {
		return [];
	}
}

export default async function ArticleDetailPage({ params }) {
	const { slug } = await params;

	try {
		const article = await getStory(`articles/${slug}`, {
			resolve_relations: 'article.author',
		});

		const content = article.content;
		const author = Array.isArray(content.author)
			? content.author[0]
			: content.author;
		const authorSlug = author?.slug || author?.full_slug?.replace('authors/', '');

		if (!content.title || !content.content) {
			return (
				<main>
					<EmptyState
						title="Artikeln saknar innehåll"
						message="Den här artikeln finns i Storyblok men behöver titel och innehåll innan den kan visas."
					/>
				</main>
			);
		}

		return (
			<main className="article-detail">
				<article>
					<div className="article-detail-meta">
						<CategoryBadge>{content.category}</CategoryBadge>
						{author?.content?.name && authorSlug && (
							<span>
								Skriven av{' '}
								<Link href={`/authors/${authorSlug}`}>{author.content.name}</Link>
							</span>
						)}
					</div>

					<h1>{content.title}</h1>
					<p className="article-detail-summary">{content.summary}</p>

					<div className="article-detail-content">
						<StoryblokServerRichText document={content.content} />
					</div>
				</article>
			</main>
		);
	} catch (error) {
		if (error.status === 404 || error.response?.status === 404) {
			notFound();
		}

		throw error;
	}
}
