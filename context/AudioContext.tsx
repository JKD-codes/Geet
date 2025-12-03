import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Song, PlayerState, RepeatMode } from '../types';

interface AudioContextType extends PlayerState {
  playSong: (song: Song, contextQueue?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Local Storage Keys
const LS_KEY_LAST_SONG = 'spotify_clone_last_song';
const LS_KEY_VOLUME = 'spotify_clone_volume';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  
  // State
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  const [queue, setQueue] = useState<Song[]>([]);
  const [history, setHistory] = useState<Song[]>([]);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedSong = localStorage.getItem(LS_KEY_LAST_SONG);
    const savedVolume = localStorage.getItem(LS_KEY_VOLUME);

    if (savedSong) {
      try {
        const parsedSong = JSON.parse(savedSong);
        setCurrentSong(parsedSong);
        audioRef.current.src = parsedSong.audioUrl;
        // Don't auto-play on load, just restore state
      } catch (e) {
        console.error("Failed to parse saved song", e);
      }
    }

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
      audioRef.current.volume = vol;
    }
    
    // Setup Audio Event Listeners
    const audio = audioRef.current;
    
    const updateTime = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => nextSongRef.current(); // Use ref to avoid stale closure

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Persist current song
  useEffect(() => {
    if (currentSong) {
      localStorage.setItem(LS_KEY_LAST_SONG, JSON.stringify(currentSong));
    }
  }, [currentSong]);

  // Persist volume
  const setVolume = (vol: number) => {
    setVolumeState(vol);
    audioRef.current.volume = vol;
    localStorage.setItem(LS_KEY_VOLUME, vol.toString());
  };

  // Media Session API Support
  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: [
          { src: currentSong.coverImage, sizes: '300x300', type: 'image/jpeg' },
          { src: currentSong.coverImage, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => togglePlay());
      navigator.mediaSession.setActionHandler('previoustrack', () => prevSong());
      navigator.mediaSession.setActionHandler('nexttrack', () => nextSong());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          seekTo(details.seekTime);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]); // Update metadata when song changes

  // Update Media Session Playback State
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  // Player Actions
  const playSong = (song: Song, contextQueue?: Song[]) => {
    if (contextQueue) {
      setQueue(contextQueue);
    } else if (queue.length === 0) {
       // If no queue exists, make a single song queue
       setQueue([song]);
    }

    if (currentSong && currentSong.id !== song.id) {
       setHistory(prev => [...prev, currentSong]);
    }

    setCurrentSong(song);
    setIsPlaying(true);
    
    const audio = audioRef.current;
    audio.src = song.audioUrl;
    audio.play().catch(e => console.error("Playback failed:", e));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentSong) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (isFinite(time)) {
        audio.currentTime = time;
        setProgress(time);
    }
  };

  // Helper to get random index
  const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

  const nextSong = useCallback(() => {
    if (!currentSong || queue.length === 0) return;

    let nextIndex = -1;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);

    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    if (isShuffle) {
      nextIndex = getRandomIndex(queue.length);
      // Ensure we don't pick the exact same song unless it's the only one
      if (nextIndex === currentIndex && queue.length > 1) {
        nextIndex = (nextIndex + 1) % queue.length;
      }
    } else {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex >= queue.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        // End of playlist, stop
        setIsPlaying(false);
        return;
      }
    }

    const nextTrack = queue[nextIndex];
    playSong(nextTrack);
  }, [currentSong, queue, isShuffle, repeatMode]);

  const prevSong = useCallback(() => {
    const audio = audioRef.current;
    // If we are more than 3 seconds in, just restart the song
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (history.length > 0) {
       const previous = history[history.length - 1];
       setHistory(prev => prev.slice(0, -1));
       playSong(previous);
       return;
    }

    // Fallback to previous in queue logic if no history
    if (!currentSong || queue.length === 0) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex >= 0) {
      playSong(queue[prevIndex]);
    } else {
       // Loop back to end if needed, or stop
       if (repeatMode === 'all') {
         playSong(queue[queue.length - 1]);
       } else {
         audio.currentTime = 0;
       }
    }
  }, [currentSong, queue, history, repeatMode]);

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'all';
      if (prev === 'all') return 'one';
      return 'none';
    });
  };

  // Ref for nextSong to use in event listener
  const nextSongRef = useRef(nextSong);
  useEffect(() => {
    nextSongRef.current = nextSong;
  }, [nextSong]);

  return (
    <AudioContext.Provider value={{
      currentSong,
      isPlaying,
      volume,
      progress,
      duration,
      isShuffle,
      repeatMode,
      queue,
      history,
      playSong,
      togglePlay,
      nextSong,
      prevSong,
      seekTo,
      setVolume,
      toggleShuffle,
      toggleRepeat
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};