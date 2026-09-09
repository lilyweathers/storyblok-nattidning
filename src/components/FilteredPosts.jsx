import { storyblokEditable } from '@storyblok/react/rsc';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import { getStories } from '@/lib/storyblokData';

export default async function FilteredPosts({ blok }) {
	const articles = await getStories({
		content_type: 'article',
		starts_with: 'articles/',
		resolve_relations: 'article.author',
		filter_query: {
			category: {
				in: blok.category,
			},
		},
		sort_by: 'first_published_at:desc',
	});

	return (
		<section className="filtered-posts" {...storyblokEditable(blok)}>
			<h2>{blok.heading || 'Senaste artiklarna'}</h2>

			{articles.length > 0 ? (
				<div className="filtered-post-list">
					{articles.map((article) => {
						const { title, summary, category, author: authorField } =
							article.content;
						const author = Array.isArray(authorField)
							? authorField[0]
							: authorField;

						return (
							<ArticleCard
								key={article.uuid}
								title={title}
								summary={summary}
								category={category}
								author={author?.content?.name}
								href={`/articles/${article.slug}`}
							/>
						);
					})}
				</div>
			) : (
				<EmptyState
					title="Inga artiklar i kategorin"
					message={
						blok.empty_text ||
						'Det finns inga publicerade artiklar i den här kategorin ännu.'
					}
				/>
			)}
		</section>
	);
}
