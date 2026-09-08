import EmptyState from '@/components/EmptyState';

export default function LoadingArticle() {
	return (
		<main>
			<EmptyState
				title="Laddar artikel"
				message="Artikeln hämtas från Storyblok."
			/>
		</main>
	);
}
