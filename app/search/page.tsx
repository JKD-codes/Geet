'use client'

import { useState, useEffect } from 'react';
import { useSearchMusic } from '@/hooks/useMusic';
import { usePlayerStore } from '@/store/playerStore';
import { Search as SearchIcon, Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { ISong } from '@/types/music';
import { motion } from 'framer-motion';
import { useLibraryStore } from '@/store/libraryStore';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { data: results, isLoading } = useSearchMusic(debouncedQuery, 'songs');
  const { setCurrentSong, addToQueue } = usePlayerStore();
  const { toggleLikeSong, isLiked } = useLibraryStore();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handlePlay = (song: any) => {
    const formattedSong: ISong = {
      videoId: song.videoId,
      title: song.title,
      artists: song.artists,
      album: song.album,
      duration: song.duration,
      durationSeconds: song.duration_seconds,
      thumbnails: song.thumbnails,
    };
    setCurrentSong(formattedSong);
  };

  return (
    <div className="p-8 pb-32">
      <div className="relative max-w-2xl mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full bg-card/50 border border-border rounded-full py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && query.length > 0 && (
        <div className="text-muted-foreground animate-pulse">Searching...</div>
      )}

      {results && results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Songs</h2>
          <div className="flex flex-col gap-2">
            {results.map((song: any, index: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={song.videoId} 
                className="flex items-center gap-4 p-2 rounded-md hover:bg-card/60 transition-colors group"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 bg-muted">
                  {song.thumbnails && song.thumbnails.length > 0 && (
                    <Image 
                      src={song.thumbnails[song.thumbnails.length - 1].url} 
                      alt={song.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <button 
                    onClick={() => handlePlay(song)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-6 h-6 text-white fill-white" />
                  </button>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm md:text-base truncate text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => handlePlay(song)}>
                    {song.title}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate">
                    {song.artists?.map((a: any) => a.name).join(', ')}
                  </div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleLikeSong(song); }}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Heart className={`w-5 h-5 ${isLiked(song.videoId) ? 'fill-primary text-primary' : ''}`} />
                </button>

                <div className="text-xs md:text-sm text-muted-foreground w-12 text-right">
                  {song.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
