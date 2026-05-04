import PrivacyPage from './privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Marin County Building Permits',
  description: 'Privacy policy for the Marin County Building Permits portal. Learn how we handle public records data and your information.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Marin County Building Permits',
    description: 'Privacy policy for the Marin County Building Permits portal.',
    type: 'website',
  },
};

export default function Page() {
  return <PrivacyPage />;
}