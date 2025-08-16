import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { colors } from '@/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={{ backgroundColor: colors.light }}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
