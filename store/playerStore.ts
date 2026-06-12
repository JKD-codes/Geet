import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ISong } from '@/types/music'

interface PlayerState {
  currentSong: ISong | null
  queue: ISong[]
  history: ISong[]
  isPlaying: boolean
  volume: number
  isMuted: boolean
  shuffle: boolean
  repeat: 'off' | 'all' | 'one'

  // Actions
  setCurrentSong: (song: ISong) => void
  addToQueue: (song: ISong) => void
  removeFromQueue: (videoId: string) => void
  clearQueue: () => void
  playNext: () => void
  playPrevious: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  togglePlayPause: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentSong: null,
      queue: [],
      history: [],
      isPlaying: false,
      volume: 100,
      isMuted: false,
      shuffle: false,
      repeat: 'off',

      setCurrentSong: (song) => set((state) => {
        const history = state.currentSong 
          ? [state.currentSong, ...state.history].slice(0, 50) 
          : state.history;
        return { currentSong: song, isPlaying: true, history }
      }),
      
      addToQueue: (song) => set((state) => ({ queue: [...state.queue, song] })),
      
      removeFromQueue: (videoId) => set((state) => ({ 
        queue: state.queue.filter(s => s.videoId !== videoId) 
      })),
      
      clearQueue: () => set({ queue: [] }),
      
      playNext: () => set((state) => {
        if (state.queue.length === 0) return state;
        const nextSong = state.queue[0];
        const newQueue = state.queue.slice(1);
        const history = state.currentSong 
          ? [state.currentSong, ...state.history].slice(0, 50) 
          : state.history;
        return { currentSong: nextSong, queue: newQueue, history };
      }),
      
      playPrevious: () => set((state) => {
        if (state.history.length === 0) return state;
        const previousSong = state.history[0];
        const newHistory = state.history.slice(1);
        const newQueue = state.currentSong 
          ? [state.currentSong, ...state.queue] 
          : state.queue;
        return { currentSong: previousSong, history: newHistory, queue: newQueue };
      }),
      
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
      toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
      
      toggleRepeat: () => set((state) => {
        const nextMap = { 'off': 'all', 'all': 'one', 'one': 'off' } as const;
        return { repeat: nextMap[state.repeat] };
      })
    }),
    {
      name: 'geet-player-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        volume: state.volume, 
        isMuted: state.isMuted,
        shuffle: state.shuffle,
        repeat: state.repeat,
        currentSong: state.currentSong,
        queue: state.queue,
        history: state.history
      }),
    }
  )
)
