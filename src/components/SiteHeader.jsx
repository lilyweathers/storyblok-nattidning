import Link from 'next/link';

export default function SiteHeader() {
	return (
		<header>
			<nav>
				<Link href="/">Nättidning</Link>

				<div>
					<Link href="/">Start</Link>

					<details name="main-navigation">
						<summary>Artiklar</summary>
						<div>
							<Link href="/articles">Alla artiklar</Link>
							<Link href="/categories/nyheter">Nyheter</Link>
							<Link href="/categories/guide">Guide</Link>
						</div>
					</details>

					<details name="main-navigation">
						<summary>Authors</summary>
						<div>
							<Link href="/authors">Alla författare</Link>
							<Link href="/authors/erik-lind">Erik Lind</Link>
							<Link href="/authors/anna-berg">Anna Berg</Link>
						</div>
					</details>

				</div>
			</nav>
		</header>
	);
}