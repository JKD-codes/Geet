import React, { useState, useEffect, useMemo } from 'react';
import { ViewType, Playlist, Song } from '../types';
import { PLAYLISTS, getAllSongs } from '../data';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Clock3, Search as SearchIcon, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface MainViewProps {
  currentView: ViewType;
  selectedPlaylistId: string | null;
  onPlaylistSelect: (id: string) => void;
  toggleMobileMenu: () => void;
}

const MainView: React.FC<MainViewProps> = ({ 
  currentView, 
  selectedPlaylistId, 
  onPlaylistSelect,
  toggleMobileMenu
}) => {
  const { playSong, currentSong, isPlaying, togglePlay } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [bgColor, setBgColor] = useState('from-indigo-900');

  // Randomize background color for playlists
  useEffect(() => {
    const colors = ['from-indigo-900', 'from-red-900', 'from-green-900', 'from-blue-900', 'from-purple-900', 'from-pink-900'];
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [selectedPlaylistId]);

  const renderHome = () => {
    const greet = () => {
      const h = new Date().getHours();
      if (h < 12) return 'Good morning';
      if (h < 18) return 'Good afternoon';
      return 'Good evening';
    };

    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">{greet()}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
           {PLAYLISTS.slice(0, 6).map(pl => (
             <div 
               key={pl.id} 
               onClick={() => onPlaylistSelect(pl.id)}
               className="bg-[#2a2a2a]/50 hover:bg-[#2a2a2a] transition flex items-center rounded-md cursor-pointer overflow-hidden group"
             >
               <img src={pl.coverImage} alt={pl.name} className="h-20 w-20 shadow-lg" />
               <div className="p-4 font-bold truncate flex-1 flex justify-between items-center">
                 {pl.name}
                 <div className="bg-[#1DB954] rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Play fill="black" size={20} className="text-black ml-1" />
                 </div>
               </div>
             </div>
           ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">Made for you</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {PLAYLISTS.map(pl => (
            <div 
              key={pl.id}
              onClick={() => onPlaylistSelect(pl.id)}
              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition cursor-pointer group"
            >
              <div className="relative mb-4">
                <img src={pl.coverImage} alt={pl.name} className="w-full aspect-square object-cover rounded-md shadow-lg" />
                <div className="absolute bottom-2 right-2 bg-[#1DB954] rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                   <Play fill="black" size={24} className="text-black ml-1" />
                </div>
              </div>
              <h4 className="font-bold mb-1 truncate">{pl.name}</h4>
              <p className="text-sm text-[#b3b3b3] line-clamp-2">{pl.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    const allSongs = getAllSongs();
    const filteredSongs = allSongs.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Search</h2>
        <div className="relative mb-8 max-w-md">
           <SearchIcon className="absolute left-3 top-3 text-black" size={24}/>
           <input 
             type="text" 
             placeholder="What do you want to listen to?" 
             className="w-full bg-white text-black rounded-full py-3 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-white"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             autoFocus
           />
        </div>

        {searchQuery && (
          <div>
            <h3 className="text-xl font-bold mb-4">Songs</h3>
            <div className="flex flex-col">
              {filteredSongs.length > 0 ? filteredSongs.map((song, i) => (
                <div 
                  key={song.id} 
                  className={`flex items-center p-2 rounded-md hover:bg-[#2a2a2a] group cursor-pointer ${currentSong?.id === song.id ? 'text-[#1DB954]' : 'text-gray-300'}`}
                  onClick={() => playSong(song, filteredSongs)}
                >
                  <div className="w-16 flex items-center justify-center">
                    {currentSong?.id === song.id && isPlaying ? (
                       <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" className="h-4" />
                    ) : (
                       <span className="group-hover:hidden">{i + 1}</span>
                    )}
                    <Play size={16} fill="white" className="hidden group-hover:block text-white" />
                  </div>
                  <img src={song.coverImage} className="h-10 w-10 mr-4 rounded-sm" alt="art"/>
                  <div className="flex-1">
                    <div className={`font-medium ${currentSong?.id === song.id ? 'text-[#1DB954]' : 'text-white'}`}>{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                  <div className="hidden md:block text-sm text-gray-400 mr-8">{formatDuration(song.duration)}</div>
                </div>
              )) : (
                <div className="text-gray-400">No songs found for "{searchQuery}"</div>
              )}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div>
             <h3 className="text-xl font-bold mb-4">Browse all</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {['Podcasts', 'Live Events', 'Made For You', 'New Releases', 'Pop', 'Hip-Hop', 'Rock', 'Mood', 'Educational', 'Documentary'].map((cat, idx) => (
                  <div key={idx} className={`aspect-square p-4 rounded-lg overflow-hidden relative cursor-pointer hover:scale-105 transition bg-gradient-to-br ${
                    ['from-purple-600 to-blue-600', 'from-red-600 to-orange-600', 'from-blue-600 to-cyan-600', 'from-pink-600 to-rose-600'][idx % 4]
                  }`}>
                     <h4 className="text-xl font-bold absolute top-4 left-4 break-words max-w-[80%]">{cat}</h4>
                     <img src={`https://picsum.photos/seed/${cat}/200/200`} className="absolute bottom-0 right-0 w-16 h-16 rotate-[25deg] translate-x-2 translate-y-2 shadow-lg" alt="cat" />
                  </div>
               ))}
             </div>
          </div>
        )}
      </div>
    );
  };

  const renderPlaylist = () => {
    const playlist = PLAYLISTS.find(p => p.id === selectedPlaylistId);
    if (!playlist) return <div>Playlist not found</div>;

    const isCurrentPlaylistPlaying = currentSong && playlist.songs.some(s => s.id === currentSong.id);

    return (
      <>
        {/* Playlist Header */}
        <div className={`flex flex-col md:flex-row items-end gap-6 p-6 bg-gradient-to-b ${bgColor} to-[#121212]`}>
          <img src={playlist.coverImage} alt={playlist.name} className="w-52 h-52 shadow-2xl shadow-black/50" />
          <div className="flex flex-col gap-2 mb-2">
            <span className="uppercase text-xs font-bold mt-4 md:mt-0">Playlist</span>
            <h1 className="text-4xl md:text-7xl font-bold">{playlist.name}</h1>
            <p className="text-gray-300 mt-2">{playlist.description}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
               {/* Just a small icon to represent the user/creator */}
               <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">G</div>
               <span className="font-bold">Geet</span>
               <span>•</span>
               <span>{playlist.songs.length} songs, about 2 hr 15 min</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="p-6 pb-2">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  if (isCurrentPlaylistPlaying && isPlaying) {
                    togglePlay();
                  } else {
                    playSong(playlist.songs[0], playlist.songs);
                  }
                }}
                className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg hover:bg-[#1ed760]"
              >
                {isCurrentPlaylistPlaying && isPlaying ? (
                  <Pause fill="black" size={28} className="text-black" />
                ) : (
                  <Play fill="black" size={28} className="text-black ml-1" />
                )}
              </button>
           </div>
        </div>

        {/* Songs List */}
        <div className="p-6 pt-0">
           {/* Header */}
           <div className="grid grid-cols-[16px_4fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-gray-400 border-b border-[#282828] text-sm mb-4 sticky top-16 bg-[#121212] z-10">
              <div className="text-center">#</div>
              <div>Title</div>
              <div className="hidden md:block">Album</div>
              <div className="flex justify-end"><Clock3 size={16} /></div>
           </div>

           {/* Rows */}
           {playlist.songs.map((song, index) => (
             <div 
               key={song.id}
               onClick={() => playSong(song, playlist.songs)}
               className={`grid grid-cols-[16px_4fr_minmax(120px,1fr)] md:grid-cols-[16px_4fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 hover:bg-[#2a2a2a] rounded-md group cursor-pointer transition ${currentSong?.id === song.id ? 'text-[#1DB954]' : 'text-gray-300'}`}
             >
               <div className="flex items-center justify-center text-sm">
                 {currentSong?.id === song.id && isPlaying ? (
                    <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" className="h-4 w-4" />
                 ) : (
                    <>
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play size={14} fill="white" className="hidden group-hover:block text-white" />
                    </>
                 )}
               </div>
               
               <div className="flex items-center gap-4 overflow-hidden">
                 <img src={song.coverImage} alt="art" className="w-10 h-10 rounded-sm" />
                 <div className="flex flex-col truncate">
                   <span className={`font-medium truncate ${currentSong?.id === song.id ? 'text-[#1DB954]' : 'text-white'}`}>{song.title}</span>
                   <span className="text-sm text-gray-400 truncate group-hover:text-white transition">{song.artist}</span>
                 </div>
               </div>

               <div className="hidden md:flex items-center text-sm text-gray-400 group-hover:text-white transition truncate">
                 {song.album}
               </div>

               <div className="flex items-center justify-end text-sm text-gray-400 font-mono">
                 {formatDuration(song.duration)}
               </div>
             </div>
           ))}
        </div>
      </>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewType.HOME: return renderHome();
      case ViewType.SEARCH: return renderSearch();
      case ViewType.PLAYLIST: return renderPlaylist();
      case ViewType.LIBRARY: return <div className="p-8 text-2xl font-bold">Your Library (Coming Soon)</div>;
      default: return renderHome();
    }
  };

  return (
    <div className="flex-1 bg-[#121212] overflow-y-auto relative rounded-lg ml-0 md:ml-2 mt-2 mr-2 mb-24 scroll-smooth">
      {/* Top Bar / Header */}
      <div className={`sticky top-0 z-30 h-16 flex items-center justify-between px-6 transition-colors duration-300 ${searchQuery || currentView === ViewType.PLAYLIST ? 'bg-[#000000]/40 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="flex items-center gap-4">
           <button 
             onClick={toggleMobileMenu}
             className="md:hidden text-white bg-black/60 rounded-full p-2"
           >
             <Menu size={24} />
           </button>
           <div className="hidden md:flex gap-2">
             <button className="bg-black/60 rounded-full p-1 text-gray-300 hover:text-white cursor-not-allowed">
               <ChevronLeft size={24} />
             </button>
             <button className="bg-black/60 rounded-full p-1 text-gray-300 hover:text-white cursor-not-allowed">
               <ChevronRight size={24} />
             </button>
           </div>
           {currentView === ViewType.SEARCH && (
             <div className="md:hidden">
               {/* Mobile placeholder for title */}
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-4">
           <button className="text-gray-300 font-bold hover:text-white text-sm hover:scale-105 transition hidden sm:block">Sign up</button>
           <button className="bg-white text-black font-bold px-8 py-3 rounded-full text-sm hover:scale-105 transition">Log in</button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

// Helper
function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export default MainView;