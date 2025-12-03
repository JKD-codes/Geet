import { Playlist, Song } from './types';

// =========================================================================
// DATA CONFIGURATION
// =========================================================================
// To add your own music, simply replace the strings in these arrays with 
// your actual MP3 URLs (e.g., from AWS S3, Cloudinary, or your own server).
// You can add as many URLs as you want for each category.
// =========================================================================

const ENGLISH_URLS = [
  "./English/Blinding_Lights.mp3",
  "./English/Shape_of_you.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
];

const HINDI_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
];

const KANNADA_URLS = [
  "./Kannada/Rebel_Kannada.mp3",
  "./Kannada/Sapta-Sagaradaache-Ello.mp3",
  "./Kannada/Katheyonda.mp3",
  "./Kannada/Danks_Anthem.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
];

const TAMIL_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
];

const TELUGU_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
];

const MALAYALAM_URLS = [
  "./Malayalam/illuminati.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
];

const JAPANESE_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
];

const KOREAN_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
];



//image urls
const ENGLISH_IMAGE_URLS = [
    "./English/blinding_lights_cover.jpg",
    "./English/shape_of_you.webp",
    "https://picsum.photos/seed/english3/300/300",
    "https://picsum.photos/seed/english4/300/300",
    "https://picsum.photos/seed/english5/300/300",
];

const HINDI_IMAGE_URLS = [
    "https://picsum.photos/seed/hindi6/300/300",
    "https://picsum.photos/seed/hindi7/300/300",
    "https://picsum.photos/seed/hindi8/300/300",
    "https://picsum.photos/seed/hindi9/300/300",
    "https://picsum.photos/seed/hindi10/300/300",
];

const KANNADA_IMAGE_URLS = [
    "./Kannada/rebel.webp", // Example of a local path
    "./Kannada/sapta.webp",
    "https://picsum.photos/seed/kannada14/300/300",
    "./Kannada/danks.webp",
    "https://picsum.photos/seed/kannada15/300/300",
];

const TAMIL_IMAGE_URLS = [
    "https://picsum.photos/seed/tamil16/300/300",
    "https://picsum.photos/seed/tamil1/300/300",
    "https://picsum.photos/seed/tamil2/300/300",
    "https://picsum.photos/seed/tamil3/300/300",
    "https://picsum.photos/seed/tamil4/300/300",
];

const TELUGU_IMAGE_URLS = [
    "https://picsum.photos/seed/telugu5/300/300",
    "https://picsum.photos/seed/telugu6/300/300",
    "https://picsum.photos/seed/telugu7/300/300",
    "https://picsum.photos/seed/telugu8/300/300",
    "https://picsum.photos/seed/telugu9/300/300",
];

const MALAYALAM_IMAGE_URLS = [
    "./Malayalam/illuminati.webp",
    "https://picsum.photos/seed/malayalam11/300/300",
    "https://picsum.photos/seed/malayalam12/300/300",
    "https://picsum.photos/seed/malayalam13/300/300",
    "https://picsum.photos/seed/malayalam14/300/300",
];

const JAPANESE_IMAGE_URLS = [
    "https://picsum.photos/seed/japanese15/300/300",
    "https://picsum.photos/seed/japanese16/300/300",
    "https://picsum.photos/seed/japanese1/300/300",
    "https://picsum.photos/seed/japanese2/300/300",
    "https://picsum.photos/seed/japanese3/300/300",
];

const KOREAN_IMAGE_URLS = [
    "https://picsum.photos/seed/korean4/300/300",
    "https://picsum.photos/seed/korean5/300/300",
    "https://picsum.photos/seed/korean6/300/300",
    "https://picsum.photos/seed/korean7/300/300",
    "https://picsum.photos/seed/korean8/300/300",
];

// Helper function to create song objects
// It maps the specific URLs provided above to song objects.
// If you want more than 20 songs, add more URLs to the arrays above.
const createSongsForGenre = (genre: string, urls: string[], totalNeeded: number = 20): Song[] => {
  return Array.from({ length: totalNeeded }).map((_, i) => {
    // If we have fewer URLs than needed songs, we cycle through them using modulo (%)
    const url = urls.length > 0 ? urls[i % urls.length] : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    
    return {
      id: `${genre.toLowerCase()}-${i}`,
      title: `${genre} Hit ${i + 1}`,
      artist: `${genre} Artist ${Math.floor(i / 3) + 1}`,
      album: `${genre} Classics Vol. ${Math.floor(i / 5) + 1}`,
      coverImage: `https://picsum.photos/seed/${genre}${i}/300/300`,
      audioUrl: url,
      duration: 300 // Placeholder, updates on load
    };
  });
};

const ENGLISH_TITLES = [
    "Blinding Lights",
    "Shape of You",
    "Starlight Drive",
    "Ocean Waves",
    "Midnight City Pop",
    "As it was",
];

const HINDI_TITLES = [
  "Tum Hi Ho",
  "Ae Dil Hai Mushkil",
  "Kabira",
  "Chaleya",
  "Baarish Ban Jaana",
];

const KANNADA_TITLES = [
  "Rebel-Kantara",
  "Sapta Sagaradaache Ello",
  "Katheyonda",
  "Kannada Song 4",
  "Kannada Song 5",
];

const TAMIL_TITLES = [
  "Tamil Song 1",
  "Tamil Song 2",
  "Tamil Song 3",
  "Tamil Song 4",
  "Tamil Song 5",
];

