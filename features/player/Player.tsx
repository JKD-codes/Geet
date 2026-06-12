'use client'

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import { LyricsPanel } from '@/features/lyrics/LyricsPanel';
import ReactPlayer from 'react-player';

export function Player() {
  const { currentSong, isPlaying, volume, togglePlayPause, playNext, playPrevious, setVolume } = usePlayerStore();
  const playerRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(val, 'seconds');
      setProgress(val);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-16 md:bottom-0 w-full h-16 md:h-24 bg-card/80 backdrop-blur-lg border-t border-white/5 flex items-center justify-between px-2 md:px-6 z-50">
      
      {currentSong && (
        <ReactPlayer
          ref={playerRef}
          {...({
            src: `https://www.youtube.com/watch?v=${currentSong.videoId}`,
            playing: isPlaying,
            volume: volume / 100,
            onProgress: (state: any) => setProgress(state.playedSeconds),
            onDuration: (d: any) => setDuration(d),
            onEnded: playNext,
            width: "0",
            height: "0",
            style: { display: 'none' },
            config: {
              youtube: {
                playerVars: { showinfo: 0, controls: 0 }
              }
            }
          } as any)}
        />
      )}

      {/* Left: Song Info */}
      <div 
        className="flex items-center gap-2 md:gap-4 w-1/2 md:w-1/3 min-w-0 cursor-pointer hover:bg-white/5 rounded-md p-1 transition-colors -ml-1"
        onClick={() => setIsExpanded(true)}
      >
        {currentSong ? (
          <>
            <div className="relative w-10 h-10 md:w-14 md:h-14 bg-muted rounded-md shrink-0 shadow-md overflow-hidden">
               {currentSong.thumbnails?.length > 0 && (
                 <Image src={currentSong.thumbnails[currentSong.thumbnails.length - 1].url} alt="Cover" fill className="object-cover" />
               )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-xs md:text-sm truncate hover:underline cursor-pointer">{currentSong.title}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground truncate hover:underline cursor-pointer">
                {currentSong.artists?.map(a => a.name).join(', ')}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-card rounded-md border border-white/5 shrink-0" />
            <div>
              <div className="font-medium text-xs md:text-sm text-muted-foreground">No song</div>
            </div>
          </>
        )}
      </div>
      
      {/* Center: Controls */}
      <div className="flex-1 max-w-2xl flex flex-col items-end md:items-center justify-center gap-2">
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors"><Shuffle className="w-4 h-4" /></button>
          <button onClick={playPrevious} className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          
          <button 
            onClick={togglePlayPause}
            disabled={!currentSong}
            className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>
          
          <button onClick={playNext} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors"><Repeat className="w-4 h-4" /></button>
        </div>

        <div className="hidden md:flex w-full items-center gap-3 text-xs text-muted-foreground font-mono">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <input 
            type="range" 
            min={0} 
            max={duration || 100} 
            value={progress} 
            onChange={handleSeek}
            disabled={!currentSong}
            className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
          />
          <span className="w-10">{formatTime(duration || (currentSong?.durationSeconds ?? 0))}</span>
        </div>
      </div>
      
      {/* Right: Volume */}
      <div className="hidden md:flex w-1/3 justify-end items-center gap-3">
        <button onClick={() => setVolume(volume === 0 ? 100 : 0)} className="text-muted-foreground hover:text-foreground">
          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input 
          type="range" 
          min={0} max={100} 
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
        />
        <button onClick={() => setIsExpanded(true)} className="text-muted-foreground hover:text-foreground hidden md:block">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      <LyricsPanel isExpanded={isExpanded} onClose={() => setIsExpanded(false)} />
    </div>
  );
}
