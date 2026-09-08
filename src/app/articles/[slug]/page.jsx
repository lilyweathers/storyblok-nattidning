import { notFound } from 'next/navigation';
import { StoryblokServerRichText } from '@storyblok/react/rsc';
import CategoryBadge from '@/components/CategoryBadge';
import { getStory } from '@/lib/storyblokData';

export default async function ArticleDetailPage({ params }) {
	const { slug } = await params;

	try {
		const article = await getStory(`articles/${slug}`, {
			resolve_relations: 'article.author',
		});

		const content = article.content;
		const author = content.author;

		return (
			<main className="article-detail">
				<article>
					<div className="article-detail-meta">
						<CategoryBadge>{content.category}</CategoryBadge>
						{author?.content?.name && (
							<span>Skriven av {author.content.name}</span>
						)}
					</div>

					<h1>{content.title}</h1>
					<p className="article-detail-summary">{content.summary}</p>

					<div className="article-detail-content">
						<StoryblokServerRichText doc={content.content} />
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