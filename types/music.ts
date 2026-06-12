export interface ISong {
  videoId: string;
  title: string;
  artists: { name: string; id: string }[];
  album?: { name: string; id: string };
  duration: string;
  durationSeconds: number;
  thumbnails: { url: string; width: number; height: number }[];
}

export interface IPlaylist {
  id: string;
  title: string;
  description?: string;
  songCount: number;
  thumbnails: { url: string; width: number; height: number }[];
  songs?: ISong[];
}

export interface IArtist {
  id: string;
  name: string;
  thumbnails: { url: string; width: number; height: number }[];
  description?: string;
}
