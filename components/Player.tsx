import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Volume1, VolumeX, Maximize2, Mic2, Layers } from 'lucide-react';

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Player: React.FC = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    nextSong, 
    prevSong, 
    progress, 
    duration, 
    seekTo,
    volume,
    setVolume,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat
  } = useAudio();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  if (!currentSong) {
    return (
      <div className="h-24 bg-[#181818] border-t border-[#282828] fixed bottom-0 w-full flex items-center justify-center text-gray-400 z-50">
        <span className="text-sm">Select a song to play</span>
      </div>
    );
  }

  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] fixed bottom-0 w-full px-4 flex items-center justify-between z-50">
      
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        <img 
          src={currentSong.coverImage} 
          alt={currentSong.title} 
          className="h-14 w-14 rounded-md shadow-lg object-cover"
        />
        <div className="flex flex-col justify-center overflow-hidden">
          <div className="text-white text-sm font-medium hover:underline cursor-pointer truncate">
            {currentSong.title}
          </div>
          <div className="text-gray-400 text-xs hover:underline cursor-pointer truncate">
            {currentSong.artist}
          </div>
        </div>
        <div className="ml-2">
            {/* Placeholder for Heart Icon */}
            {/* <Heart size={16} className="text-gray-400 hover:text-white cursor-pointer" /> */}
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleShuffle}
            className={`transition ${isShuffle ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle size={20} />
          </button>
          
          <button 
            onClick={prevSong}
            className="text-gray-400 hover:text-white transition"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>

          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg"
          >
            {isPlaying ? (
              <Pause size={20} fill="black" className="text-black ml-[1px]" />
            ) : (
              <Play size={20} fill="black" className="text-black ml-[3px]" />
            )}
          </button>

          <button 
            onClick={nextSong}
            className="text-gray-400 hover:text-white transition"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>

          <button 
            onClick={toggleRepeat}
            className={`transition relative ${repeatMode !== 'none' ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat size={20} />
            {repeatMode === 'one' && (
              <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-[#181818] rounded-full px-0.5">1</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-xl group">
          <span className="text-xs text-gray-400 w-10 text-right font-mono">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer progress-bar"
          />
          <span className="text-xs text-gray-400 w-10 font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Extras */}
      <div className="flex items-center justify-end w-[30%] min-w-[180px] gap-3">
        <Mic2 size={18} className="text-gray-400 hover:text-white cursor-pointer hidden lg:block" />
        <Layers size={18} className="text-gray-400 hover:text-white cursor-pointer hidden lg:block" />
        <div className="flex items-center gap-2 w-32 group">
          <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
             {volume === 0 ? <VolumeX size={20} className="text-gray-400"/> : 
              volume < 0.5 ? <Volume1 size={20} className="text-gray-400"/> :
              <Volume2 size={20} className="text-gray-400"/>}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer progress-bar"
          />
        </div>
        <Maximize2 size={18} className="text-gray-400 hover:text-white cursor-pointer hidden lg:block" />
      </div>
    </div>
  );
};

export default Player;