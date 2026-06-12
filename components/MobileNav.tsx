'use client'

import Link from 'next/link';
import { Home, Search, Library } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-[96px] w-full h-16 bg-card/90 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-4 z-40">
      <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link href="/search" className={`flex flex-col items-center gap-1 ${pathname === '/search' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-medium">Search</span>
      </Link>
      <Link href="/playlists" className={`flex flex-col items-center gap-1 ${pathname === '/playlists' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
        <Library className="w-6 h-6" />
        <span className="text-[10px] font-medium">Library</span>
      </Link>
    </nav>
  );
}
