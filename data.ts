
import { Experience, Project, Skill, Theme } from './types';

export const PERSONAL_INFO = {
  name: "Guilherme Araújo Floriano",
  email: "guilhermearaujo.floriano@gmail.com",
  linkedin: "https://www.linkedin.com/in/guilhermearaujo-dev/",
  github: "https://github.com/guiaf04",
  phone: "+55 (88) 98124-5517",
  summary: {
    coffee: {
      pt: "Sou um desenvolvedor Backend Java com mais de dois anos de experiência na ZG Soluções, focado na construção de sistemas robustos, escaláveis e de alto processamento. Especialista em ecossistemas Spring Boot, mensageria com Kafka e processamento assíncrono de grandes volumes de dados. Minha missão é transformar requisitos complexos em soluções eficientes, com o cuidado e a precisão de um barista preparando o café perfeito.",
      en: "I am a Java Backend Developer with over two years of experience at ZG Soluções, focused on building robust, scalable, and high-processing systems. Specialist in Spring Boot ecosystems, Kafka messaging, and asynchronous processing of large data volumes. My mission is to transform complex requirements into efficient solutions, with the care and precision of a barista preparing the perfect coffee."
    },
    hardware: {
      pt: "Engenheiro de Sistemas Embarcados com profunda expertise em programação de baixo nível e design de hardware. Proficiente no desenvolvimento de microcontroladores (STM32, ESP32, Pi Pico) e SoCs, atuando desde o bare-metal até sistemas operacionais de tempo real (FreeRTOS) e Linux Embarcado. Experiência sólida em design de processadores com VHDL e síntese lógica em FPGAs.",
      en: "Embedded Systems Engineer with deep expertise in low-level programming and hardware design. Proficient in developing microcontrollers (STM32, ESP32, Pi Pico) and SoCs, working from bare-metal to real-time operating systems (FreeRTOS) and Embedded Linux. Solid experience in processor design with VHDL and logic synthesis in FPGAs."
    }
  }
};

export const EXPERIENCES: Experience[] = [
  {
    company: "ZG Soluções",
    role: { pt: "Desenvolvedor Backend Java", en: "Java Backend Developer" },
    period: "2023 – Present",
    location: "Ceará, Brazil",
    description: {
      pt: [
        "Desenvolvimento de soluções robustas para reconciliação de contas médicas, otimizando o ciclo de receita de hospitais.",
        "Engenharia de workflows de processamento de dados de alta performance utilizando Java e Groovy.",
        "Criação de Web Crawlers para leitura e submissão automatizada de centenas de guias médicas em minutos.",
        "Implementação de processamento assíncrono com Kafka para garantir resiliência do sistema.",
        "Manipulação avançada de arquivos PDF, CSV, XML e HTML com foco em performance."
      ],
      en: [
        "Development of robust solutions for medical billing reconciliation, optimizing hospital revenue cycles.",
        "Engineering high-performance data processing workflows using Java and Groovy.",
        "Creation of Web Crawlers for automated reading and submission of hundreds of medical guides in minutes.",
        "Implementation of asynchronous processing with Kafka to ensure system resilience.",
        "Advanced manipulation of PDF, CSV, XML, and HTML files with a focus on performance."
      ]
    }
  },
  {
    company: "UFC",
    role: { pt: "Monitor de Arquitetura de Computadores", en: "Computer Architecture Teaching Assistant" },
    period: "2023 – 2024",
    location: "Quixadá, CE",
    description: {
      pt: [
        "Instrução de alunos em aulas práticas sobre operação de equipamentos eletrônicos e design de circuitos digitais.",
        "Auxílio no desenvolvimento de projetos práticos envolvendo microcontroladores e lógica digital."
      ],
      en: [
        "Instruction of students in practical classes on the operation of electronic equipment and digital circuit design.",
        "Assistance in the development of practical projects involving microcontrollers and digital logic."
      ]
    }
  }
];

