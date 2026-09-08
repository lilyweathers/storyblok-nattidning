export default function EmptyState({ title, message }) {
	return (
		<section className="empty-state">
			<h2>{title}</h2>
			<p>{message}</p>
		</section>
	);
}