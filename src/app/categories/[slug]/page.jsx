export default async function CategoryPage({ params }) {
	const { slug } = await params;

	return (
		<main>
			<h1>Kategori: {slug}</h1>
			<p>Här kommer artiklar för kategorin att visas.</p>
		</main>
	);
}