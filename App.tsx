import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import Player from './components/Player';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AudioProvider>
      <div className="h-screen w-screen bg-black text-white flex overflow-hidden">
        
        <Sidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSelectedPlaylistId={setSelectedPlaylistId}
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
        
        <MainView 
          currentView={currentView} 
          selectedPlaylistId={selectedPlaylistId}
          onPlaylistSelect={(id) => {
            setSelectedPlaylistId(id);
            setCurrentView(ViewType.PLAYLIST);
          }}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <Player />
        
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </AudioProvider>
  );
};

export default App;