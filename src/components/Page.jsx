import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Link from 'next/link';

const Page = ({ blok }) => (
	<main {...storyblokEditable(blok)}>
		{blok.body?.length ? (
			blok.body.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))
		) : (
			<section>
				<h1>Nättidning</h1>
				<p>En nyhetssida byggd med Next.js och Storyblok.</p>
				<Link href="/articles">Gå till artiklar</Link>
			</section>
		)}
	</main>
);

export default Page;