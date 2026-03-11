import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IntroSplash from "@/components/layout/intro-splash";
import PublicMotionShell from "@/components/motion/public-motion-shell";
import AppDownloadWidget from "@/components/layout/app-download-widget";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <IntroSplash />
            <Navbar />
            <main className="flex-1">
                <PublicMotionShell>{children}</PublicMotionShell>
            </main>
            <Footer />
            <AppDownloadWidget />
        </div>
    );
}
