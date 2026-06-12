import { useQuery } from '@tanstack/react-query';
import { getLyrics } from '@/services/lyrics';

interface UseLyricsOptions {
  trackName?: string;
  artistName?: string;
  albumName?: string;
  duration?: number;
}

export const useLyrics = ({ trackName, artistName, albumName, duration }: UseLyricsOptions) => {
  return useQuery({
    queryKey: ['lyrics', trackName, artistName, albumName, duration],
    queryFn: () => getLyrics(trackName!, artistName!, albumName, duration),
    enabled: !!trackName && !!artistName,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours caching since lyrics rarely change
  });
};
