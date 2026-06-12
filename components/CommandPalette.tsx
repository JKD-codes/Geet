'use client'

import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { Search, Home, Library, Play, Plus } from 'lucide-react';
import { useLibraryStore } from '@/store/libraryStore';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { playlists } = useLibraryStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-32">
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <Command label="Global Command Menu" className="flex flex-col">
          <div className="flex items-center px-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground mr-2" />
            <Command.Input 
              autoFocus
              placeholder="Type a command or search..." 
              className="flex-1 h-14 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <kbd className="hidden md:inline-flex bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-mono font-medium">ESC</kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-muted-foreground text-sm">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/'))}
                className="flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm text-foreground transition-colors aria-selected:bg-accent"
              >
                <Home className="w-4 h-4" /> Go to Home
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/search'))}
                className="flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm text-foreground transition-colors aria-selected:bg-accent"
              >
                <Search className="w-4 h-4" /> Search Music
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/playlists'))}
                className="flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm text-foreground transition-colors aria-selected:bg-accent"
              >
                <Library className="w-4 h-4" /> Your Library
              </Command.Item>
            </Command.Group>

            {playlists.length > 0 && (
              <Command.Group heading="Playlists" className="text-xs font-medium text-muted-foreground px-2 py-1 mt-4">
                {playlists.map((playlist) => (
                  <Command.Item 
                    key={playlist.id}
                    onSelect={() => runCommand(() => router.push(`/playlists`))}
                    className="flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm text-foreground transition-colors aria-selected:bg-accent"
                  >
                    <Play className="w-4 h-4" /> Play {playlist.title}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Actions" className="text-xs font-medium text-muted-foreground px-2 py-1 mt-4">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/playlists'))}
                className="flex items-center gap-2 px-2 py-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm text-foreground transition-colors aria-selected:bg-accent"
              >
                <Plus className="w-4 h-4" /> Create new playlist
              </Command.Item>
            </Command.Group>

          </Command.List>
        </Command>
      </div>
      
      {/* Invisible backdrop click catcher */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
    </div>
  );
}
