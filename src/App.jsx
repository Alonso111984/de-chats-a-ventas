import React, { useState, useEffect, useRef } from 'react';

const COLORS = {
  primary: '#002454',
  secondary: '#0054A8',
  dark: '#080808',
  light: '#F8F8F8',
  accent: '#50A030',
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700;800&display=swap');
    
    :root {
      background-color: ${COLORS.light};
      color: ${COLORS.dark};
    }
    
    body {
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Sora', sans-serif;
    }

    .animate-fade-up {
      animation: fadeUp 0.6s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes fadeUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .nav-link.active {
      border-bottom: 2px solid ${COLORS.accent};
      color: ${COLORS.primary};
      font-weight: 600;
    }
  `}</style>
);

const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconAlert = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconChevronDown = ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconRobot = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>;
const IconYoutube = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

const Section = ({ id, title, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="py-12 opacity-0">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>{title}</h2>
      {children}
    </section>
  );
};

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const questions = [
    {
      q: "Revisa tu último chat perdido. ¿Cómo inició el cliente?",
      options: [
        { text: "Solo escribió 'Precio' o una sola palabra.", isError: true },
        { text: "Hizo una pregunta específica sobre el producto.", isError: false }
      ]
    },
    {
      q: "¿En qué momento le enviaste el precio?",
      options: [
        { text: "Inmediatamente después de que lo pidió.", isError: true },
        { text: "Después de explicarle los beneficios del producto.", isError: false }
      ]
    },
    {
      q: "¿Cómo terminó tu último mensaje antes del 'visto'?",
      options: [
        { text: "Con un párrafo lleno de información y detalles.", isError: true },
        { text: "Con una pregunta directa dándole opciones a elegir.", isError: false }
      ]
    }
  ];

  const handleAnswer = (isError) => {
    const newAnswers = [...answers, isError];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
      setTimeout(() => {
        document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
  };

  if (step >= questions.length) {
    const errors = answers.filter(a => a).length;
    return (
      <div id="quiz-results" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>Diagnóstico Completado</h3>
        {errors >= 2 ? (
          <div>
            <div className="flex items-start gap-3 mb-4 p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
              <IconAlert />
              <div>
                <p className="font-bold mb-1">Error Principal: Cediste el control del chat.</p>
                <p className="text-sm">Tus chats mueren porque respondes reaccionando al cliente en lugar de guiarlo. Dar toda la información de golpe sin terminar en pregunta deja al cliente sin saber qué decir.</p>
              </div>
            </div>
            <h4 className="font-bold mt-6 mb-2">Protocolo de corrección:</h4>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Paso 1: Nunca envíes el precio en el primer mensaje. Ofrece asesoría primero.</li>
              <li>Paso 2: Vende los beneficios antes que las características.</li>
              <li>Paso 3: Nunca termines un mensaje sin una pregunta.</li>
            </ul>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-3 mb-4 p-4 rounded-lg" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
              <IconCheck />
              <div>
                <p className="font-bold mb-1">Buena estructura básica.</p>
                <p className="text-sm">Mantienes el control de la conversación. Si aún pierdes ventas, el problema puede estar en el manejo de objeciones específicas. Revisa la sección de Objeciones abajo.</p>
              </div>
            </div>
          </div>
        )}
        <button onClick={resetQuiz} className="mt-6 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          Evaluar otro chat
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
        <span>Pregunta {step + 1} de {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ backgroundColor: i <= step ? COLORS.secondary : '' }}></div>
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-6 text-gray-900">{questions[step].q}</h3>
      <div className="space-y-3">
        {questions[step].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.isError)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-50 transition-all font-medium"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const Troubleshooter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      title: "El cliente me dijo: 'Está caro'",
      diagnosis: "No es falta de dinero, es falta de valor percibido.",
      action: "Lo entiendo perfectamente. Nuestros precios no buscan competir por ser los más baratos, sino por ofrecer un producto con el que el cliente quede realmente satisfecho. No buscamos venderle algo que no necesita, buscamos convertirnos en su proveedor de confianza."
    },
    {
      title: "El cliente me dijo: 'Ok, yo le escribo'",
      diagnosis: "No tenía intención de compra inmediata. Insistir aquí mata la venta futura.",
      action: "Perfecto, quedo atento. Cuando guste con todo el gusto le ayudo."
    },
    {
      title: "El cliente me dijo: 'Lo voy a pensar'",
      diagnosis: "Duda silenciosa. Presionar genera rechazo. Cierra con elegancia.",
      action: "Perfecto, no hay problema. Ojalá más adelante se anime a probar nuestro producto. Quedo atento a cualquier duda. Que tenga un lindo día."
    },
    {
      title: "El cliente leyó mi mensaje y me dejó en visto",
      diagnosis: "Curiosidad satisfecha o falta de llamado a la acción. Acepta y suelta.",
      action: "[No enviar nada]. Tu trabajo no es forzar ventas, es dar lo mejor en cada charla. Revisa si en tu último mensaje olvidaste hacerle una pregunta para continuar la charla."
    }
  ];

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-900 text-left">{item.title}</span>
            <IconChevronDown className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
              <p className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: COLORS.accent }}>Diagnóstico: {item.diagnosis}</p>
              <div className="bg-white p-4 rounded-lg border-l-4 shadow-sm text-gray-800" style={{ borderColor: COLORS.primary }}>
                <p className="italic">"{item.action}"</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ClosureBuilder = () => {
  const [type, setType] = useState('color');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');

  const generateScript = () => {
    const o1 = opt1 || "[Opción 1]";
    const o2 = opt2 || "[Opción 2]";
    
    if (type === 'color' || type === 'sabor') {
      return `Tenemos el producto en ${o1} y ${o2}. ¿Cuál es más de su agrado?`;
    }
    if (type === 'fecha') {
      return `El pedido puede llegar el ${o1} o el ${o2}. ¿Qué día le queda mejor?`;
    }
    return `Tenemos disponible en ${o1} y ${o2}. ¿Cuál prefiere?`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Tipo de variante</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="color">Color / Presentación</option>
            <option value="sabor">Sabor</option>
            <option value="fecha">Día de entrega</option>
          </select>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Opción 1</label>
            <input 
              type="text" 
              placeholder={type === 'fecha' ? 'Martes' : 'Rojo'}
              value={opt1}
              onChange={(e) => setOpt1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Opción 2</label>
            <input 
              type="text" 
              placeholder={type === 'fecha' ? 'Sábado' : 'Azul'}
              value={opt2}
              onChange={(e) => setOpt2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Script Generado:</p>
        <div className="p-5 rounded-lg border border-green-200 shadow-inner relative" style={{ backgroundColor: '#F0FDF4' }}>
          <p className="text-lg text-gray-800 font-medium">{generateScript()}</p>
          <button 
            onClick={() => navigator.clipboard.writeText(generateScript())}
            className="absolute top-2 right-2 text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm hover:bg-gray-50"
            title="Copiar texto"
          >
            Copiar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">Nunca cierres preguntando "¿Desea comprar?". Hazlos elegir.</p>
      </div>
    </div>
  );
};

const Checklist = () => {
  const [tasks, setTasks] = useState({
    t1: false, t2: false, t3: false, t4: false, t5: false, t6: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('deChatsAVentas-checklist');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const toggleTask = (key) => {
    const newTasks = { ...tasks, [key]: !tasks[key] };
    setTasks(newTasks);
    localStorage.setItem('deChatsAVentas-checklist', JSON.stringify(newTasks));
  };

  const progress = Math.round((Object.values(tasks).filter(Boolean).length / 6) * 100);

  const SectionTitle = ({ children }) => (
    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mt-6 mb-3">{children}</h4>
  );

  const Task = ({ id, label, sub }) => (
    <label className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-100 hover:shadow-sm">
      <input 
        type="checkbox" 
        checked={tasks[id]}
        onChange={() => toggleTask(id)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
      />
      <div>
        <p className={`font-medium ${tasks[id] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{label}</p>
        {sub && <p className={`text-sm mt-1 ${tasks[id] ? 'text-gray-300' : 'text-gray-500'}`}>{sub}</p>}
      </div>
    </label>
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Rutina de Cierre</h3>
          <p className="text-sm text-gray-500 mt-1">Sigue esta estructura en cada chat. El progreso se guarda en tu navegador.</p>
        </div>
        <span className="text-2xl font-black" style={{ color: COLORS.accent }}>{progress}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: COLORS.accent }}></div>
      </div>

      <div className="space-y-1">
        <SectionTitle>Antes de responder</SectionTitle>
        <Task id="t1" label="Tener listo mensaje de bienvenida con mi nombre." />
        <Task id="t2" label="Incluir dos opciones de respuesta fácil (Ej: 'sabe lo que quiere' o 'quiere asesoría')." />
        
        <SectionTitle>Durante el chat</SectionTitle>
        <Task id="t3" label="Nunca terminar un mensaje sin una pregunta." sub="Puedes dar información, pero el mensaje debe finalizar cediéndole el turno." />
        <Task id="t4" label="Dar opciones claras para escoger." sub="Usa el Creador de Cierres de arriba." />
        
        <SectionTitle>Antes de cerrar</SectionTitle>
        <Task id="t5" label="Asegurar que entienda tiempo y método de entrega." />
        <Task id="t6" label="Avisar que le escribirás para darle seguimiento." sub="La confianza asegura el 'sí' final." />
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'diagnostico', 'objeciones', 'cierres', 'checklist', 'bonus'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NavItem = ({ id, label }) => (
    <button 
      onClick={() => scrollTo(id)}
      className={`nav-link whitespace-nowrap px-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeSection === id ? 'active' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen relative font-sans text-gray-900 pb-20">
      <GlobalStyles />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[860px] mx-auto px-4 md:px-8">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            <NavItem id="inicio" label="Inicio" />
            <NavItem id="diagnostico" label="Diagnóstico" />
            <NavItem id="objeciones" label="Objeciones" />
            <NavItem id="cierres" label="Cierres" />
            <NavItem id="checklist" label="Checklist" />
            <NavItem id="bonus" label="Bonus AI" />
          </div>
        </div>
      </nav>

      <main className="max-w-[860px] mx-auto px-4 md:px-8">
        
        {/* Header / Intro */}
        <section id="inicio" className="py-16 text-center animate-fade-up">
          <img 
            src="https://i.postimg.cc/ZnQHYcrm/Luis1.png" 
            alt="Luis Mario Molina" 
            className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-white"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: COLORS.primary }}>
            De Chats a Ventas
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Herramientas interactivas basadas en el método de Luis Mario Molina para tomar el control de tus chats y dejar de perder ventas por WhatsApp.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => scrollTo('diagnostico')} className="px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-transform hover:-translate-y-0.5" style={{ backgroundColor: COLORS.secondary }}>
              Empezar Diagnóstico
            </button>
            <a href="https://youtube.com/@luismario_molina?si=JpINl9LT4WOBLjYs" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-800">
              <IconYoutube /> YouTube
            </a>
          </div>
        </section>

        {/* Diagnosticador */}
        <Section id="diagnostico" title="Diagnosticador de Vistos">
          <p className="text-gray-600 mb-6">Descubre exactamente por qué perdiste tu última venta. Responde 3 preguntas sobre tu último chat que quedó en visto.</p>
          <Quiz />
        </Section>

        {/* Simulador de Objeciones */}
        <Section id="objeciones" title="Simulador de Objeciones">
          <p className="text-gray-600 mb-6">Selecciona la respuesta que te dio el cliente para ver la psicología detrás de su mensaje y el script exacto que debes usar para recuperar el control.</p>
          <Troubleshooter />
        </Section>

        {/* Creador de Cierres */}
        <Section id="cierres" title="Generador de Cierres">
          <p className="text-gray-600 mb-6">El error final es preguntar "¿Desea comprar?". Usa esta herramienta para generar cierres por elección. Ingresa tus opciones y copia el script.</p>
          <ClosureBuilder />
        </Section>

        {/* Checklist Diaria */}
        <Section id="checklist" title="Checklist Persistente">
          <p className="text-gray-600 mb-6">Mantén la disciplina en cada chat. Marca las casillas a medida que implementas el sistema. Tu progreso se guarda automáticamente para tu próximo turno.</p>
          <Checklist />
        </Section>

        {}
        <Section id="bonus" title="Bonus: Mentor AI">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <IconRobot />
              </div>
              <h3 className="text-2xl font-bold mb-3">Conoce a Luis Closer</h3>
              <p className="text-slate-300 max-w-md mx-auto mb-8">
                Tu mentor de ventas por WhatsApp impulsado por ChatGPT. Analiza tus conversaciones, detecta errores y te enseña qué responder aplicando el método "De Chats a Ventas".
              </p>
              <a 
                href="https://chatgpt.com/g/g-6a760728bc588191925de09152c6c387-luis-closer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-xl font-bold text-slate-900 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                style={{ backgroundColor: COLORS.light }}
              >
                Acceder al Mentor AI
              </a>
            </div>
          </div>
        </Section>

      </main>

      <footer className="text-center py-10 border-t border-gray-200 mt-12 text-gray-500 text-sm">
        <p>Herramienta basada en el método de Luis Mario Molina.</p>
        <p className="mt-1">Las ventas no son suerte, son estructura.</p>
      </footer>
    </div>
  );
}