const TELUGU_TITLES = [
  "Telugu Song 1",
  "Telugu Song 2",
  "Telugu Song 3",
  "Telugu Song 4",
  "Telugu Song 5",
];

const MALAYALAM_TITLES = [
  "Malayalam Song 1",
  "Malayalam Song 2",
  "Malayalam Song 3",
  "Malayalam Song 4",
  "Malayalam Song 5",
];

const JAPANESE_TITLES = [
  "Japanese Song 1",
  "Japanese Song 2",
  "Japanese Song 3",
  "Japanese Song 4",
  "Japanese Song 5",
];

const KOREAN_TITLES = [
  "Korean Song 1",
  "Korean Song 2",
  "Korean Song 3",
  "Korean Song 4",
  "Korean Song 5",
];

const createSongsForGenreWithTitles = (genre: string, urls: string[], titles: string[], totalNeeded: number = 20): Song[] => {
  return Array.from({ length: totalNeeded }).map((_, i) => {
  const url = urls.length > 0 ? urls[i % urls.length] : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const title = titles[i % titles.length];
  
  return {
    id: `${genre.toLowerCase()}-${i}`,
    title: title,
    artist: `${genre} Artist ${Math.floor(i / 3) + 1}`,
    album: `${genre} Classics Vol. ${Math.floor(i / 5) + 1}`,
    coverImage: `https://picsum.photos/seed/${genre}${i}/300/300`,
    audioUrl: url,
    duration: 300
  };
  });
};

export const PLAYLISTS: Playlist[] = [
  {
  id: 'english',
  name: 'English Top 50',
  description: 'The hottest English tracks right now.',
  coverImage: 'https://picsum.photos/seed/englishplaylist/500/500',
  songs: createSongsForGenreWithTitles('English', ENGLISH_URLS, ENGLISH_TITLES).map((song, i) => ({
    ...song,
    coverImage: ENGLISH_IMAGE_URLS[i % ENGLISH_IMAGE_URLS.length]
  }))
  },
  {
  id: 'hindi',
  name: 'Hindi Top 50',
  description: 'Best of Bollywood and Indie Pop.',
  coverImage: 'https://picsum.photos/seed/hindiplaylist/500/500',
  songs: createSongsForGenreWithTitles('Hindi', HINDI_URLS, HINDI_TITLES).map((song, i) => ({
    ...song,
    coverImage: HINDI_IMAGE_URLS[i % HINDI_IMAGE_URLS.length]
  }))
  },
  {
  id: 'kannada',
  name: 'Kannada Top 50',
  description: 'Sandalwood hits and melodies.',
  coverImage: './Kannada/kannada.webp',
  songs: createSongsForGenreWithTitles('Kannada', KANNADA_URLS, KANNADA_TITLES).map((song, i) => ({
    ...song,
    coverImage: KANNADA_IMAGE_URLS[i % KANNADA_IMAGE_URLS.length]
  }))
  },
  {
  id: 'tamil',
  name: 'Tamil Top 50',
  description: 'Kollywood blockbusters.',
  coverImage: 'https://picsum.photos/seed/tamilplaylist/500/500',
  songs: createSongsForGenreWithTitles('Tamil', TAMIL_URLS, TAMIL_TITLES).map((song, i) => ({
    ...song,
    coverImage: TAMIL_IMAGE_URLS[i % TAMIL_IMAGE_URLS.length]
  }))
  },
  {
  id: 'telugu',
  name: 'Telugu Top 50',
  description: 'Tollywood beats and mass numbers.',
  coverImage: 'https://picsum.photos/seed/teluguplaylist/500/500',
  songs: createSongsForGenreWithTitles('Telugu', TELUGU_URLS, TELUGU_TITLES).map((song, i) => ({
    ...song,
    coverImage: TELUGU_IMAGE_URLS[i % TELUGU_IMAGE_URLS.length]
  }))
  },
  {
  id: 'malayalam',
  name: 'Malayalam Top 50',
  description: 'Mollywood soothing melodies.',
  coverImage: 'https://picsum.photos/seed/malayalamplaylist/500/500',
  songs: createSongsForGenreWithTitles('Malayalam', MALAYALAM_URLS, MALAYALAM_TITLES).map((song, i) => ({
    ...song,
    coverImage: MALAYALAM_IMAGE_URLS[i % MALAYALAM_IMAGE_URLS.length]
  }))
  },
  {
  id: 'japanese',
  name: 'Japanese Top 50',
  description: 'J-Pop, Anime OSTs and more.',
  coverImage: 'https://picsum.photos/seed/japaneseplaylist/500/500',
  songs: createSongsForGenreWithTitles('Japanese', JAPANESE_URLS, JAPANESE_TITLES).map((song, i) => ({
    ...song,
    coverImage: JAPANESE_IMAGE_URLS[i % JAPANESE_IMAGE_URLS.length]
  }))
  },
  {
  id: 'korean',
  name: 'Korean Top 50',
  description: 'K-Pop sensations and idols.',
  coverImage: 'https://picsum.photos/seed/koreanplaylist/500/500',
  songs: createSongsForGenreWithTitles('Korean', KOREAN_URLS, KOREAN_TITLES).map((song, i) => ({
    ...song,
    coverImage: KOREAN_IMAGE_URLS[i % KOREAN_IMAGE_URLS.length]
  }))
  }
];

export const getAllSongs = (): Song[] => {
  return PLAYLISTS.flatMap(playlist => playlist.songs);
};
