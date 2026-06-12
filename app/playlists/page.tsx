'use client'

import { useState } from 'react';
import { useLibraryStore } from '@/store/libraryStore';
import { motion } from 'framer-motion';
import { Plus, ListMusic, Heart, Play } from 'lucide-react';
import Image from 'next/image';
import { usePlayerStore } from '@/store/playerStore';

export default function PlaylistsPage() {
  const { playlists, likedSongs, createPlaylist } = useLibraryStore();
  const { setCurrentSong } = usePlayerStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      createPlaylist(newTitle.trim());
      setNewTitle('');
      setIsCreating(false);
    }
  };

  const handlePlayLiked = () => {
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
      // Ideally we should set the whole queue here
    }
  };

  return (
    <div className="p-4 md:p-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Library</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full hover:scale-105 transition-transform text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">New Playlist</span>
        </button>
      </div>

      {isCreating && (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreate} 
          className="mb-8 p-4 bg-card/50 rounded-xl border border-white/5 flex gap-4"
        >
          <input
            autoFocus
            type="text"
            placeholder="Playlist name..."
            className="flex-1 bg-background border border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90">Create</button>
          <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-muted-foreground hover:text-foreground">Cancel</button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Liked Songs Special Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-xl p-6 flex flex-col justify-end min-h-[200px] cursor-pointer group relative overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Heart className="fill-white w-8 h-8" />
              Liked Songs
            </h2>
            <p className="text-white/80 font-medium">{likedSongs.length} songs</p>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handlePlayLiked(); }}
            className="absolute bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 z-20"
          >
            <Play className="w-6 h-6 text-black fill-black ml-1" />
          </button>
        </motion.div>

        {/* Custom Playlists */}
        {playlists.map((playlist, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={playlist.id} 
            className="bg-card/30 hover:bg-card/80 p-4 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-white/5"
          >
            <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center relative overflow-hidden shadow-md">
              {playlist.thumbnails?.length > 0 ? (
                <Image src={playlist.thumbnails[0].url} alt={playlist.title} fill className="object-cover" />
              ) : (
                <ListMusic className="w-12 h-12 text-muted-foreground/30" />
              )}
              <button 
                className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg hover:scale-105 z-20"
              >
                <Play className="w-4 h-4 text-primary-foreground fill-current ml-1" />
              </button>
            </div>
            <div className="font-semibold text-lg truncate">{playlist.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{playlist.songCount} songs</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
