import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

function formatCategoryName(category) {
	return category
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export default function CategoryPage({ blok }) {
	const title = blok.title || formatCategoryName(blok.category);
	const body = blok.body?.length
		? blok.body
		: [
				{
					_uid: `filtered-posts-${blok.category}`,
					component: 'filtered-posts',
				},
			];

	return (
		<main className="category-page" {...storyblokEditable(blok)}>
			<section className="category-intro">
				<p className="eyebrow">Kategori</p>
				<h1>{title}</h1>
			</section>

			{body.map((nestedBlok) => (
				<StoryblokServerComponent
					blok={
						nestedBlok.component === 'filtered-posts'
							? { ...nestedBlok, category: blok.category }
							: nestedBlok
					}
					key={nestedBlok._uid}
				/>
			))}
		</main>
	);
}
