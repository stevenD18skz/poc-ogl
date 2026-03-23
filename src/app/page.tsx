import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 hero-gradient relative overflow-hidden flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
             <Image src="/ogl_logo.png" alt="OGL Logo" width={24} height={24} className="rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight font-serif text-primary">POC-OGL</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-primary/70">
          <a href="#about" className="hover:text-primary transition-colors">Objetivo</a>
          <a href="#performance" className="hover:text-primary transition-colors">Parámetros</a>
          <a href="game" className="hover:text-primary transition-colors">El Proyecto</a>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full shadow-md hover:bg-primary/90 transition-all hover:scale-105">
          Ver Código
        </button>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-7xl px-8 pt-12 pb-24 flex flex-col md:flex-row items-center gap-16 z-10">
        <div className="flex-1 flex flex-col gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider self-center md:self-start">
            Proof of Concept
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight text-foreground">
            Probando la Viabilidad de <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-4">OGL</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Este repositorio es un campo de pruebas dedicado a evaluar el rendimiento y flexibilidad de la librería <b>OGL</b> para nuestro próximo proyecto de simulación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="/game" className="px-8 py-4 bg-accent text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:shadow-2xl hover:bg-accent/90 transition-all hover:-translate-y-1 text-center">
              Explorar PoC
            </a>
            <button className="px-8 py-4 bg-white text-primary border-2 border-primary/10 font-bold rounded-2xl hover:bg-muted/30 transition-all">
              Documentación OGL
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-50 floating-animation"></div>
          <div className="relative glass-card rounded-[2.5rem] overflow-hidden p-3 floating-animation">
            <Image 
              src="/cozy_house.png" 
              alt="Cozy Pet House" 
              width={600} 
              height={400} 
              className="rounded-4xl shadow-sm object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-8 right-8 glass-card px-6 py-4 rounded-2xl">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1 italic">Ambiente</p>
              <p className="text-lg font-bold text-primary">Cozy Pet House</p>
            </div>
          </div>
        </div>
      </main>

      {/* Info Section */}
      <section id="about" className="w-full bg-white/50 backdrop-blur-sm py-24 px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16">
          <div className="max-w-3xl flex flex-col gap-4">
            <h2 className="text-4xl font-bold font-serif text-primary">El Objetivo del Proyecto</h2>
            <div className="h-1.5 w-24 bg-accent rounded-full mx-auto"></div>
            <p className="text-lg text-foreground/60 leading-relaxed mt-4">
              Estamos desarrollando un juego de <b>"Alimentar Mascotas en una Casa"</b> con una estética minimalista y acogedora. 
              Para asegurar que sea fluido en cualquier dispositivo, este PoC compara varios parámetros de OGL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { 
                title: "Rendimiento", 
                desc: "Medición de FPS con múltiples modelos 3D y texturas de alta resolución.",
                icon: "⚡"
              },
              { 
                title: "Personalización", 
                desc: "Evaluación de shaders para lograr ese estilo visual 'Cozy' único.",
                icon: "🎨"
              },
              { 
                title: "Interactividad", 
                desc: "Pruebas de latencia en interacciones táctiles: alimentar, tocar y jugar.",
                icon: "🐾"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl text-left border-b-4 border-b-accent/30 hover:border-b-accent transition-all hover:-translate-y-2">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-foreground/60 line-clamp-3">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 border-t border-border">
        <div className="flex items-center gap-3 opacity-50">
          <Image src="/ogl_logo.png" alt="OGL Logo" width={20} height={20} className="grayscale" />
          <span className="text-sm font-bold tracking-tight font-serif">POC-OGL</span>
        </div>
        <p className="text-xs text-foreground/40 font-medium">
          Hecho para probar los límites de la web creativa.
        </p>
      </footer>
    </div>
  );
}
