import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
	title: 'Nättidning',
	description: 'Nättidning - Din lokala nyhetsportal',
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
