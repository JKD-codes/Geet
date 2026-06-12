import { useQuery } from '@tanstack/react-query';
import { musicProvider } from '@/services/music';

export const useSearchMusic = (query: string, filter?: string, limit: number = 20) => {
  return useQuery({
    queryKey: ['search', query, filter, limit],
    queryFn: () => musicProvider.search(query, filter, limit),
    enabled: !!query && query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useSongDetails = (videoId: string | undefined) => {
  return useQuery({
    queryKey: ['song', videoId],
    queryFn: () => musicProvider.getSong(videoId as string),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useArtistDetails = (channelId: string | undefined) => {
  return useQuery({
    queryKey: ['artist', channelId],
    queryFn: () => musicProvider.getArtist(channelId as string),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useAlbumDetails = (browseId: string | undefined) => {
  return useQuery({
    queryKey: ['album', browseId],
    queryFn: () => musicProvider.getAlbum(browseId as string),
    enabled: !!browseId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useUpNext = (videoId: string | undefined) => {
  return useQuery({
    queryKey: ['upNext', videoId],
    queryFn: () => musicProvider.getUpNext(videoId as string),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 10,
  });
};
