// Location: app/layout.tsx
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Garage Sound | Inventario',
  description: 'Inventario de componentes para audio automotriz',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="site-nav">
          <Link href="/" className="brand-mark">
            <span className="brand-mark__dot" />
            <span>GARAGE<span className="brand-mark__accent">/</span>SOUND</span>
          </Link>
          <div className="nav-status"><span className="status-dot" /> Sistema operativo</div>
        </nav>
        {children}
      </body>
    </html>
  );
}