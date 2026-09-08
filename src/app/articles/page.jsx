import { getStories } from '@/lib/storyblokData';
import ArticleCard from '@/components/ArticleCard';

export default async function ArticlesPage() {
	const articles = await getStories({
		content_type: 'article',
		starts_with: 'articles/',
		resolve_relations: 'article.author',
	});

	return (
		<main className="page-shell">
			<section className="content-panel">
				<p className="eyebrow">Nättidning</p>
				<h1>Artiklar</h1>

				{articles.length === 0 ? (
					<p>Inga artiklar hittades.</p>
				) : (
					<div>
						{articles.map((article) => {
							const content = article.content;
							const author = Array.isArray(content.author)
								? content.author[0]
								: content.author;

							return (
								<ArticleCard
									key={article.uuid}
									title={content.title}
									summary={content.summary}
									category={content.category}
									author={author?.content?.name}
									href={`/articles/${article.slug}`}
								/>
							);
						})}
					</div>
				)}
			</section>
		</main>
	);
}