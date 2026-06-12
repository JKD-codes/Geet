import Link from 'next/link';
import { Home, Search, Library, ListMusic } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-card/30 border-r flex-col p-6 h-full backdrop-blur-md">
      <Link href="/" className="text-2xl font-bold mb-10 tracking-tighter text-primary flex items-center gap-2">
        <ListMusic className="w-8 h-8" />
        Geet
      </Link>
      
      <nav className="flex-1 space-y-6">
        <div>
          <div className="font-semibold text-muted-foreground text-xs uppercase mb-3 tracking-wider">Discover</div>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="flex items-center gap-3 p-2 text-foreground hover:text-primary transition-colors rounded-md font-medium">
                <Home className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="flex items-center gap-3 p-2 text-foreground hover:text-primary transition-colors rounded-md font-medium">
                <Search className="w-5 h-5" />
                Search
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <div className="font-semibold text-muted-foreground text-xs uppercase mb-3 tracking-wider">Library</div>
          <ul className="space-y-1">
            <li>
              <Link href="/playlists" className="flex items-center gap-3 p-2 text-foreground hover:text-primary transition-colors rounded-md font-medium">
                <Library className="w-5 h-5" />
                Playlists
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
