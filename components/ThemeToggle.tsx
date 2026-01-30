
import React from 'react';
import { Theme } from '../types';
import { Coffee, Cpu, RefreshCcw } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, toggleTheme }) => {
  const isCoffee = currentTheme === Theme.COFFEE;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <span className={`text-sm font-bold uppercase tracking-wider hidden md:block ${isCoffee ? 'text-[#5c3c21]' : 'text-[#64ffda]'}`}>
        {isCoffee ? 'Cafeteria Java' : 'Hardware Lab'}
      </span>
      <button
        onClick={toggleTheme}
        className={`group relative flex h-14 w-28 items-center rounded-full border-2 transition-all duration-500 overflow-hidden
          ${isCoffee ? 'border-[#8b4513] bg-[#fdf6e3] shadow-[0_0_15px_rgba(139,69,19,0.2)]' : 'border-[#64ffda] bg-[#0a192f] shadow-[0_0_15px_rgba(100,255,218,0.3)]'}
        `}
      >
        {/* Sliding background */}
        <div 
          className={`absolute h-10 w-10 rounded-full transition-all duration-500 shadow-lg flex items-center justify-center
            ${isCoffee ? 'left-2 bg-[#8b4513] rotate-0' : 'left-[calc(100%-48px)] bg-[#64ffda] rotate-180'}
          `}
        >
          {isCoffee ? (
            <Coffee size={20} className="text-white" />
          ) : (
            <Cpu size={20} className="text-[#0a192f]" />
          )}
        </div>
        
        {/* Background Icons */}
        <div className="flex w-full justify-between px-4 opacity-30">
          <Coffee size={18} className={isCoffee ? 'text-[#8b4513]' : 'text-gray-400'} />
          <Cpu size={18} className={!isCoffee ? 'text-[#64ffda]' : 'text-gray-400'} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
