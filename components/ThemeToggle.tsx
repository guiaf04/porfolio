
import React from 'react';
import { Theme } from '../types';
import { Coffee, Cpu } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, toggleTheme }) => {
  const isCoffee = currentTheme === Theme.COFFEE;

  return (
    <div className="flex items-center gap-3">
      <span className={`text-[10px] font-black uppercase tracking-wider hidden lg:block ${isCoffee ? 'text-[#5c3c21]' : 'text-[#64ffda]'}`}>
        {isCoffee ? 'Modo Barista' : 'Modo Hardware'}
      </span>
      <button
        onClick={toggleTheme}
        className={`group relative flex h-10 w-20 items-center rounded-full border-2 transition-all duration-500 overflow-hidden
          ${isCoffee ? 'border-[#8b4513] bg-[#fdf6e3] shadow-[0_0_10px_rgba(139,69,19,0.1)]' : 'border-[#64ffda] bg-[#0a192f] shadow-[0_0_10px_rgba(100,255,218,0.2)]'}
        `}
      >
        {/* Sliding background */}
        <div 
          className={`absolute h-7 w-7 rounded-full transition-all duration-500 shadow-md flex items-center justify-center z-10
            ${isCoffee ? 'left-1 bg-[#8b4513] rotate-0' : 'left-[calc(100%-32px)] bg-[#64ffda] rotate-180'}
          `}
        >
          {isCoffee ? (
            <Coffee size={14} className="text-white" />
          ) : (
            <Cpu size={14} className="text-[#0a192f]" />
          )}
        </div>
        
        {/* Background Icons */}
        <div className="flex w-full justify-between px-3 opacity-20">
          <Coffee size={12} className={isCoffee ? 'text-[#8b4513]' : 'text-gray-400'} />
          <Cpu size={12} className={!isCoffee ? 'text-[#64ffda]' : 'text-gray-400'} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
