import DesktopSidebar from '@/components/sidebar/DesktopSidebar';
import MobileSidebar from '@/components/sidebar/MobileSidebar';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <DesktopSidebar />
        <MobileSidebar />

        <main className="min-h-screen md:pl-72">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-20 md:px-8 md:pt-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}