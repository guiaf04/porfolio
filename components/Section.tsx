
import React from 'react';
import { Theme } from '../types';

interface SectionProps {
  title: string;
  theme: Theme;
  children: React.ReactNode;
  id: string;
}

const Section: React.FC<SectionProps> = ({ title, theme, children, id }) => {
  const isCoffee = theme === Theme.COFFEE;
  
  return (
    <section id={id} className="py-20 px-6 max-w-6xl mx-auto theme-transition">
      <div className="flex items-center gap-4 mb-12">
        <h2 className={`text-3xl md:text-5xl font-bold uppercase tracking-tighter ${isCoffee ? 'text-[#5c3c21] font-["Playfair_Display"]' : 'text-[#64ffda] font-["JetBrains_Mono"]'}`}>
          {isCoffee ? `// ${title}` : `0x_${title}`}
        </h2>
        <div className={`flex-grow h-[1px] ${isCoffee ? 'bg-[#5c3c21]/20' : 'bg-[#64ffda]/30'}`}></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
