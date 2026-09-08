import Link from 'next/link';

export default function SiteHeader() {
	return (
		<header>
			<nav>
				<Link href="/">Nättidning</Link>

				<div>
					<Link href="/">Start</Link>

					<details>
						<summary>Artiklar</summary>
						<div>
							<Link href="/articles">Alla artiklar</Link>
							<Link href="/categories/nyheter">Nyheter</Link>
							<Link href="/categories/guide">Guide</Link>
						</div>
					</details>

				</div>
			</nav>
		</header>
	);
}