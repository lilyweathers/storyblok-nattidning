import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getSiteUrl } from '@/lib/siteUrl';

export const metadata = {
	metadataBase: new URL(getSiteUrl()),
	title: {
		default: 'Nättidning',
		template: '%s | Nättidning',
	},
	description: 'Nättidning - Din lokala nyhetsportal',
	alternates: {
		canonical: '/',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="sv">
			<body>
				<StoryblokProvider>
					<SiteHeader />
					{children}
					<SiteFooter />
				</StoryblokProvider>
			</body>
		</html>
	);
}
