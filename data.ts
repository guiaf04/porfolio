
import { Experience, Project, Skill, Theme } from './types';

export const PERSONAL_INFO = {
  name: "Guilherme Araújo Floriano",
  email: "guilhermearaujo.floriano@gmail.com",
  linkedin: "https://www.linkedin.com/in/guilhermearaujo-dev/",
  github: "https://github.com/guiaf04",
  phone: "+55 (88) 98124-5517",
  summary: {
    coffee: "Sou um desenvolvedor Backend Java com mais de dois anos de experiência na ZG Soluções, focado na construção de sistemas robustos, escaláveis e de alto processamento. Especialista em ecossistemas Spring Boot, mensageria com Kafka e processamento assíncrono de grandes volumes de dados. Minha missão é transformar requisitos complexos em soluções eficientes, com o cuidado e a precisão de um barista preparando o café perfeito.",
    hardware: "Engenheiro de Sistemas Embarcados com profunda expertise em programação de baixo nível e design de hardware. Proficiente no desenvolvimento de microcontroladores (STM32, ESP32, Pi Pico) e SoCs, atuando desde o bare-metal até sistemas operacionais de tempo real (FreeRTOS) e Linux Embarcado. Experiência sólida em design de processadores com VHDL e síntese lógica em FPGAs."
  }
};

export const EXPERIENCES: Experience[] = [
  {
    company: "ZG Soluções",
    role: "Desenvolvedor Backend Java",
    period: "Março 2023 – Atualmente",
    location: "Ceará, Brasil",
    description: [
      "Desenvolvimento de soluções robustas para reconciliação de contas médicas, otimizando o ciclo de receita de hospitais.",
      "Engenharia de workflows de processamento de dados de alta performance utilizando Java e Groovy.",
      "Criação de Web Crawlers para leitura e submissão automatizada de centenas de guias médicas em minutos.",
      "Implementação de processamento assíncrono com Kafka para garantir resiliência do sistema.",
      "Manipulação avançada de arquivos PDF, CSV, XML e HTML com foco em performance."
    ]
  },
  {
    company: "Programa de Iniciação à Docência (UFC)",
    role: "Monitor de Arquitetura de Computadores",
    period: "Março 2023 – Novembro 2024",
    location: "Quixadá, CE",
    description: [
      "Instrução de alunos em aulas práticas sobre operação de equipamentos eletrônicos e design de circuitos digitais.",
      "Auxílio no desenvolvimento de projetos práticos envolvendo microcontroladores e lógica digital."
    ]
  }
];

export const PROJECTS: Project[] = [
  // COFFEE / BACKEND PROJECTS
  {
    title: "Medical Billing Processor",
    date: "Jan 2024",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    theme: Theme.COFFEE,
    githubUrl: "https://github.com/guiaf04",
    images: [
      "https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ],
    description: [
      "Sistema de processamento paralelo de faturas médicas em larga escala.",
      "Integração com múltiplos gateways de pagamento e reconciliação automática."
    ],
    longDescription: "Este projeto foi desenvolvido para resolver o gargalo de processamento em instituições de saúde de grande porte. Utilizando uma arquitetura orientada a eventos com Kafka, conseguimos desacoplar a recepção de arquivos da lógica de negócio pesada.",
    rpgStats: {
      xpGained: "+5000 Kafka Mastery",
      manaCost: "160h / High Intensity",
      questLevel: "Legendary",
      techClass: "Data Necromancer"
    }
  },
  {
    title: "Java Crawler Engine",
    date: "Jul 2023",
    tech: ["Java", "Groovy", "Selenium", "Redis"],
    theme: Theme.COFFEE,
    githubUrl: "https://github.com/guiaf04",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518433278988-d1430030096d?auto=format&fit=crop&q=80&w=800"
    ],
    description: [
      "Motor de scraping dinâmico para portais médicos com bypass de CAPTCHA.",
      "Arquitetura escalável para rodar instâncias via Kubernetes."
    ],
    longDescription: "Desenvolvi um motor de automação capaz de navegar em sistemas legados governamentais e de operadoras de saúde.",
    rpgStats: {
      xpGained: "+3500 Automation Insight",
      manaCost: "80h / Medium Focus",
      questLevel: "Epic",
      techClass: "Web Shadow"
    }
  },
  // HARDWARE / EMBEDDED PROJECTS
  {
    title: "Multisensorial Robot (Micro-ROS)",
    date: "Out 2024",
    tech: ["Micro-ROS", "Raspberry Pi Pico W", "C++", "LIDAR"],
    theme: Theme.HARDWARE,
    githubUrl: "https://github.com/guiaf04",
    images: [
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
    ],
    description: [
      "Robô móvel com Micro-ROS e mapeamento LIDAR.",
      "Premiado com o 2º lugar na competição XV SBESC."
    ],
    longDescription: "Projeto de ponta integrando a stack ROS2 em microcontroladores de baixo custo.",
    rpgStats: {
      xpGained: "+8000 Real-Time Sync",
      manaCost: "200h / Extreme Precision",
      questLevel: "Legendary",
      techClass: "Silicon Warden"
    }
  },
  {
    title: "MIPS 32-bit Processor",
    date: "Jun 2024",
    tech: ["VHDL", "Vivado", "FPGAs"],
    theme: Theme.HARDWARE,
    githubUrl: "https://github.com/guiaf04",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800"
    ],
    description: [
      "Projeto de processador MIPS 32 bits em VHDL.",
      "Pipeline de 5 estágios validado em FPGA."
    ],
    longDescription: "Uma imersão profunda em arquitetura de computadores. Desenvolvi toda a lógica de um processador MIPS funcional do zero.",
    rpgStats: {
      xpGained: "+4500 Logic Mastery",
      manaCost: "120h / Deep Thinking",
      questLevel: "Epic",
      techClass: "Gate Weaver"
    }
  }
];

