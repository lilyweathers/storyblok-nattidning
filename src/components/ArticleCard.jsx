import Link from 'next/link';
import CategoryBadge from '@/components/CategoryBadge';

export default function ArticleCard({ title, summary, category, author, href }) {
	return (
		<article className="article-card">
			<div className="article-card-meta">
				<CategoryBadge>{category}</CategoryBadge>
				{author && <span>{author}</span>}
			</div>

			<h2>
				<Link href={href}>{title}</Link>
			</h2>

			<p>{summary}</p>
		</article>
	);
}