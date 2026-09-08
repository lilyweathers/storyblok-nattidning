import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Link from 'next/link';

const Page = ({ blok }) => (
	<main className="page-shell" {...storyblokEditable(blok)}>
		{blok.body?.length ? (
			blok.body.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))
		) : (
			<section className="home-hero">
				<p className="eyebrow">Senaste nytt</p>
				<h1>Nättidning</h1>
				<p>En nyhetssida byggd med Next.js och Storyblok.</p>
				<Link className="primary-link" href="/articles">
					Gå till artiklar
				</Link>
			</section>
		)}
	</main>
);

export default Page;