export const PROJECTS: Project[] = [
  // COFFEE PROJECTS
  {
    title: "Medical Billing Processor",
    date: "Jan 2024",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    theme: Theme.COFFEE,
    githubUrl: "https://github.com/guiaf04",
    images: ["https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800"],
    description: {
      pt: ["Sistema de processamento paralelo de faturas médicas em larga escala.", "Integração com múltiplos gateways e Kafka."],
      en: ["Large-scale parallel medical invoice processing system.", "Integration with multiple gateways and Kafka."]
    },
    longDescription: {
      pt: "Este projeto foi desenvolvido para resolver o gargalo de processamento em instituições de saúde. Utilizando Kafka, conseguimos desacoplar a recepção de arquivos da lógica pesada.",
      en: "This project was developed to resolve processing bottlenecks in healthcare institutions. Using Kafka, we decoupled file reception from heavy business logic."
    },
    rpgStats: {
      xpGained: { pt: "+5000 Maestria Kafka", en: "+5000 Kafka Mastery" },
      manaCost: { pt: "160h / Alta Intensidade", en: "160h / High Intensity" },
      questLevel: "Legendary",
      techClass: { pt: "Necromante de Dados", en: "Data Necromancer" }
    }
  },
  {
    title: "Java Crawler Engine",
    date: "Jul 2023",
    tech: ["Java", "Groovy", "Selenium", "Redis"],
    theme: Theme.COFFEE,
    githubUrl: "https://github.com/guiaf04",
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800"],
    description: {
      pt: ["Motor de scraping dinâmico para portais médicos.", "Arquitetura escalável via Kubernetes."],
      en: ["Dynamic scraping engine for medical portals.", "Scalable architecture via Kubernetes."]
    },
    longDescription: {
      pt: "Desenvolvi um motor de automação capaz de navegar em sistemas legados governamentais. A engine utiliza Groovy para scripts dinâmicos e Redis para cache.",
      en: "Developed an automation engine capable of navigating legacy government systems. Uses Groovy for dynamic scripts and Redis for caching."
    },
    rpgStats: {
      xpGained: { pt: "+3500 Automação Web", en: "+3500 Web Automation" },
      manaCost: { pt: "80h / Foco Médio", en: "80h / Medium Focus" },
      questLevel: "Epic",
      techClass: { pt: "Sombra da Web", en: "Web Shadow" }
    }
  },
  // HARDWARE PROJECTS
  {
    title: "Multisensorial Robot (Micro-ROS)",
    date: "Oct 2024",
    tech: ["Micro-ROS", "Raspberry Pi Pico W", "C++", "LIDAR"],
    theme: Theme.HARDWARE,
    githubUrl: "https://github.com/guiaf04",
    images: ["https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800"],
    description: {
      pt: ["Robô móvel com Micro-ROS e mapeamento LIDAR.", "2º lugar na competição XV SBESC."],
      en: ["Mobile robot with Micro-ROS and LIDAR mapping.", "2nd place in the XV SBESC competition."]
    },
    longDescription: {
      pt: "Projeto de ponta integrando a stack ROS2 em microcontroladores. O robô utiliza o Raspberry Pi Pico W para se comunicar via WiFi com uma rede ROS central.",
      en: "Cutting-edge project integrating the ROS2 stack into microcontrollers. Uses Raspberry Pi Pico W to communicate via WiFi with a central ROS network."
    },
    rpgStats: {
      xpGained: { pt: "+8000 Sincronia Real-Time", en: "+8000 Real-Time Sync" },
      manaCost: { pt: "200h / Precisão Extrema", en: "200h / Extreme Precision" },
      questLevel: "Legendary",
      techClass: { pt: "Guardião do Silício", en: "Silicon Warden" }
    }
  },
  {
    title: "MIPS 32-bit Processor",
    date: "Jun 2024",
    tech: ["VHDL", "Vivado", "FPGAs"],
    theme: Theme.HARDWARE,
    githubUrl: "https://github.com/guiaf04",
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"],
    description: {
      pt: ["Projeto de processador MIPS 32 bits em VHDL.", "Pipeline de 5 estágios validado em FPGA."],
      en: ["32-bit MIPS processor design in VHDL.", "5-stage pipeline validated on FPGA."]
    },
    longDescription: {
      pt: "Uma imersão profunda em arquitetura de computadores. Desenvolvi toda a lógica de um processador MIPS funcional do zero em VHDL.",
      en: "A deep dive into computer architecture. Developed all the logic of a functional MIPS processor from scratch in VHDL."
    },
    rpgStats: {
      xpGained: { pt: "+4500 Mestria Lógica", en: "+4500 Logic Mastery" },
      manaCost: { pt: "120h / Pensamento Profundo", en: "120h / Deep Thinking" },
      questLevel: "Epic",
      techClass: { pt: "Tecelão de Portas", en: "Gate Weaver" }
    }
  }
];

