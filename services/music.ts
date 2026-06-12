import { ISong, IPlaylist, IArtist } from '@/types/music';

// This acts as a wrapper around the Next.js API routes which proxy to the Python FastAPI backend
const API_BASE = '/api';

export const musicProvider = {
  search: async (query: string, filter?: string, limit: number = 20): Promise<any[]> => {
    const params = new URLSearchParams({ q: query, limit: limit.toString() });
    if (filter) params.append('filter', filter);
    
    const response = await fetch(`${API_BASE}/search?${params.toString()}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    return data.results || [];
  },

  getSong: async (videoId: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/song/${videoId}`);
    if (!response.ok) throw new Error('Failed to get song details');
    return response.json();
  },

  getArtist: async (channelId: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/artist/${channelId}`);
    if (!response.ok) throw new Error('Failed to get artist details');
    return response.json();
  },

  getAlbum: async (browseId: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/album/${browseId}`);
    if (!response.ok) throw new Error('Failed to get album details');
    return response.json();
  },

  getUpNext: async (videoId: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/up-next/${videoId}`);
    if (!response.ok) throw new Error('Failed to get up next tracks');
    return response.json();
  },

  getStreamUrl: async (videoId: string): Promise<string> => {
    const response = await fetch(`${API_BASE}/stream/${videoId}`);
    if (!response.ok) throw new Error('Failed to get stream URL');
    const data = await response.json();
    return data.url;
  }
};
