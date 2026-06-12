'use client'

import { useLyrics } from '@/hooks/useLyrics';
import { usePlayerStore } from '@/store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';

interface ExpandedPlayerProps {
  isExpanded: boolean;
  onClose: () => void;
  progress: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (time: number) => string;
}

export function ExpandedPlayer({ isExpanded, onClose, progress, duration, onSeek, formatTime }: ExpandedPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const { currentSong, isPlaying, togglePlayPause, playNext, playPrevious } = usePlayerStore();
  
  const { data: lyrics, isLoading } = useLyrics({
    trackName: currentSong?.title,
    artistName: currentSong?.artists?.[0]?.name,
    duration: currentSong?.durationSeconds,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isExpanded || !currentSong) return null;

  return createPortal(
    <AnimatePresence>
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-center p-8 pb-32 pt-20"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 mb-8 md:mb-0">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={currentSong.thumbnails?.[currentSong.thumbnails.length - 1]?.url} 
                alt="Album Cover" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="text-center w-full max-w-sm px-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white truncate">{currentSong.title}</h2>
              <p className="text-lg md:text-xl text-white/60 mt-1 truncate">{currentSong.artists?.map(a => a.name).join(', ')}</p>
            </div>

            {/* Playback Controls (Mobile mainly, but useful on desktop too) */}
            <div className="w-full max-w-sm px-4 flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
                <span className="w-10 text-right">{formatTime(progress)}</span>
                <input 
                  type="range" 
                  min={0} 
                  max={duration || 100} 
                  value={progress} 
                  onChange={onSeek}
                  className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
                <span className="w-10">{formatTime(duration)}</span>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-2">
                <button onClick={playPrevious} className="text-white/70 hover:text-white transition-colors">
                  <SkipBack className="w-8 h-8 fill-current" />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
                <button onClick={playNext} className="text-white/70 hover:text-white transition-colors">
                  <SkipForward className="w-8 h-8 fill-current" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-full flex flex-col items-center md:items-start justify-center overflow-y-auto px-4 md:px-12 scrollbar-hide">
            {isLoading ? (
              <div className="animate-pulse text-white/40 text-xl font-medium">Searching for lyrics...</div>
            ) : lyrics?.syncedLyrics ? (
              <div className="space-y-6 text-center md:text-left text-2xl md:text-4xl font-bold tracking-tight leading-tight text-white/80">
                {/* For v1, we just display plain lyrics if synced isn't parsed into timing yet, but LRCLIB gives plainLyrics too */}
                <pre className="font-sans whitespace-pre-wrap">{lyrics.plainLyrics}</pre>
              </div>
            ) : lyrics?.plainLyrics ? (
              <div className="space-y-6 text-center md:text-left text-xl md:text-2xl font-semibold tracking-tight leading-relaxed text-white/80 whitespace-pre-wrap">
                {lyrics.plainLyrics}
              </div>
            ) : (
              <div className="text-white/40 text-xl font-medium text-center">
                Looks like we don't have lyrics for this song.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
