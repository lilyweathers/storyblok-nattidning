export default function SiteFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<p>© {currentYear} Nättidning. Alla rättigheter förbehållna.</p>
		</footer>
	);
}
