import Link from 'next/link';
import { colors } from '@/theme';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b" style={{ borderColor: colors.light }}>
        <h2 className="text-xl font-bold">PfotenCard</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/customers" className="block p-2 hover:bg-gray-100 rounded">
              Kunden
            </Link>
          </li>
          <li>
            <Link href="/scan" className="block p-2 hover:bg-gray-100 rounded">
              Scanner
            </Link>
          </li>
          <li>
            <Link href="/transactions" className="block p-2 hover:bg-gray-100 rounded">
              Transaktionen
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
