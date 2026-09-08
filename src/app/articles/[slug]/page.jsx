export default async function ArticleDetailPage({ params }) {
	const { slug } = await params;

	return (
		<main>
			<h1>Artikel: {slug}</h1>
			<p>Här kommer artikelns innehåll från Storyblok.</p>
		</main>
	);
}
