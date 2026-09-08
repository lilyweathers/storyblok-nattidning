import Link from 'next/link';

export default function SiteHeader() {
	return (
		<header className="site-header">
			<nav className="site-nav" aria-label="Huvudnavigation">
				<Link className="site-brand" href="/">
					Nättidning
				</Link>

				<div className="site-nav-links">
					<Link href="/">Start</Link>

					<details className="site-menu" name="main-navigation">
						<summary>Artiklar</summary>
						<div className="site-submenu">
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
