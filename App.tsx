
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
  Cpu,
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
  Globe
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [view, setView] = useState<'selection' | 'portfolio'>('selection');
  const [theme, setTheme] = useState<Theme>(Theme.COFFEE);
  const [lang, setLang] = useState<Language>('pt');
  const isCoffee = theme === Theme.COFFEE;

  // Selected Project for Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project Carousel State
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Tech Skill Selection
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  // Animation state
  const [isProjectsInView, setIsProjectsInView] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  // AI Interaction State
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
      trajetoria: { pt: "Trajetória", en: "Path" },
      techStack: { pt: "Tech Stack", en: "Tech Stack" },
      questLog: { pt: "Quest Log", en: "Quest Log" }
    },
    ai: {
      label: { pt: isCoffee ? "Assistente Barista" : "Assistente Binário", en: isCoffee ? "Barista Assistant" : "Binary Assistant" },
      placeholder: { pt: isCoffee ? "Ex: Como ele usa Kafka?" : "Ex: Qual sua experiência com FPGAs?", en: isCoffee ? "Ex: How does he use Kafka?" : "Ex: What's his experience with FPGAs?" },
      error: { pt: "Erro ao conectar com a IA.", en: "Error connecting to AI." }
    },
    stats: {
      xp: { pt: "XP Ganho", en: "XP Gained" },
      mana: { pt: "Mana / Tempo", en: "Mana / Time" },
      difficulty: { pt: "Dificuldade", en: "Difficulty" },
      class: { pt: "Classe", en: "Class" },
      completion: { pt: "Progresso", en: "Progress" },
      inspect: { pt: "Clique para inspecionar missão", en: "Click to inspect quest" },
      level: { pt: "NÍVEL", en: "LEVEL" }
    },
    footer: {
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
    }
  };

  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.COFFEE ? Theme.HARDWARE : Theme.COFFEE);
    setActiveSkill(null);
    setActiveProjectIndex(0);
  };

  const startPortfolio = (chosenTheme: Theme) => {
    setTheme(chosenTheme);
    setView('portfolio');
  };

  // Filtered Content
  const currentSkills = isCoffee ? COFFEE_SKILLS : HARDWARE_SKILLS;
  const currentProjects = PROJECTS.filter(p => p.theme === theme);

  // Observe Projects Section Visibility
  useEffect(() => {
    if (view === 'portfolio') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsProjectsInView(true);
          }
        },
        { threshold: 0.1 }
      );

      if (projectsRef.current) {
        observer.observe(projectsRef.current);
      }

      return () => {
        if (projectsRef.current) observer.unobserve(projectsRef.current);
      };
    }
  }, [theme, view]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setActiveSkill(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        Você é o assistente virtual do Guilherme Araújo Floriano.
        Informações contextuais:
        Nome: ${PERSONAL_INFO.name}
        Idioma de resposta: ${lang === 'pt' ? 'Português' : 'Inglês'}
        Tema atual visualizado pelo usuário: ${isCoffee ? 'Backend Java/Cafeteria' : 'Sistemas Embarcados/Hardware'}
        Resumo: ${isCoffee ? PERSONAL_INFO.summary.coffee[lang] : PERSONAL_INFO.summary.hardware[lang]}
        Experiência: ${JSON.stringify(EXPERIENCES)}
        Projetos de ${theme}: ${JSON.stringify(currentProjects)}
        Habilidades de ${theme}: ${JSON.stringify(currentSkills)}

        Responda à seguinte pergunta do usuário sobre o Guilherme de forma curta e profissional: "${aiQuestion}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 1000 }
        }
      });
      
      setAiResponse(response.text || (lang === 'pt' ? "Desculpe, não consegui processar isso." : "Sorry, I couldn't process that."));
    } catch (err) {
      console.error(err);
      setAiResponse(ui.ai.error[lang]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const nextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % currentProjects.length);
  };

  const prevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + currentProjects.length) % currentProjects.length);
  };

  const nextImage = () => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
  };

  const prevImage = () => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
  };

  if (view === 'selection') {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col md:flex-row overflow-hidden font-['JetBrains_Mono']">
        <button 
          onClick={toggleLang}
          className="absolute top-6 left-6 z-[1100] flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/20 transition-all backdrop-blur-md"
        >
          <Globe size={16} /> {lang.toUpperCase()}
        </button>

        {/* JAVA / COFFEE SIDE */}
        <div 
          onClick={() => startPortfolio(Theme.COFFEE)}
          className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5] border-r border-white/10"
        >
          <div className="absolute inset-0 bg-[#5c3c21] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,69,19,0.3)_0%,transparent_70%)]"></div>
          
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-8 p-8 rounded-full border-4 border-[#8b4513] text-[#8b4513] group-hover:scale-110 group-hover:bg-[#8b4513] group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(139,69,19,0.2)]">
              <CoffeeIcon size={80} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#fdf6e3] mb-4 tracking-tighter uppercase">{ui.selection.barista[lang]}</h2>
            <p className="text-[#8b4513] font-bold text-xl mb-8">JAVA BACKEND DEVELOPER</p>
            
            <div className="mt-12 px-8 py-3 bg-white text-black font-black tracking-widest group-hover:scale-105 transition-transform">
              {ui.selection.select[lang]}
            </div>
          </div>
        </div>

        {/* EMBEDDED / HARDWARE SIDE */}
        <div 
          onClick={() => startPortfolio(Theme.HARDWARE)}
          className="relative flex-1 group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.5]"
        >
          <div className="absolute inset-0 bg-[#0a192f] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,255,218,0.2)_0%,transparent_70%)]"></div>
          
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-8 p-8 rounded-full border-4 border-[#64ffda] text-[#64ffda] group-hover:scale-110 group-hover:bg-[#64ffda] group-hover:text-[#0a192f] transition-all duration-500 shadow-[0_0_30px_rgba(100,255,218,0.3)]">
              <Cpu size={80} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#ccd6f6] mb-4 tracking-tighter uppercase">{ui.selection.architect[lang]}</h2>
            <p className="text-[#64ffda] font-bold text-xl mb-8">EMBEDDED SYSTEMS ENGINEER</p>
            
            <div className="mt-12 px-8 py-3 bg-[#64ffda] text-[#0a192f] font-black tracking-widest group-hover:scale-105 transition-transform">
              {ui.selection.select[lang]}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
           <div className="bg-white text-black px-4 py-2 font-black text-2xl rotate-[-5deg] shadow-[5px_5px_0px_#8b4513]">{ui.selection.vs[lang]}</div>
        </div>
      </div>
    );
  }

  const activeProject = currentProjects[activeProjectIndex];

  return (
    <div className={`min-h-screen theme-transition overflow-x-hidden ${isCoffee ? 'bg-[#fdf6e3] text-[#5c3c21]' : 'bg-[#0a192f] text-[#ccd6f6]'}`}>
      
      {/* Background Decor */}
      {isCoffee ? (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
           <div className="absolute top-20 left-10 w-32 h-32 border-4 border-[#8b4513] rounded-full"></div>
           <div className="absolute bottom-40 right-20 w-64 h-64 border-2 border-[#8b4513] rounded-sm rotate-12"></div>
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(100,255,218,0.1)_0,transparent_70%)]"></div>
        </div>
      )}

      {/* Custom Fixed Language Toggle */}
      <div className="fixed top-24 right-6 z-50">
        <button 
          onClick={toggleLang}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all font-black text-[10px] tracking-widest ${isCoffee ? 'border-[#5c3c21] text-[#5c3c21] bg-white' : 'border-[#64ffda] text-[#64ffda] bg-[#0a192f]'}`}
        >
          <Globe size={14} /> {lang === 'pt' ? 'PORTUGUÊS' : 'ENGLISH'}
        </button>
      </div>

      <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />

      {/* Hero Header */}
      <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex-1">
          <h1 className={`text-6xl md:text-8xl font-black mb-4 tracking-tighter ${isCoffee ? 'font-["Playfair_Display"] text-[#5c3c21]' : 'text-[#64ffda] font-["JetBrains_Mono"]'}`}>
            {PERSONAL_INFO.name.split(' ')[0]}
            <br />
            {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
          </h1>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isCoffee ? 'border-[#5c3c21] hover:bg-[#5c3c21] hover:text-[#fdf6e3]' : 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'}`}>
              <Github size={18} /> Github
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isCoffee ? 'border-[#5c3c21] hover:bg-[#5c3c21] hover:text-[#fdf6e3]' : 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'}`}>
              <Linkedin size={18} /> Linkedin
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${isCoffee ? 'border-[#5c3c21] hover:bg-[#5c3c21] hover:text-[#fdf6e3]' : 'border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10'}`}>
              <Mail size={18} /> {lang === 'pt' ? 'Contato' : 'Contact'}
            </a>
          </div>
        </div>
        
        <div className={`hidden lg:block p-8 rounded-2xl border-2 transition-all duration-700 ${isCoffee ? 'border-[#5c3c21]/20 bg-[#f7efd9]' : 'border-[#64ffda]/20 bg-[#112240] shadow-[0_0_30px_rgba(100,255,218,0.1)]'}`}>
          {isCoffee ? (
             <div className="relative">
                <CoffeeIcon size={120} className="text-[#8b4513]" />
                <div className="absolute top-[-20px] left-[20px] w-2 h-8 bg-[#8b4513]/20 rounded-full steam-particle" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-[-30px] left-[50px] w-2 h-10 bg-[#8b4513]/20 rounded-full steam-particle" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-[-25px] left-[80px] w-2 h-9 bg-[#8b4513]/20 rounded-full steam-particle" style={{animationDelay: '1s'}}></div>
             </div>
          ) : (
             <div className="relative group">
                <HardwareIcon size={120} className="text-[#64ffda] group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-[#64ffda]/10 blur-xl rounded-full"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#64ffda] rounded-sm animate-pulse"></div>
             </div>
          )}
        </div>
      </header>

      {/* Resumo Section */}
      <Section id="resumo" title={ui.headings.resumo[lang]} theme={theme}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`text-xl md:text-2xl leading-relaxed ${isCoffee ? 'font-serif italic' : 'font-mono'}`}>
            {isCoffee ? PERSONAL_INFO.summary.coffee[lang] : PERSONAL_INFO.summary.hardware[lang]}
          </div>
          <div className={`p-6 rounded-xl ${isCoffee ? 'bg-[#5c3c21]/5' : 'bg-[#112240] border border-[#64ffda]/20'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}`}>{ui.ai.label[lang]}:</h3>
            <form onSubmit={handleAiAsk} className="flex gap-2">
              <input 
                type="text" 
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder={ui.ai.placeholder[lang]}
                className={`flex-grow px-4 py-2 rounded-lg bg-transparent border outline-none transition-all ${isCoffee ? 'border-[#5c3c21]/30 focus:border-[#5c3c21]' : 'border-[#64ffda]/30 focus:border-[#64ffda]'}`}
              />
              <button disabled={isAiLoading} className={`p-2 rounded-lg transition-all ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}>
                {isAiLoading ? '...' : <Search size={20} />}
              </button>
            </form>
            {aiResponse && (
              <div className={`mt-4 p-3 rounded text-sm italic border-l-4 ${isCoffee ? 'bg-white border-[#5c3c21]/50' : 'bg-[#0a192f] border-[#64ffda]'}`}>
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Experiência Section */}
      <Section id="experiencia" title={ui.headings.trajetoria[lang]} theme={theme}>
        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute -left-4 top-0 bottom-0 w-[2px] ${isCoffee ? 'bg-[#5c3c21]/10' : 'bg-[#64ffda]/10'}`}></div>
              <div className="pl-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className={`text-2xl font-bold ${isCoffee ? 'text-[#5c3c21]' : 'text-[#ccd6f6]'}`}>
                    {exp.role[lang]} <span className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}>@ {exp.company}</span>
                  </h3>
                  <span className={`text-sm font-mono opacity-60`}>{exp.period}</span>
                </div>
                <div className="flex items-center gap-4 text-sm mb-4 opacity-70">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>
                </div>
                <ul className="space-y-3">
                  {exp.description[lang].map((item, i) => (
                    <li key={i} className="flex gap-3 text-lg leading-relaxed opacity-80">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 ${isCoffee ? 'bg-[#8b4513]' : 'bg-[#64ffda]'}`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Competências Section */}
      <Section id="competencias" title={ui.headings.techStack[lang]} theme={theme}>
        <div className="grid md:grid-cols-2 gap-12">
          {currentSkills.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className={`text-2xl font-black mb-8 border-l-4 pl-4 ${isCoffee ? 'border-[#5c3c21] text-[#5c3c21]' : 'border-[#64ffda] text-[#64ffda]'}`}>
                {cat.category[lang]}
              </h3>
              <div className="flex flex-wrap gap-4">
                {cat.items.map((skill, si) => (
                  <div key={si} className="relative">
                    <button
                      onClick={() => setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                      className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-black transition-all duration-300 border-2
                        ${activeSkill?.name === skill.name ? 
                          (isCoffee ? 'bg-[#5c3c21] text-white border-[#5c3c21] shadow-lg scale-105' : 'bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-[0_0_20px_rgba(100,255,218,0.5)] scale-105') : 
                          (isCoffee ? 'bg-white border-[#5c3c21]/20 text-[#5c3c21] hover:border-[#5c3c21]/60' : 'bg-[#112240] border-[#64ffda]/20 text-[#64ffda] hover:border-[#64ffda]/60')
                        }
                      `}
                    >
                      <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                      {skill.name}
                      {isCoffee ? <Sword size={14} className="opacity-50" /> : <Terminal size={14} className="opacity-50" />}
                    </button>

                    {/* Themed RPG/Cyberpunk Detailed Menu */}
                    {activeSkill?.name === skill.name && (
                      <div className={`absolute top-full left-0 mt-4 w-72 z-50 p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300
                        ${isCoffee ? 
                          'bg-[#f7efd9] border-4 border-[#8b4513] rounded-sm text-[#5c3c21] font-serif shadow-[8px_8px_0px_#5c3c21]' : 
                          'bg-[#0a192f] border-2 border-[#64ffda] rounded-none text-[#64ffda] font-mono shadow-[0_0_30px_rgba(100,255,218,0.2)]'
                        }
                      `}>
                        <div className="flex items-center justify-between mb-4 border-b pb-2 border-current">
                           <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                             {isCoffee ? <Sparkles size={14} /> : <Activity size={14} />}
                             {ui.stats.level[lang]}: {skill.level}
                           </span>
                           <X 
                             size={16} 
                             className="cursor-pointer hover:rotate-90 transition-transform" 
                             onClick={(e) => { e.stopPropagation(); setActiveSkill(null); }} 
                           />
                        </div>
                        <ul className="space-y-3">
                           {skill.details?.[lang].map((detail, di) => (
                             <li key={di} className="text-sm flex gap-2">
                               <span className="flex-shrink-0">{isCoffee ? '🛡️' : '>>'}</span>
                               {detail}
                             </li>
                           ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projetos Section - QUEST LOG CAROUSEL */}
      <Section id="projetos" title={ui.headings.questLog[lang]} theme={theme}>
        <div ref={projectsRef} className="relative max-w-5xl mx-auto py-10">
          
          {/* Carousel Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
            <button 
              onClick={prevProject}
              className={`p-4 rounded-full transition-all hover:scale-110 active:scale-95 ${isCoffee ? 'bg-[#5c3c21] text-white shadow-lg' : 'bg-[#64ffda] text-[#0a192f] shadow-[0_0_20px_rgba(100,255,218,0.4)]'}`}
            >
              <ChevronLeft size={32} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
            <button 
              onClick={nextProject}
              className={`p-4 rounded-full transition-all hover:scale-110 active:scale-95 ${isCoffee ? 'bg-[#5c3c21] text-white shadow-lg' : 'bg-[#64ffda] text-[#0a192f] shadow-[0_0_20px_rgba(100,255,218,0.4)]'}`}
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Active Quest Card */}
          {activeProject && (
            <div 
              onClick={() => setSelectedProject(activeProject)}
              className={`relative w-full rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer animate-in zoom-in-95 fade-in
                ${isCoffee ? 
                  'bg-[#fdf6e3] border-4 border-[#8b4513] shadow-[15px_15px_0px_rgba(139,69,19,0.2)]' : 
                  'bg-[#112240] border-2 border-[#64ffda] shadow-[0_0_50px_rgba(100,255,218,0.1)]'
                }
              `}
            >
              <div className="flex flex-col md:flex-row min-h-[500px]">
                
                {/* Left Side: Visual / Header */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-current opacity-90">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Trophy className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'} size={24} />
                      <span className="text-xs font-black uppercase tracking-[0.3em]">{activeProject.rpgStats.questLevel} QUEST</span>
                    </div>
                    <h3 className={`text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter ${isCoffee ? 'font-["Playfair_Display"]' : 'font-["JetBrains_Mono"]'}`}>
                      {activeProject.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-8 text-sm font-mono opacity-60">
                      <Calendar size={14} /> {activeProject.date}
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {activeProject.description[lang].map((desc, di) => (
                        <li key={di} className="flex gap-3 text-lg leading-tight">
                          <span className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}>{isCoffee ? '✒️' : '>>'}</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t, ti) => (
                      <span key={ti} className={`text-[10px] font-black uppercase px-2 py-1 rounded border border-current opacity-70`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: RPG STATS PANEL */}
                <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center ${isCoffee ? 'bg-[#5c3c21]/5' : 'bg-[#0a192f]/30'}`}>
                  <h4 className="text-xs uppercase font-black tracking-widest mb-10 opacity-50 flex items-center gap-2">
                    {isCoffee ? <ScrollText size={16} /> : <Monitor size={16} />} 
                    Project Characteristics
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'} size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{ui.stats.xp[lang]}</span>
                      </div>
                      <div className="text-xl font-bold">{activeProject.rpgStats.xpGained[lang]}</div>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'} size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{ui.stats.mana[lang]}</span>
                      </div>
                      <div className="text-xl font-bold">{activeProject.rpgStats.manaCost[lang]}</div>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'} size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{ui.stats.difficulty[lang]}</span>
                      </div>
                      <div className="text-xl font-bold">{activeProject.rpgStats.questLevel}</div>
                    </div>

                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <Skull className={isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'} size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">{ui.stats.class[lang]}</span>
                      </div>
                      <div className="text-xl font-bold">{activeProject.rpgStats.techClass[lang]}</div>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className={`flex-grow h-2 rounded-full bg-white/10 overflow-hidden`}>
                       <div 
                          className={`h-full transition-all duration-1000 ${isCoffee ? 'bg-[#5c3c21]' : 'bg-[#64ffda]'}`}
                          style={{ width: activeProject.rpgStats.questLevel === 'Legendary' ? '100%' : activeProject.rpgStats.questLevel === 'Epic' ? '75%' : '50%' }}
                       ></div>
                    </div>
                    <span className="text-xs font-black opacity-50 uppercase">{ui.stats.completion[lang]}</span>
                  </div>

                  <div className="mt-12 flex justify-center">
                     <div className={`px-6 py-2 rounded-full font-black text-xs uppercase border-2 flex items-center gap-2 animate-pulse ${isCoffee ? 'border-[#5c3c21] text-[#5c3c21]' : 'border-[#64ffda] text-[#64ffda]'}`}>
                        {ui.stats.inspect[lang]} <ArrowRight size={14} />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Indicators */}
          <div className="mt-8 flex justify-center gap-4">
            {currentProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProjectIndex(i)}
                className={`h-2 transition-all duration-300 rounded-full ${activeProjectIndex === i ? (isCoffee ? 'bg-[#5c3c21] w-12' : 'bg-[#64ffda] w-12') : 'bg-current opacity-20 w-4'}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl theme-transition ${isCoffee ? 'bg-[#fdf6e3] border-4 border-[#8b4513]' : 'bg-[#0a192f] border-2 border-[#64ffda]/30'}`}>
            <button 
              onClick={() => setSelectedProject(null)}
              className={`absolute top-6 right-6 p-2 rounded-full transition-all z-10 ${isCoffee ? 'bg-[#5c3c21] text-white hover:rotate-90' : 'bg-[#64ffda] text-[#0a192f] hover:scale-110'}`}
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                {/* Left Side: Image Carousel */}
                <div className="w-full md:w-1/2">
                  <div className="relative group/carousel h-full min-h-[300px] flex flex-col">
                    <div className={`relative aspect-video rounded-2xl overflow-hidden border flex-grow ${isCoffee ? 'border-[#5c3c21]/20' : 'border-[#64ffda]/20'}`}>
                      {selectedProject.images && selectedProject.images.length > 0 ? (
                        <>
                          <img 
                            src={selectedProject.images[currentImageIndex]} 
                            alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`} 
                            className="w-full h-full object-cover transition-all duration-500"
                          />
                          
                          {selectedProject.images.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}
                              >
                                <ChevronLeft size={24} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all ${isCoffee ? 'bg-[#5c3c21] text-white' : 'bg-[#64ffda] text-[#0a192f]'}`}
                              >
                                <ChevronRight size={24} />
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          {lang === 'pt' ? 'Sem imagens' : 'No images'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <span className={`text-sm font-mono mb-2 ${isCoffee ? 'text-[#8b4513]' : 'text-[#64ffda]'}`}>
                    {selectedProject.date}
                  </span>
                  <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isCoffee ? 'font-["Playfair_Display"] text-[#5c3c21]' : 'text-[#64ffda] font-["JetBrains_Mono"]'}`}>
                    {selectedProject.title}
                  </h2>
                  
                  <div className={`mb-8 text-lg leading-relaxed opacity-90 ${isCoffee ? 'font-serif italic' : 'font-mono'}`}>
                    {selectedProject.longDescription[lang]}
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">{ui.modal.techStack[lang]}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, ti) => (
                        <span key={ti} className={`px-3 py-1 rounded-lg text-sm font-bold border ${isCoffee ? 'border-[#5c3c21] bg-[#5c3c21]/5 text-[#5c3c21]' : 'border-[#64ffda] bg-[#64ffda]/5 text-[#64ffda]'}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex gap-4">
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex-grow flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${isCoffee ? 'bg-[#5c3c21] text-[#fdf6e3] hover:shadow-lg hover:-translate-y-1' : 'bg-[#64ffda] text-[#0a192f] hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] hover:-translate-y-1'}`}
                      >
                        <Github size={20} /> {ui.modal.github[lang]}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-20 text-center px-6 transition-all ${isCoffee ? 'bg-[#5c3c21] text-[#fdf6e3]' : 'bg-[#0a192f] text-[#64ffda]'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{ui.footer.collab[lang]}</h2>
          <p className="mb-8 opacity-70">{ui.footer.discuss[lang]}</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:scale-110 transition-transform"><Mail size={24} /></a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Linkedin size={24} /></a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Github size={24} /></a>
          </div>
          <p className="text-sm opacity-40 font-mono italic">
            {ui.footer.note[lang]}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
