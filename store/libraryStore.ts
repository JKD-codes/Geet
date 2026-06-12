import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ISong, IPlaylist } from '@/types/music'

interface LibraryState {
  likedSongs: ISong[]
  playlists: IPlaylist[]

  // Actions
  toggleLikeSong: (song: ISong) => void
  isLiked: (videoId: string) => boolean
  createPlaylist: (title: string, description?: string) => void
  deletePlaylist: (playlistId: string) => void
  addSongToPlaylist: (playlistId: string, song: ISong) => void
  removeSongFromPlaylist: (playlistId: string, videoId: string) => void
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      likedSongs: [],
      playlists: [],

      toggleLikeSong: (song) => set((state) => {
        const isAlreadyLiked = state.likedSongs.some(s => s.videoId === song.videoId);
        if (isAlreadyLiked) {
          return { likedSongs: state.likedSongs.filter(s => s.videoId !== song.videoId) };
        } else {
          return { likedSongs: [...state.likedSongs, song] };
        }
      }),

      isLiked: (videoId) => {
        return get().likedSongs.some(s => s.videoId === videoId);
      },

      createPlaylist: (title, description) => set((state) => {
        const newPlaylist: IPlaylist = {
          id: crypto.randomUUID(),
          title,
          description,
          songCount: 0,
          thumbnails: [], // Can be set to first song's thumbnail later
          songs: []
        };
        return { playlists: [...state.playlists, newPlaylist] };
      }),

      deletePlaylist: (playlistId) => set((state) => ({
        playlists: state.playlists.filter(p => p.id !== playlistId)
      })),

      addSongToPlaylist: (playlistId, song) => set((state) => ({
        playlists: state.playlists.map(p => {
          if (p.id === playlistId) {
            // Avoid duplicates
            if (p.songs?.some(s => s.videoId === song.videoId)) return p;
            const updatedSongs = [...(p.songs || []), song];
            return { 
              ...p, 
              songs: updatedSongs, 
              songCount: updatedSongs.length,
              thumbnails: updatedSongs.length > 0 ? updatedSongs[0].thumbnails : p.thumbnails
            };
          }
          return p;
        })
      })),

      removeSongFromPlaylist: (playlistId, videoId) => set((state) => ({
        playlists: state.playlists.map(p => {
          if (p.id === playlistId && p.songs) {
            const updatedSongs = p.songs.filter(s => s.videoId !== videoId);
            return {
              ...p,
              songs: updatedSongs,
              songCount: updatedSongs.length,
              thumbnails: updatedSongs.length > 0 ? updatedSongs[0].thumbnails : []
            };
          }
          return p;
        })
      }))
    }),
    {
      name: 'geet-library-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
