import Link from 'next/link';

export default function SiteHeader() {
	return (
		<header>
			<nav>
				<Link href="/">Nättidning</Link>

				<div>
					<Link href="/">Start</Link>
					<Link href="/articles">Artiklar</Link>
					<Link href="/categories/nyheter">Nyheter</Link>
					<Link href="/categories/guide">Guide</Link>
				</div>
			</nav>
		</header>
	);
}