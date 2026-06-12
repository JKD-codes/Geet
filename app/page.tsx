'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { Play } from 'lucide-react';
import Image from 'next/image';

const REGIONAL_HITS = [
  {
    videoId: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up",
    artists: [{ name: "Rick Astley" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" }],
    duration: "3:33",
    language: "English"
  },
  {
    videoId: "1zVWlsx2MhI",
    title: "Tum Hi Ho",
    artists: [{ name: "Arijit Singh" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/1zVWlsx2MhI/hqdefault.jpg" }],
    duration: "4:22",
    language: "Hindi"
  },
  {
    videoId: "aL0XoeeI0A4",
    title: "Singara Siriye",
    artists: [{ name: "Vijay Prakash" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/aL0XoeeI0A4/hqdefault.jpg" }],
    duration: "4:43",
    language: "Kannada"
  },
  {
    videoId: "0YF8vecQWYs",
    title: "Idol",
    artists: [{ name: "YOASOBI" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/0YF8vecQWYs/hqdefault.jpg" }],
    duration: "3:33",
    language: "Japanese"
  },
  {
    videoId: "OsU0CGWaLXc",
    title: "Naatu Naatu",
    artists: [{ name: "Rahul Sipligunj, Kaala Bhairava" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/OsU0CGWaLXc/hqdefault.jpg" }],
    duration: "3:35",
    language: "Telugu"
  },
  {
    videoId: "D_Q357-eO5I",
    title: "Kuthanthram",
    artists: [{ name: "Sushin Shyam, Vedan" }],
    thumbnails: [{ url: "https://i.ytimg.com/vi/D_Q357-eO5I/hqdefault.jpg" }],
    duration: "3:10",
    language: "Malayalam"
  }
];

export default function Home() {
  const [greeting, setGreeting] = useState('Good evening');
  const { setCurrentSong } = usePlayerStore();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  return (
    <div className="p-4 md:p-8 pb-32">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">{greeting}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Global Hits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONAL_HITS.map((song, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={song.videoId} 
              onClick={() => setCurrentSong(song as any)}
              className="flex items-center gap-4 bg-card/40 hover:bg-card transition-colors p-2 rounded-md cursor-pointer group"
            >
              <div className="w-16 h-16 bg-muted rounded shadow-md overflow-hidden relative shrink-0">
                <Image src={song.thumbnails[0].url} alt={song.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm group-hover:text-primary transition-colors truncate">{song.title}</div>
                <div className="text-xs text-muted-foreground truncate">{song.language} • {song.artists[0].name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Recommended for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={i} 
              className="bg-card/20 hover:bg-card/60 p-4 rounded-xl transition-all cursor-pointer group"
            >
              <div className="aspect-square bg-muted rounded-md mb-4 shadow-lg group-hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 mix-blend-overlay" />
              </div>
              <div className="font-semibold text-sm md:text-base truncate">Playlist Title {i}</div>
              <div className="text-xs md:text-sm text-muted-foreground truncate mt-1">Various Artists</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
