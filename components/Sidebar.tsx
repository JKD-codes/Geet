import React from 'react';
import { Home, Search, Library, Plus, Heart, Globe } from 'lucide-react';
import { ViewType } from '../types';
import { PLAYLISTS } from '../data';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  setSelectedPlaylistId: (id: string | null) => void;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const GeetLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Geet Logo</title>
    {/* Device Body */}
    <rect x="15" y="5" width="70" height="90" rx="8" fill="#3B82F6" stroke="#1e3a8a" strokeWidth="2"/>
    <rect x="15" y="5" width="70" height="90" rx="8" fill="url(#grad1)" fillOpacity="0.3"/>
    
    {/* Screen */}
    <rect x="23" y="15" width="54" height="40" rx="2" fill="#e5e7eb" stroke="#333" strokeWidth="1"/>
    {/* Music Note on Screen */}
    <path d="M45 25v15c0 2-1.5 3.5-3.5 3.5S38 42 38 40s1.5-3.5 3.5-3.5h1.5V25h10v15c0 2-1.5 3.5-3.5 3.5S46 42 46 40s1.5-3.5 3.5-3.5h1.5z" fill="#333"/>

    {/* Wheel */}
    <circle cx="50" cy="72" r="16" fill="#F3F4F6" stroke="#d1d5db" strokeWidth="1"/>
    {/* Inner Button */}
    <circle cx="50" cy="72" r="5" fill="#9CA3AF" />
    
    {/* Wheel Details */}
    <text x="50" y="63" fontSize="4" fontFamily="Arial" textAnchor="middle" fill="#999" fontWeight="bold">MENU</text>
    <path d="M40 72l-2 2v-4z" fill="#999"/>
    <path d="M60 72l2 2v-4z" fill="#999"/>
    <path d="M50 82l2 2h-4z" fill="#999"/>

    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.2}} />
        <stop offset="100%" style={{stopColor: 'black', stopOpacity: 0.1}} />
      </linearGradient>
    </defs>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  setSelectedPlaylistId,
  isMobileMenuOpen,
  closeMobileMenu
}) => {

  const handleNav = (view: ViewType) => {
    setCurrentView(view);
    setSelectedPlaylistId(null);
    closeMobileMenu();
  };

  const handlePlaylistClick = (id: string) => {
    setCurrentView(ViewType.PLAYLIST);
    setSelectedPlaylistId(id);
    closeMobileMenu();
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-black text-gray-300 flex flex-col p-4 gap-4 transition-transform duration-300 ease-in-out
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    md:relative md:flex
  `;

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center gap-3 px-4 py-2 mb-2">
        <GeetLogo />
        <span className="text-2xl font-bold text-white tracking-tight">Geet</span>
      </div>

      <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
        <div 
          onClick={() => handleNav(ViewType.HOME)}
          className={`flex items-center gap-4 cursor-pointer transition hover:text-white ${currentView === ViewType.HOME ? 'text-white' : ''}`}
        >
          <Home size={24} />
          <span className="font-bold">Home</span>
        </div>
        <div 
          onClick={() => handleNav(ViewType.SEARCH)}
          className={`flex items-center gap-4 cursor-pointer transition hover:text-white ${currentView === ViewType.SEARCH ? 'text-white' : ''}`}
        >
          <Search size={24} />
          <span className="font-bold">Search</span>
        </div>
      </div>

      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 shadow-md z-10">
          <div className="flex items-center justify-between mb-2">
             <div 
               onClick={() => handleNav(ViewType.LIBRARY)}
               className={`flex items-center gap-2 cursor-pointer hover:text-white transition ${currentView === ViewType.LIBRARY ? 'text-white' : ''}`}
             >
                <Library size={24} />
                <span className="font-bold">Your Library</span>
             </div>
             <div className="flex gap-2">
               <Plus size={20} className="hover:text-white cursor-pointer" />
             </div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="bg-[#242424] px-3 py-1 rounded-full text-xs text-white cursor-pointer hover:bg-[#2a2a2a]">Playlists</span>
            <span className="bg-[#242424] px-3 py-1 rounded-full text-xs text-white cursor-pointer hover:bg-[#2a2a2a]">Artists</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-600">
           {/* Default Liked Songs Row */}
           <div className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center rounded-sm group-hover:shadow-lg">
                <Heart size={20} fill="white" className="text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-white font-medium">Liked Songs</span>
                 <span className="text-xs text-gray-400">Playlist • 12 songs</span>
              </div>
           </div>

           {/* Generated Playlists */}
           {PLAYLISTS.map((playlist) => (
             <div 
                key={playlist.id} 
                onClick={() => handlePlaylistClick(playlist.id)}
                className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer"
              >
                <img src={playlist.coverImage} alt={playlist.name} className="w-12 h-12 rounded-sm object-cover" />
                <div className="flex flex-col overflow-hidden">
                   <span className="text-white font-medium truncate">{playlist.name}</span>
                   <span className="text-xs text-gray-400 truncate">Playlist • Geet</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;