export const COFFEE_SKILLS: Skill[] = [
  {
    category: { pt: "Linguagens & Core", en: "Languages & Core" },
    items: [
      { 
        name: "Java 17+", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        level: 'Master',
        details: {
          pt: ["Streams API & Lambdas", "JVM Performance Tuning", "Multithreading & Concurrency"],
          en: ["Streams API & Lambdas", "JVM Performance Tuning", "Multithreading & Concurrency"]
        }
      },
      { 
        name: "Groovy", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/groovy/groovy-original.svg",
        level: 'Advanced',
        details: {
          pt: ["Dynamic Scripting", "Custom DSLs", "Integration with Jenkins"],
          en: ["Dynamic Scripting", "Custom DSLs", "Integration with Jenkins"]
        }
      },
      { 
        name: "SQL", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        level: 'Advanced',
        details: {
          pt: ["Consultas Complexas", "Otimização de Queries", "Mapeamento Relacional"],
          en: ["Complex Queries", "Query Optimization", "Relational Mapping"]
        }
      }
    ]
  },
  {
    category: { pt: "Frameworks & Tools", en: "Frameworks & Tools" },
    items: [
      { 
        name: "Spring Boot", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        level: 'Master',
        details: {
          pt: ["Security & OAuth2", "Microservices", "Data JPA & Hibernate"],
          en: ["Security & OAuth2", "Microservices", "Data JPA & Hibernate"]
        }
      },
      { 
        name: "Apache Kafka", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        level: 'Advanced',
        details: {
          pt: ["Event-Driven Arch", "Consumer Groups", "Resilient Processing"],
          en: ["Event-Driven Arch", "Consumer Groups", "Resilient Processing"]
        }
      },
      { 
        name: "Docker", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        level: 'Intermediate',
        details: {
          pt: ["Containerização", "Docker Compose", "Otimização de Recursos"],
          en: ["Containerization", "Docker Compose", "Resource Optimization"]
        }
      }
    ]
  }
];

export const HARDWARE_SKILLS: Skill[] = [
  {
    category: { pt: "Baixo Nível", en: "Low Level" },
    items: [
      { 
        name: "C/C++", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        level: 'Master',
        details: {
          pt: ["Gerenciamento de Ponteiros", "Acesso a Registradores", "Eficiência Algorítmica"],
          en: ["Pointer Management", "Direct Register Access", "Algorithm Efficiency"]
        }
      },
      { 
        name: "Assembly", 
        icon: "https://img.icons8.com/ios-filled/50/processor.png",
        level: 'Advanced',
        details: {
          pt: ["ISA (MIPS/RISC-V)", "Otimização Crítica", "Debuggers"],
          en: ["ISA (MIPS/RISC-V)", "Critical Optimization", "Debuggers"]
        }
      },
      { 
        name: "VHDL", 
        icon: "https://img.icons8.com/ios/50/chip.png",
        level: 'Advanced',
        details: {
          pt: ["FSM Design", "Lógica Sintetizável", "Vivado & ModelSim"],
          en: ["FSM Design", "Synthesizable Logic", "Vivado & ModelSim"]
        }
      }
    ]
  },
  {
    category: { pt: "Plataformas & Sistemas", en: "Platforms & Systems" },
    items: [
      { 
        name: "FreeRTOS", 
        icon: "https://img.icons8.com/color/48/freertos.png",
        level: 'Advanced',
        details: {
          pt: ["Escalonamento de Tarefas", "Mutex & Filas", "Restrições Real-time"],
          en: ["Task Scheduling", "Mutex & Queues", "Real-time Constraints"]
        }
      },
      { 
        name: "STM32", 
        icon: "https://img.icons8.com/color/48/stm32.png",
        level: 'Advanced',
        details: {
          pt: ["HAL & LL Libraries", "DMA & Interrupts", "Peripherals (I2C, SPI)"],
          en: ["HAL & LL Libraries", "DMA & Interrupts", "Peripherals (I2C, SPI)"]
        }
      },
      { 
        name: "Embedded Linux", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        level: 'Intermediate',
        details: {
          pt: ["Compilação de Kernel", "Device Trees", "Buildroot/Yocto"],
          en: ["Kernel Compilation", "Device Trees", "Buildroot/Yocto"]
        }
      }
    ]
  }
];
