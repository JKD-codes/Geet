'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="p-8 pb-32">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Good evening</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Quick Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* We will populate these dynamically later, for now just placeholders */}
          {[1, 2, 3, 4].map((i, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={i} 
              className="flex items-center gap-4 bg-card/40 hover:bg-card transition-colors p-2 rounded-md cursor-pointer group"
            >
              <div className="w-16 h-16 bg-muted rounded shadow-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 mix-blend-overlay" />
              </div>
              <div className="font-semibold text-sm group-hover:text-primary transition-colors">Daily Mix {i}</div>
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