export const COFFEE_SKILLS: Skill[] = [
  {
    category: "Linguagens & Core",
    items: [
      { 
        name: "Java 17+", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        level: 'Master',
        details: ["Streams API & Lambdas", "JVM Performance Tuning", "Multithreading & Concurrency"]
      },
      { 
        name: "Groovy", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/groovy/groovy-original.svg",
        level: 'Advanced',
        details: ["Dynamic Scripting", "Custom DSLs", "Integration with Jenkins"]
      },
      { 
        name: "SQL", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        level: 'Advanced',
        details: ["Complex Queries", "Query Optimization", "Relational Mapping"]
      }
    ]
  },
  {
    category: "Frameworks & Tools",
    items: [
      { 
        name: "Spring Boot", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        level: 'Master',
        details: ["Spring Security & OAuth2", "Microservices with Spring Cloud", "Data JPA & Hibernate"]
      },
      { 
        name: "Apache Kafka", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        level: 'Advanced',
        details: ["Event-Driven Architectures", "Consumer Groups & Offsets", "Resilient Message Processing"]
      },
      { 
        name: "Docker", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: 'Intermediate',
        details: ["Containerization", "Docker Compose", "Resource Optimization"]
      }
    ]
  }
];

export const HARDWARE_SKILLS: Skill[] = [
  {
    category: "Low Level",
    items: [
      { 
        name: "C/C++", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        level: 'Master',
        details: ["Pointer Management", "Direct Register Access", "Algorithm Efficiency"]
      },
      { 
        name: "Assembly", 
        icon: "https://img.icons8.com/ios-filled/50/processor.png",
        level: 'Advanced',
        details: ["ISA Understanding (MIPS/RISC-V)", "Optimization for Critical Sections", "Debugger & Disassembler"]
      },
      { 
        name: "VHDL", 
        icon: "https://img.icons8.com/ios/50/chip.png",
        level: 'Advanced',
        details: ["FSM Design", "Synthesizable Logic", "Vivado & ModelSim Workflows"]
      }
    ]
  },
  {
    category: "Platforms & Systems",
    items: [
      { 
        name: "FreeRTOS", 
        icon: "https://img.icons8.com/color/48/freertos.png",
        level: 'Advanced',
        details: ["Task Scheduling", "Inter-task Comm (Mutex/Queues)", "Real-time Constraints"]
      },
      { 
        name: "STM32", 
        icon: "https://img.icons8.com/color/48/stm32.png",
        level: 'Advanced',
        details: ["HAL & LL Libraries", "DMA & Interrupts", "Peripherals (I2C, SPI, UART)"]
      },
      { 
        name: "Embedded Linux", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        level: 'Intermediate',
        details: ["Kernel Compilation", "Device Trees", "Buildroot/Yocto Basics"]
      }
    ]
  }
];
