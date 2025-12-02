import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Layout, 
  ExternalLink, 
  ArrowUp, 
  Terminal,
  Cpu,
  Factory,
  Plus,
  Minus,
  MapPin,
  Globe,
  FileText, 
  Sparkles,
  Home,       // Icon untuk Home
  User,       // Icon untuk Expertise
  Briefcase,  // Icon untuk Project
  Award,      // Icon untuk Experience
  MessageSquare // Icon untuk Contact
} from 'lucide-react';

// --- CUSTOM CURSOR COMPONENT (Hidden on Mobile) ---
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);
  
  // Posisi target (mouse)
  const cursorRef = useRef({ x: 0, y: 0 });
  // Posisi saat ini (untuk ring yang delay)
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Cek apakah device touch screen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      cursorRef.current = { x: clientX, y: clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    
    const animateRing = () => {
      ringPos.current.x += (cursorRef.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (cursorRef.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="hidden md:block"> {/* Hanya muncul di desktop */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#0affff] rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-5 -mt-5" 
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#0affff] rounded-full pointer-events-none z-[9999] -ml-1 -mt-1"
      />
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [openExperienceIndex, setOpenExperienceIndex] = useState(0); 

  // State untuk Soft Skills
  const [softSkills, setSoftSkills] = useState([
    "Problem Solving", "Critical Thinking", "Communication Skills", 
    "Time Management", "Leadership", "Creativity & Innovation"
  ]);

  // Drag & Drop References
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _softSkills = [...softSkills];
    const draggedItemContent = _softSkills.splice(dragItem.current, 1)[0];
    _softSkills.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSoftSkills(_softSkills);
  };
  
  // Data Navigasi dengan Ikon untuk Mobile
  const navItems = [
    { id: 'home', label: 'home', number: '01', icon: <Home size={20} /> },
    { id: 'expertise', label: 'expertise', number: '02', icon: <User size={20} /> },
    { id: 'project', label: 'project', number: '03', icon: <Briefcase size={20} /> },
    { id: 'experience', label: 'experience', number: '04', icon: <Award size={20} /> },
    { id: 'contact', label: 'contact', number: '05', icon: <MessageSquare size={20} /> },
  ];

  const projects = [
    {
      title: "Multi-Room Env Monitoring",
      category: "IoT & Data",
      image: "/images/project1.jpg",
      desc: "Real-time temperature and humidity monitoring system using ESP32, MQTT pipeline, InfluxDB storage, and Grafana visualization.",
      stack: ["ESP32", "MQTT", "InfluxDB", "Grafana"]
    },
    {
      title: "Corn Kernel Separator Design",
      category: "Mechanical Design",
      image: "/images/project2.jpg",
      desc: "3D assembly design of a mechanical corn separator with 35 components using Autodesk Inventor, focusing on motion simulation.",
      stack: ["Autodesk Inventor", "CAD"]
    },
    {
      title: "IoT Gesture Control",
      category: "IoT & AI",
      image: "/images/project3.jpg",
      desc: "Touchless device control system integrating Python Computer Vision and ESP32 via MQTT to trigger actions based on hand gestures.",
      stack: ["Python", "OpenCV", "ESP32", "MQTT"]
    },
    {
      title: "Pilah.In",
      category: "UI/UX Design",
      image: "/images/project4.jpg",
      desc: "User-centered waste management app prototype designed in Figma based on research to facilitate efficient recycling processes.",
      stack: ["Figma", "Prototyping", "User Flow"]
    },
    {
      title: "Business Performance Dashboard",
      category: "Data Analytics",
      image: "/images/project5.jpg",
      desc: "End-to-end analytics pipeline using BigQuery and Looker Studio to visualize sales and branch performance data (2020-2023).",
      stack: ["BigQuery", "SQL", "Looker Studio"]
    },
    {
      title: "Auto Water Tank Control",
      category: "Automation",
      image: "/images/project6.jpg",
      desc: "Dual-tank level control system utilizing Arduino Uno, ultrasonic sensors, and PWM logic for automated water management.",
      stack: ["Arduino", "C++", "Sensors"]
    },
    {
      title: "Dr. Stone",
      category: "Software Dev",
      image: "/images/project7.jpg",
      desc: "Interactive learning platform for geological classification featuring structured MySQL data management and article modules.",
      stack: ["Java", "HTML/CSS", "MySQL"]
    },
    {
      title: "Smart Kitchen",
      category: "IoT / Automation",
      image: "/images/project8.jpg",
      desc: "Automated kitchen ecosystem using Arduino to orchestrate various sensors and actuators for smart home integration.",
      stack: ["Arduino", "Electronics", "Sensors"]
    },
    {
      title: "E-Scooter Rental System",
      category: "Web Development",
      image: "/images/project9.jpg",
      desc: "Web-based rental platform with admin panel capabilities, user booking features, and database management.",
      stack: ["HTML/CSS", "MySQL", "PHP"]
    },
    {
      title: "DC-DC Boost Converter",
      category: "Electronics",
      image: "/images/project10.jpg",
      desc: "Circuit design, simulation, and PCB assembly of a DC-DC voltage regulator, validated through hardware testing.",
      stack: ["Proteus", "PCB Design"]
    }
  ];

  const experiences = [
    {
      role: "Engineering Intern",
      company: "PT. Tirta Investama Cianjur",
      period: "Jun 2025 – Aug 2025",
      location: "Cianjur, Indonesia",
      skills: ['AutoCAD', 'PLC', 'Troubleshooting', 'Automation', 'Maintenance'],
      desc: (
        <ul className="list-disc ml-4 space-y-2 text-slate-300">
          <li>Troubleshot production machines, implementing corrective actions to ensure continuous operation with minimal downtime.</li>
          <li>Mapped and documented automation systems from Krones Contiform to Modulpal, created flowcharts for troubleshooting, and designed a new production line layout in AutoCAD.</li>
          <li>Installed and wired control panels to monitor UV filter conditions in the water treatment process.</li>
          <li>Supported daily and weekly preventive maintenance to improved machine performance and reliability.</li>
          <li>Developed an OJT database in Excel for 100 roles, enhancing workforce skill tracking efficiency by 40%.</li>
        </ul>
      )
    },
    {
      role: "Big Data Analytics Intern",
      company: "PT. Kimia Farma, Tbk",
      period: "Jan 2025",
      location: "Remote",
      skills: ['Google BigQuery', 'Looker Studio', 'SQL', 'Data Analytics', 'Business Intelligence'],
      desc: (
        <ul className="list-disc ml-4 space-y-2 text-slate-300">
          <li>Designed and maintained Data Marts for historical sales data (2020–2023) using Google BigQuery and Cloud Storage.</li>
          <li>Developed interactive dashboards in Looker Studio to track sales, transactions, and branch performance.</li>
          <li>Generated actionable business insights on top-performing regions and profitability to support strategic decisions.</li>
        </ul>
      )
    },
    {
      role: "Staff of Organizational Resource Dev",
      company: "HIMATRONIKA-AI",
      period: "Jan 2024 – Nov 2024",
      location: "Indonesia",
      skills: ['Leadership', 'Problem Solving', 'Public Speaking', 'Event Management', 'Mentoring'],
      desc: (
        <ul className="list-disc ml-4 space-y-2 text-slate-300">
          <li>Contributed to onboarding and training 80+ new students through a problem-solving cadre program.</li>
          <li>Monitored evaluation activities for 90 members across 9 departments, delivering data-driven feedback to improve performance.</li>
          <li>Organized orientation activities focused on problem-solving to foster leadership and creativity.</li>
        </ul>
      )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Logic deteksi section aktif
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      navItems.forEach(item => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop, 
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handleExperienceToggle = (index) => {
    const isOpening = openExperienceIndex !== index;
    setOpenExperienceIndex(isOpening ? index : null);
  };

  return (
    // Tambahkan 'md:cursor-none' agar cursor custom hanya di desktop
    <div className="bg-[#0a0a0a] min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 md:cursor-none pb-20 md:pb-0">
      <CustomCursor />

      {/* --- DESKTOP NAVBAR (TOP) --- */}
      <nav className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-center items-center">
          <ul className="flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-mono transition-colors duration-300 flex flex-col items-center gap-1 cursor-none 
                    ${activeSection === item.id ? 'text-white' : 'text-slate-600 hover:text-slate-400'}
                  `}
                >
                  <span className={`text-[10px] mb-[-2px] transition-opacity duration-300 ${activeSection === item.id ? 'opacity-100 text-cyan-400' : 'opacity-0 group-hover:opacity-70'}`}>
                    // {item.number}
                  </span>
                  <span className="tracking-widest uppercase font-medium">
                     {item.label}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 transition-transform duration-300 ${activeSection === item.id ? 'scale-100' : 'scale-0'}`}></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* --- MOBILE NAVBAR (BOTTOM) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 safe-area-bottom">
        <ul className="flex justify-between items-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300
                  ${activeSection === item.id ? 'text-cyan-400' : 'text-slate-500'}
                `}
              >
                <div className={`p-2 rounded-full transition-all ${activeSection === item.id ? 'bg-cyan-400/10' : 'bg-transparent'}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase font-medium tracking-wide">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-6">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

        <div className="text-center z-10 relative max-w-4xl mx-auto mt-0 md:mt-16">
          <p className="text-cyan-400 font-mono mb-4 md:mb-6 tracking-widest text-xs md:text-base animate-fade-in">HELLO, I AM</p>
          
          {/* Responsive Font Size: Smaller on mobile, larger on desktop */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-100 tracking-tighter mb-6 md:mb-8 leading-tight">
            TALHA FATUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 block md:inline">RAHMAN</span>
          </h1>
          
          <p className="text-base md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-10 px-2">
            Engineering student with strong expertise in <span className="text-slate-100 font-medium border-b border-cyan-500/50">Industrial Automation</span>, <span className="text-slate-100 font-medium border-b border-cyan-500/50">IoT Solutions</span>, and <span className="text-slate-100 font-medium border-b border-cyan-500/50">Web Developer</span>.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
            <div className="flex gap-6 items-center mb-4 md:mb-0">
              <SocialIcon icon={<Github size={20} />} href="https://github.com/talhaportofolio" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/talha-fatur-rahman" />
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com/talhafatur" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:talhafaturjob@gmail.com" />
            </div>
            
            <div className="hidden md:block w-[1px] h-8 bg-slate-700"></div>
            
            <div className="flex gap-3">
               <a 
                href="#" 
                className="group flex items-center gap-2 text-slate-300 border border-slate-700 px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all duration-300 md:cursor-none text-sm"
              >
                <FileText size={16} />
                <span>CV</span>
              </a>
              <button 
                onClick={() => scrollToSection('project')}
                className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full hover:bg-cyan-400 hover:text-white transition-all duration-300 md:cursor-none text-sm font-bold"
              >
                <span>View Project</span>
                <ArrowUp size={16} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Hidden on Mobile */}
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
           <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent"></div>
        </div>
      </section>

      {/* --- EXPERTISE SECTION --- */}
      <section id="expertise" className="min-h-screen flex flex-col justify-center py-20 md:pt-40 md:pb-20 px-4 md:px-6 relative bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto w-full">
          <SectionTitle number="02" title="My Expertise" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 mb-12 md:mb-16">
            <ExpertiseCard 
              icon={<Factory size={32} className="text-cyan-400" />}
              title="Industrial Automation"
              tags={['Omron', 'Siemens', 'Hydraulic', 'Pneumatic']}
              desc="Designing efficient control systems and industrial workflows using advanced PLC ladder logic and fluid power circuits."
            />
            <ExpertiseCard 
              icon={<Cpu size={32} className="text-green-400" />}
              title="IoT Solutions"
              tags={['ESP32', 'Arduino', 'MQTT', 'Grafana']}
              desc="Bridging the gap between hardware and software. Developing smart monitoring systems and automation."
            />
            <ExpertiseCard 
              icon={<Layout size={32} className="text-purple-400" />}
              title="Web Developer"
              tags={['React', 'Next.js', 'Tailwind', 'TypeScript']}
              desc="Passionate about UI/UX. Creating responsive, accessible, and performant web applications."
            />
          </div>

          {/* --- SOFT SKILLS SECTION --- */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-6 md:mb-8 justify-center">
              <Sparkles size={20} className="text-purple-400" />
              <h3 className="text-xl md:text-2xl font-bold text-white text-center">Soft Skills</h3>
              <Sparkles size={20} className="text-purple-400" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto px-2">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => {
                    dragItem.current = index;
                    e.target.style.opacity = '0.5';
                  }}
                  onDragEnter={(e) => (dragOverItem.current = index)}
                  onDragEnd={(e) => {
                    handleSort();
                    e.target.style.opacity = '1';
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="px-4 py-2 md:px-6 md:py-3 bg-[#1e1b4b]/30 border border-purple-500/20 text-purple-200 text-sm md:text-base font-medium rounded-full cursor-grab active:cursor-grabbing hover:bg-[#4c1d95]/40 hover:border-purple-500/50 transition-all select-none backdrop-blur-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- PROJECT SECTION --- */}
      <section id="project" className="min-h-screen flex flex-col justify-center py-20 md:pt-40 md:pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <SectionTitle number="03" title="My Projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-12">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                category={project.category}
                image={project.image}
                desc={project.desc}
                stack={project.stack}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="min-h-screen flex flex-col justify-center py-20 md:pt-40 md:pb-20 px-4 md:px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto w-full">
          <SectionTitle number="04" title="Experience" />
          
          <div className="mt-8 md:mt-12 space-y-4">
            {experiences.map((exp, index) => (
              <div key={index}>
                <ExperienceItem 
                  {...exp}
                  isOpen={openExperienceIndex === index}
                  onToggle={() => handleExperienceToggle(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="min-h-screen flex flex-col justify-center py-20 md:pt-40 md:pb-20 px-4 md:px-6 items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        
        <div className="z-10 w-full">
          <p className="text-cyan-500 font-mono mb-4 md:mb-6 tracking-widest text-sm">// 05 CONTACT</p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight">Open for<br/>Internship Opportunities</h2>
          <p className="max-w-xl mx-auto text-slate-400 text-base md:text-lg mb-10 md:mb-12 leading-relaxed px-4">
            I am a 5th-semester student looking for an internship to apply my skills and gain professional experience. Let's connect!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <a href="mailto:talhafaturjob@gmail.com" className="w-full md:w-auto flex justify-center items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 md:cursor-none">
              <Mail size={20} />
              talhafaturjob@gmail.com
            </a>
            <a href="#" className="w-full md:w-auto flex justify-center items-center gap-3 border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all duration-300 md:cursor-none">
              <FileText size={20} />
              Download CV
            </a>
          </div>

          <div className="mt-16 md:mt-20 flex justify-center w-full mx-auto pb-20 md:pb-0">
             <div className="text-center">
               <h4 className="text-white font-bold mb-4">Socials</h4>
               <div className="flex md:block gap-6 justify-center">
                 <ul className="flex md:flex-col gap-6 md:gap-2 text-slate-500 text-sm">
                   <li className="hover:text-cyan-400 md:cursor-none"><a href="https://github.com/talhaportofolio">Github</a></li>
                   <li className="hover:text-cyan-400 md:cursor-none"><a href="https://instagram.com/talhafatur">Instagram</a></li>
                   <li className="hover:text-cyan-400 md:cursor-none">Twitter</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Adjusted for Mobile Bottom Nav */}
      <footer className="py-6 text-center border-t border-white/5 pb-24 md:pb-6 bg-[#0a0a0a]">
         <p className="text-slate-600 text-xs font-mono px-4">
           DESIGNED & BUILT BY TALHA FATUR © 2025
         </p>
      </footer>
    </div>
  );
};

// --- Sub-Components (Responsive Adjustments) ---

const SocialIcon = ({ icon, href }) => (
  <a href={href} className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300 border border-transparent hover:border-white/10 md:cursor-none">
    {icon}
  </a>
);

const SectionTitle = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12">
    <span className="text-cyan-500 font-mono text-lg md:text-xl">/{number}</span>
    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white tracking-tight">{title}</h2>
    <div className="h-[1px] bg-gradient-to-r from-slate-800 to-transparent flex-grow ml-4 md:ml-6"></div>
  </div>
);

const ExpertiseCard = ({ icon, title, desc, tags }) => (
  <div className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-900/10 md:cursor-none">
    <div className="mb-4 md:mb-6 bg-slate-900/50 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm mb-4 md:mb-6">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags && tags.map((tag, i) => (
        <span key={i} className="text-[10px] md:text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, category, image, desc, stack }) => (
  <div className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all md:cursor-none h-[350px] md:h-[400px]">
    <div className="relative h-full w-full">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 text-[10px] md:text-xs font-bold font-mono text-cyan-400 bg-cyan-900/30 border border-cyan-500/30 rounded-full uppercase tracking-wider backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-white/10">
        <ExternalLink size={18} className="text-white" />
      </div>

      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight">{title}</h3>
        <p className="text-slate-300 text-sm mb-4 md:mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 opacity-80 group-hover:opacity-100">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
           {stack && stack.map((tech, i) => (
             <span key={i} className="text-[10px] md:text-xs text-cyan-300 font-mono bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
               #{tech}
             </span>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const ExperienceItem = ({ role, company, period, desc, skills, location, isOpen, onToggle }) => {
  return (
    <div className="mb-4 group">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 md:p-6 transition-all duration-300 text-left border border-white/5 md:cursor-none relative overflow-hidden ${
          isOpen 
            ? 'bg-[#6b21a8] hover:bg-[#7e22ce] rounded-t-xl' 
            : 'bg-[#121212] hover:bg-[#1a1a1a] rounded-xl' 
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 z-10 w-full md:w-auto">
          <span className={`text-base md:text-xl font-bold ${isOpen ? 'text-white' : 'text-slate-200'}`}>
            {role}
          </span>
          <span className={`text-sm md:text-base ${isOpen ? 'text-purple-200' : 'text-slate-500'} font-medium`}>@ {company}</span>
        </div>
        
        <div className="flex items-center gap-4 z-10 pl-4 md:pl-0">
           <span className={`hidden md:block font-mono text-sm ${isOpen ? 'text-white/80' : 'text-slate-500'}`}>{period}</span>
           <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-white/10 rotate-180' : 'bg-transparent rotate-0'}`}>
             {isOpen ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-slate-400 group-hover:text-white" />}
           </div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out bg-[#1e1b4b]/20 border-x border-b border-white/5 backdrop-blur-sm ${isOpen ? 'max-h-[800px] opacity-100 rounded-b-xl' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 md:p-8">
           <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4 md:mb-6 text-xs md:text-sm font-mono text-slate-400">
             <span className="md:hidden text-cyan-400">{period}</span>
             {location && (
               <div className="flex items-center gap-2">
                 <MapPin size={14} className="text-purple-400" />
                 <span>{location}</span>
               </div>
             )}
           </div>

           <div className="text-slate-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
             {desc}
           </div>

           <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
             {skills && skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 md:px-3 md:py-1.5 bg-[#4c1d95]/30 border border-purple-500/30 text-purple-200 text-[10px] md:text-xs font-bold rounded-full hover:bg-[#4c1d95] transition-colors md:cursor-none">
                  {skill}
                </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio;
