
import React, { useState, useEffect, useRef } from 'react';
import { Theme, Project, SkillItem, Language } from './types';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, COFFEE_SKILLS, HARDWARE_SKILLS } from './data';
import ThemeToggle from './components/ThemeToggle';
import Section from './components/Section';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Calendar, 
  MapPin, 
  Coffee as CoffeeIcon, 
  Cpu as HardwareIcon, 
  Search, 
  X, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Sword,
  Sparkles,
  Terminal,
  Activity,
  Star,
  Clock,
  Skull,
  Trophy,
  ScrollText,
  Monitor,
  Globe,
  Flame,
  Shield,
  Crown,
  History,
  Target,
  Dna,
  Workflow,
  Cpu
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [view, setView] = useState<'selection' | 'portfolio'>('selection');
  const [theme, setTheme] = useState<Theme>(Theme.COFFEE);
  const [lang, setLang] = useState<Language>('pt');
  const isCoffee = theme === Theme.COFFEE;

  // UI State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [isClosingSkill, setIsClosingSkill] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  // AI State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // UI Translations
  const ui = {
    selection: {
      barista: { pt: "O Barista", en: "The Barista" },
      architect: { pt: "O Arquiteto", en: "The Architect" },
      select: { pt: "SELECIONAR PERSONAGEM", en: "SELECT CHARACTER" },
      vs: { pt: "VS", en: "VS" }
    },
    headings: {
      resumo: { pt: "Resumo", en: "Summary" },
      trajetoria: { pt: "Quest History", en: "Quest History" },
      techStack: { pt: "Skill Tree", en: "Skill Tree" },
      questLog: { pt: "Quest Log", en: "Quest Log" }
    },
    ai: {
      label: { pt: isCoffee ? "Assistente Barista" : "Assistente Binário", en: isCoffee ? "Barista Assistant" : "Binary Assistant" },
      placeholder: { pt: isCoffee ? "Como ele usa Kafka?" : "Experiência com FPGAs?", en: isCoffee ? "How does he use Kafka?" : "Experience with FPGAs?" },
      error: { pt: "Erro ao conectar com a IA.", en: "Error connecting to AI." }
    },
    stats: {
      xp: { pt: "XP Ganho", en: "XP Gained" },
      mana: { pt: "Mana / Tempo", en: "Mana / Time" },
      difficulty: { pt: "Dificuldade", en: "Difficulty" },
      class: { pt: "Classe", en: "Class" },
      completion: { pt: "Progresso", en: "Progress" },
      inspect: { pt: "Clique para inspecionar missão", en: "Click to inspect quest" },
      level: { pt: "CONHECIMENTO", en: "KNOWLEDGE" }
    },
    experience: {
        questLabel: { pt: "MISSÃO ATUAL", en: "ACTIVE QUEST" },
        legacyLabel: { pt: "MISSÃO CONCLUÍDA", en: "COMPLETED QUEST" },
        guild: { pt: "Guilda", en: "Guild" },
        achievements: { pt: "Conquistas da Campanha", en: "Campaign Achievements" }
    },
    footer: {
      links: { pt: "Links Rápidos", en: "Quick Links" },
      collab: { pt: "Interessado em colaborar?", en: "Interested in collaborating?" },
      discuss: { 
        pt: `Sinta-se à vontade para entrar em contato para discutir ${isCoffee ? 'backend distribuído' : 'sistemas de tempo real'}.`,
        en: `Feel free to reach out to discuss ${isCoffee ? 'distributed backend' : 'real-time systems'}.`
      },
      note: {
        pt: isCoffee ? "Processado com Java & Grãos Selecionados." : "Compiled for speed.",
        en: isCoffee ? "Processed with Java & Selected Grains." : "Compiled for speed."
      }
    },
    modal: {
      techStack: { pt: "Stack Tecnológica", en: "Technology Stack" },
      github: { pt: "Ver no Github", en: "View on Github" }
    },
    skills: {
        root: { pt: isCoffee ? "Raiz Arcaica" : "Núcleo de Silício", en: isCoffee ? "Arcane Root" : "Silicon Core" }
    }
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.COFFEE ? Theme.HARDWARE : Theme.COFFEE);
    setActiveSkill(null);
    setIsClosingSkill(false);
    setActiveProjectIndex(0);
  };

  const startPortfolio = (chosenTheme: Theme) => {
    setTheme(chosenTheme);
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtered Content
  const currentSkills = isCoffee ? COFFEE_SKILLS : HARDWARE_SKILLS;
  const currentProjects = PROJECTS.filter(p => p.theme === theme);

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        handleSkillClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSkillClick = (skill: SkillItem) => {
    if (activeSkill?.name === skill.name) {
      handleSkillClose();
    } else {
      setActiveSkill(skill);
      setIsClosingSkill(false);
    }
  };

  const handleSkillClose = () => {
    if (!activeSkill) return;
    setIsClosingSkill(true);
    setTimeout(() => {
      setActiveSkill(null);
      setIsClosingSkill(false);
    }, 200);
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Responda como assistente do Guilherme. Contexto: ${PERSONAL_INFO.name}, Foco: ${theme}, Experiência: ${JSON.stringify(EXPERIENCES)}. Pergunta: ${aiQuestion}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiResponse(response.text || "Ops, algo deu errado.");
    } catch (err) {
      setAiResponse(ui.ai.error[lang]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const nextProject = () => setActiveProjectIndex((prev) => (prev + 1) % currentProjects.length);
  const prevProject = () => setActiveProjectIndex((prev) => (prev - 1 + currentProjects.length) % currentProjects.length);
  const nextImage = () => selectedProject?.images && setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
  const prevImage = () => selectedProject?.images && setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);

  if (view === 'selection') {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col md:flex-row overflow-hidden font-['JetBrains_Mono']">
        <button onClick={toggleLang} className="absolute top-6 left-6 z-[1100] flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/20 transition-all backdrop-blur-md">
          <Globe size={16} /> {lang.toUpperCase()}
        </button>
        <div onClick={() => startPortfolio(Theme.COFFEE)} className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5] border-r border-white/10">
          <div className="absolute inset-0 bg-[#5c3c21] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-8 p-8 rounded-full border-4 border-[#8b4513] text-[#8b4513] group-hover:scale-110 group-hover:bg-[#8b4513] group-hover:text-white transition-all duration-500">
              <CoffeeIcon size={80} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#fdf6e3] mb-4 uppercase tracking-tighter">{ui.selection.barista[lang]}</h2>
            <div className="mt-12 px-8 py-3 bg-white text-black font-black tracking-widest group-hover:scale-105 transition-transform">{ui.selection.select[lang]}</div>
          </div>
        </div>
        <div onClick={() => startPortfolio(Theme.HARDWARE)} className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5]">
          <div className="absolute inset-0 bg-[#0a192f] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-8 p-8 rounded-full border-4 border-[#64ffda] text-[#64ffda] group-hover:scale-110 group-hover:bg-[#64ffda] group-hover:text-[#0a192f] transition-all duration-500">
              <Cpu size={80} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#ccd6f6] mb-4 uppercase tracking-tighter">{ui.selection.architect[lang]}</h2>
            <div className="mt-12 px-8 py-3 bg-[#64ffda] text-[#0a192f] font-black tracking-widest group-hover:scale-105 transition-transform">{ui.selection.select[lang]}</div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
           <div className="bg-white text-black px-4 py-2 font-black text-2xl rotate-[-5deg] shadow-[5px_5px_0px_#8b4513]">{ui.selection.vs[lang]}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-transition overflow-x-hidden ${isCoffee ? 'bg-[#fdf6e3] text-[#5c3c21]' : 'bg-[#0a192f] text-[#ccd6f6]'}`}>
      
      {/* Integrated Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? (isCoffee ? 'bg-[#fdf6e3]/95 backdrop-blur-md shadow-lg py-3' : 'bg-[#0a192f]/95 backdrop-blur-md shadow-lg py-3') : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setView('selection')} className={`text-xl font-black tracking-tighter transition-all hover:scale-105 ${isCoffee ? 'text-[#5c3c21]' : 'text-[#64ffda]'}`}>
            G. FLORIANO
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'resumo', label: ui.headings.resumo[lang] },
              { id: 'experiencia', label: lang === 'pt' ? 'História' : 'History' },
              { id: 'competencias', label: lang === 'pt' ? 'Skills' : 'Skills' },
              { id: 'projetos', label: lang === 'pt' ? 'Projetos' : 'Projects' }
            ].map(item => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group
                  ${isCoffee ? 'text-[#5c3c21]/60 hover:text-[#5c3c21]' : 'text-[#ccd6f6]/60 hover:text-[#64ffda]'}
                `}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isCoffee ? 'bg-[#5c3c21]' : 'bg-[#64ffda]'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all font-black text-[9px] tracking-widest ${isCoffee ? 'border-[#5c3c21]/20 text-[#5c3c21] hover:border-[#5c3c21]' : 'border-[#64ffda]/20 text-[#64ffda] hover:border-[#64ffda]'}`}
            >
              <Globe size={12} /> {lang.toUpperCase()}
            </button>
            <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </nav>

      {/* Decorative BG */}
      {isCoffee ? (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
           <div className="absolute top-20 left-10 w-32 h-32 border-4 border-[#8b4513] rounded-full"></div>
           <div className="absolute bottom-40 right-20 w-64 h-64 border-2 border-[#8b4513] rounded-sm rotate-12"></div>
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
      )}

      {/* Hero */}
      <header className="pt-48 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex-1">
          <h1 className={`text-6xl md:text-8xl font-black mb-4 tracking-tighter leading-[0.9] ${isCoffee ? 'font-["Playfair_Display"] text-[#5c3c21]' : 'text-[#64ffda] font-["JetBrains_Mono"]'}`}>
            {PERSONAL_INFO.name.split(' ')[0]}
            <br />
            {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
          </h1>
          <div className="flex flex-wrap gap-4 mt-12">
            {[
              { icon: <Github size={18} />, label: 'Github', url: PERSONAL_INFO.github },
              { icon: <Linkedin size={18} />, label: 'Linkedin', url: PERSONAL_INFO.linkedin },
              { icon: <Mail size={18} />, label: 'Email', url: `mailto:${PERSONAL_INFO.email}` }
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-black text-xs uppercase transition-all ${isCoffee ? 'border-[#5c3c21] hover:bg-[#5c3c21] hover:text-[#fdf6e3]' : 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'}`}>
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
        
        <div className={`hidden lg:block p-10 rounded-3xl border-2 theme-transition ${isCoffee ? 'border-[#5c3c21]/20 bg-[#f7efd9]' : 'border-[#64ffda]/20 bg-[#112240] shadow-[0_0_30px_rgba(100,255,218,0.1)]'}`}>
          {isCoffee ? (
             <div className="relative"><CoffeeIcon size={120} className="text-[#8b4513]" /><div className="absolute top-[-20px] left-[20px] w-2 h-8 bg-[#8b4513]/20 rounded-full steam-particle"></div></div>
          ) : (
             <div className="relative group"><HardwareIcon size={120} className="text-[#64ffda]" /><div className="absolute inset-0 bg-[#64ffda]/10 blur-xl rounded-full"></div></div>
          )}
        </div>
      </header>

      {/* Content Sections */}
      <Section id="resumo" title={ui.headings.resumo[lang]} theme={theme}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`text-xl md:text-2xl leading-relaxed ${isCoffee ? 'font-serif italic opacity-90' : 'font-mono'}`}>
            {isCoffee ? PERSONAL_INFO.summary.coffee[lang] : PERSONAL_INFO.summary.hardware[lang]}
          </div>
          <div className={`p-8 rounded-2xl ${isCoffee ? 'bg-[#5c3c21]/5' : 'bg-[#112240] border border-[#64ffda]/20'}`}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-6 opacity-60 ${isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}`}>{ui.ai.label[lang]}</h3>
            <form onSubmit={handleAiAsk} className="flex gap-2">
              <input type="text" value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder={ui.ai.placeholder[lang]} className={`flex-grow px-4 py-3 rounded-xl bg-transparent border-2 outline-none transition-all text-sm font-bold ${isCoffee ? 'border-[#5c3c21]/20 focus:border-[#5c3c21]' : 'border-[#64ffda]/20 focus:border-[#64ffda]'}`} />
              <button disabled={isAiLoading} className={`p-3 rounded-xl transition-all ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}>
                {isAiLoading ? '...' : <Search size={20} />}
              </button>
            </form>
            {aiResponse && <div className={`mt-6 p-4 rounded-xl text-sm italic border-l-4 leading-relaxed ${isCoffee ? 'bg-white border-[#5c3c21]/50' : 'bg-[#0a192f] border-[#64ffda]'}`}>{aiResponse}</div>}
          </div>
        </div>
      </Section>

      <Section id="experiencia" title={ui.headings.trajetoria[lang]} theme={theme}>
        <div className="space-y-16 py-10">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative pl-10 border-l-2 border-current border-opacity-20 group">
              <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 ${isCoffee ? 'bg-[#fdf6e3] border-[#5c3c21]' : 'bg-[#0a192f] border-[#64ffda]'}`}></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h3 className={`text-3xl font-black ${isCoffee ? 'text-[#5c3c21]' : 'text-[#ccd6f6]'}`}>{exp.role[lang]}</h3>
                  <div className={`text-lg font-bold mt-1 ${isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}`}>{exp.company}</div>
                </div>
                <div className="text-right opacity-50 font-mono text-sm uppercase mt-4 md:mt-0">{exp.period} | {exp.location}</div>
              </div>
              <div className={`p-8 rounded-2xl border-l-4 transition-all ${isCoffee ? 'bg-[#f7efd9]/50 border-[#8b4513] hover:bg-[#f7efd9]' : 'bg-[#112240]/50 border-[#64ffda] hover:bg-[#112240]'}`}>
                <ul className="space-y-4">
                  {exp.description[lang].map((item, i) => (
                    <li key={i} className="flex gap-4 text-lg leading-snug">
                      <span className={`mt-2 h-2 w-2 rounded-full flex-shrink-0 ${isCoffee ? 'bg-[#8b4513]' : 'bg-[#64ffda]'}`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="competencias" title={ui.headings.techStack[lang]} theme={theme}>
        <div className="flex flex-col items-center">
          <div className="relative mb-20">
            <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center animate-bounce-slow ${isCoffee ? 'bg-[#8b4513] border-[#5c3c21] text-white' : 'bg-[#64ffda] border-[#0a192f] text-[#0a192f]'}`}>
              <Dna size={40} /><span className="text-[10px] font-black uppercase mt-2 tracking-tighter">{ui.skills.root[lang]}</span>
            </div>
            <div className={`absolute left-1/2 top-full -translate-x-1/2 w-[2px] h-20 ${isCoffee ? 'bg-[#8b4513]/20' : 'bg-[#64ffda]/30'}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
            {currentSkills.map((cat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className={`text-sm font-black uppercase tracking-widest px-8 py-3 rounded-full border-2 mb-12 ${isCoffee ? 'border-[#5c3c21] text-[#5c3c21]' : 'border-[#64ffda] text-[#64ffda]'}`}>{cat.category[lang]}</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {cat.items.map((skill, si) => (
                    <div key={si} className="relative group/skill">
                      <button onClick={() => handleSkillClick(skill)} className={`w-28 h-28 flex flex-col items-center justify-center rounded-2xl border-2 transition-all ${activeSkill?.name === skill.name ? (isCoffee ? 'bg-[#5c3c21] text-white border-[#5c3c21]' : 'bg-[#64ffda] text-[#0a192f] border-[#64ffda]') : (isCoffee ? 'bg-white border-[#5c3c21]/10 text-[#5c3c21] hover:border-[#5c3c21]' : 'bg-[#112240] border-[#64ffda]/10 text-[#64ffda] hover:border-[#64ffda]')}`}>
                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 mb-3 opacity-80 group-hover/skill:opacity-100" />
                        <span className="text-[10px] font-black uppercase text-center leading-none">{skill.name}</span>
                      </button>
                      {(activeSkill?.name === skill.name) && (
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 z-50 p-6 rounded-xl shadow-2xl theme-transition ${isClosingSkill ? 'animate-skill-out' : 'animate-skill-in'} ${isCoffee ? 'bg-[#f7efd9] border-2 border-[#8b4513] text-[#5c3c21]' : 'bg-[#0a192f] border-2 border-[#64ffda] text-[#64ffda]'}`}>
                          <div className="flex justify-between items-center mb-4 border-b border-current pb-2"><span className="text-[10px] font-black">{ui.stats.level[lang]}</span><X size={12} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handleSkillClose(); }} /></div>
                          <ul className="space-y-2">{skill.details?.[lang].map((d, i) => <li key={i} className="text-[10px] flex gap-2 leading-tight font-bold opacity-80"><span>•</span>{d}</li>)}</ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="projetos" title={ui.headings.questLog[lang]} theme={theme}>
        <div ref={projectsRef} className="relative py-10">
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 lg:-left-28 z-30">
            <button onClick={prevProject} className={`p-5 rounded-full transition-all border-4 shadow-xl ${isCoffee ? 'bg-[#5c3c21] text-white border-[#8b4513]' : 'bg-[#64ffda] text-[#0a192f] border-white/20'}`}><ChevronLeft size={40} /></button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 lg:-right-28 z-30">
            <button onClick={nextProject} className={`p-5 rounded-full transition-all border-4 shadow-xl ${isCoffee ? 'bg-[#5c3c21] text-white border-[#8b4513]' : 'bg-[#64ffda] text-[#0a192f] border-white/20'}`}><ChevronRight size={40} /></button>
          </div>
          {currentProjects[activeProjectIndex] && (
            <div onClick={() => setSelectedProject(currentProjects[activeProjectIndex])} className={`relative rounded-3xl overflow-hidden cursor-pointer theme-transition border-4 ${isCoffee ? 'bg-[#fdf6e3] border-[#8b4513] shadow-2xl' : 'bg-[#112240] border-[#64ffda] shadow-[0_0_50px_rgba(100,255,218,0.1)]'}`}>
              <div className="flex flex-col md:flex-row min-h-[500px]">
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-current opacity-90">
                  <div><h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">{currentProjects[activeProjectIndex].title}</h3><ul className="space-y-4">{currentProjects[activeProjectIndex].description[lang].map((d, i) => <li key={i} className="text-lg opacity-80 leading-snug">• {d}</li>)}</ul></div>
                  <div className="flex flex-wrap gap-2 mt-8">{currentProjects[activeProjectIndex].tech.map((t, i) => <span key={i} className="text-[10px] font-black uppercase px-2 py-1 rounded border border-current opacity-60">{t}</span>)}</div>
                </div>
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center opacity-80">
                  <div className="grid grid-cols-2 gap-8">{Object.entries(currentProjects[activeProjectIndex].rpgStats).map(([key, val], i) => val && typeof val === 'object' && <div key={i}><div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{key}</div><div className="text-lg font-bold">{(val as any)[lang]}</div></div>)}</div>
                  <div className="mt-12 text-center text-[10px] font-black uppercase animate-pulse flex items-center justify-center gap-2">{ui.stats.inspect[lang]} <ArrowRight size={14} /></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>
          <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12 border-4 ${isCoffee ? 'bg-[#fdf6e3] border-[#8b4513]' : 'bg-[#0a192f] border-[#64ffda]'}`}>
            <button onClick={() => setSelectedProject(null)} className={`absolute top-8 right-8 p-2 rounded-full z-10 ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}><X size={24} /></button>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2 relative aspect-video rounded-2xl overflow-hidden border-2 border-current border-opacity-20 bg-black">
                {selectedProject.images?.map((img, i) => <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} />)}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">{selectedProject.images.map((_, i) => <button key={i} onClick={() => setCurrentImageIndex(i)} className={`w-3 h-3 rounded-full border-2 transition-all ${i === currentImageIndex ? 'bg-white border-white scale-125' : 'bg-transparent border-white/50'}`} />)}</div>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedProject.title}</h2>
                <p className="text-lg opacity-80 leading-relaxed mb-10">{selectedProject.longDescription[lang]}</p>
                {selectedProject.githubUrl && <a href={selectedProject.githubUrl} target="_blank" className={`inline-flex items-center gap-4 px-8 py-4 rounded-xl font-black transition-all ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}><Github size={20} /> {ui.modal.github[lang]}</a>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-24 px-6 border-t border-current border-opacity-10 ${isCoffee ? 'bg-[#fdf6e3]' : 'bg-[#0a192f]'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">G. FLORIANO</h2>
            <p className="text-lg opacity-60 leading-relaxed mb-10 max-w-md">{ui.footer.discuss[lang]}</p>
            <div className="flex gap-6">
              {[<Github size={24} />, <Linkedin size={24} />, <Mail size={24} />].map((icon, i) => <button key={i} className="hover:scale-110 transition-transform opacity-70 hover:opacity-100">{icon}</button>)}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40">{ui.footer.links[lang]}</h4>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
              {['resumo', 'experiencia', 'competencias', 'projetos'].map(id => <button key={id} onClick={() => scrollToSection(id)} className="text-left hover:translate-x-2 transition-transform opacity-60 hover:opacity-100">{id}</button>)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black opacity-30 uppercase mb-8 leading-loose tracking-widest">{ui.footer.note[lang]}</p>
            <button onClick={() => setView('selection')} className={`px-6 py-2 rounded-full border-2 font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all ${isCoffee ? 'border-[#5c3c21] text-[#5c3c21]' : 'border-[#64ffda] text-[#64ffda]'}`}>
              {lang === 'pt' ? 'Mudar Personagem' : 'Change Character'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
