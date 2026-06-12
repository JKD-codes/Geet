export interface Lyrics {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string;
  syncedLyrics: string;
}

export const getLyrics = async (
  trackName: string,
  artistName: string,
  albumName?: string,
  duration?: number
): Promise<Lyrics | null> => {
  try {
    // Clean track name by removing everything after '(' or '['
    let cleanTrackName = trackName.split('(')[0].split('[')[0].trim();
    // Use only the primary artist for search
    let cleanArtistName = artistName.split(',')[0].split('&')[0].trim();

    const params = new URLSearchParams();
    params.append('track_name', cleanTrackName);
    params.append('artist_name', cleanArtistName);

    // Use search instead of get for fuzzy matching
    const response = await fetch(`https://lrclib.net/api/search?${params.toString()}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`LRCLIB API error: ${response.status}`);
    }

    const data: Lyrics[] = await response.json();
    if (data && data.length > 0) {
      // Find the best match or just return the first one
      return data[0];
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch lyrics:", error);
    return null;
  }
};
