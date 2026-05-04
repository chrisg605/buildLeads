import TermsPage from './terms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Marin County Building Permits',
  description: 'Terms of Service for the Marin County Building Permits portal. Learn about permitted uses, restrictions, and liability.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | Marin County Building Permits',
    description: 'Terms of Service for the Marin County Building Permits portal.',
    type: 'website',
  },
};

export default function Page() {
  return <TermsPage />;
}