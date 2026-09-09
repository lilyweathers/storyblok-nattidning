import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import EmptyState from '@/components/EmptyState';
import { getStories } from '@/lib/storyblokData';

export default async function HomePage() {
	let articles = [];

	try {
		articles = await getStories({
			content_type: 'article',
			starts_with: 'articles/',
			resolve_relations: 'article.author',
			sort_by: 'first_published_at:desc',
			per_page: 3,
		});
	} catch (error) {
		console.error('Kunde inte hämta artiklar till startsidan:', error);
	}

	return (
		<main className="home-page">
			<section className="home-hero">
				<p className="eyebrow">Nättidning</p>
				<h1>Teknik som går att förstå.</h1>
				<p className="home-lead">
					Nyheter, guider och perspektiv om webben – skrivna för dig som vill
					förstå vad som händer och varför det spelar roll.
				</p>
				<div className="home-actions">
					<Link href="/articles">Läs alla artiklar</Link>
					<Link className="button-secondary" href="/categories/guide">
						Utforska guider
					</Link>
				</div>
			</section>

			<section className="home-latest">
				<div className="section-heading">
					<div>
						<p className="eyebrow">Senast publicerat</p>
						<h2>Nya artiklar</h2>
					</div>
					<Link href="/articles">Visa alla</Link>
				</div>

				{articles.length === 0 ? (
					<EmptyState
						title="Inga artiklar hittades"
						message="Kom tillbaka snart för nya artiklar och guider."
					/>
				) : (
					<div className="article-list home-article-list">
						{articles.map((article) => {
							const author = Array.isArray(article.content.author)
								? article.content.author[0]
								: article.content.author;

							return (
								<ArticleCard
									key={article.uuid}
									title={article.content.title}
									summary={article.content.summary}
									category={article.content.category}
									author={author?.content?.name}
									href={`/articles/${article.slug}`}
								/>
							);
						})}
					</div>
				)}
			</section>

			<section className="home-categories">
				<p className="eyebrow">Hitta rätt innehåll</p>
				<h2>Utforska efter ämne</h2>
				<div className="category-links">
					<Link href="/categories/nyheter">
						<strong>Nyheter</strong>
						<span>Det senaste inom webb och digital utveckling.</span>
					</Link>
					<Link href="/categories/guide">
						<strong>Guider</strong>
						<span>Praktiska råd som hjälper dig att komma vidare.</span>
					</Link>
				</div>
			</section>
		</main>
	);
}
