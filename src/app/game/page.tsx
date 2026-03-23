'use client';

import { useEffect, useRef } from 'react'; 
import { Renderer, Camera, Transform, Box, Program, Mesh, Color } from 'ogl';

export default function GameScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const cubeRef = useRef<Mesh | null>(null);
  const pulseRef = useRef(0);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Inicializar Renderer (El motor de renderizado)
    const renderer = new Renderer({
      canvas: document.createElement('canvas'),
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      dpr: window.devicePixelRatio,
      alpha: true,
      antialias: true,
    });

    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    rendererRef.current = renderer;

    // 2. Configurar Cámara (Cómo vemos el mundo)
    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 1, 5);
    camera.lookAt([0, 0, 0]);

    // 3. Crear Escena (Nodo raíz de transformación)
    const scene = new Transform();

    // 4. Geometría (La forma)
    // Usamos Box de OGL que ya provee posiciones, normales y UVs
    const geometry = new Box(gl, { width: 1.5, height: 1.5, depth: 1.5 });

    // 5. Material/Programa (Cómo se ve la forma)
    // Implementamos un shader básico que use normales para simular iluminación
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec3 normal;
        attribute vec2 uv;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;
        uniform float uTime;
        uniform float uPulse;

        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vViewPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          
          // Efecto de pulso en el tamaño al hacer click
          float scale = 1.0 + sin(uPulse * 10.0) * 0.1 * exp(-uPulse * 2.0);
          vec3 pos = position * scale;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragment: `
        precision highp float;

        uniform float uTime;
        uniform vec3 uColor;

        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vViewPosition;

        void main() {
          // Simulación de Luz Direccional (Básico)
          vec3 normal = normalize(vNormal);
          vec3 light = normalize(vec3(0.5, 1.0, 0.5));
          float diffuse = dot(normal, light) * 0.5 + 0.5;
          
          // Color dinámico basado en el tiempo
          vec3 color = mix(uColor, vec3(0.1, 0.8, 0.9), sin(uTime) * 0.5 + 0.5);
          
          // Añadir brillo en los bordes (Fresnel suave)
          float fresnel = pow(1.0 + dot(normalize(-vViewPosition), normal), 2.0);
          
          gl_FragColor.rgb = color * diffuse + (fresnel * 0.3);
          gl_FragColor.a = 1.0;
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uColor: { value: new Color('#6366f1') },
      },
      transparent: true,
    });

    // 6. Mesh (Combinación de Geometría + Material)
    const cube = new Mesh(gl, { geometry, program });
    cube.setParent(scene);
    cubeRef.current = cube;

    // 7. Interacciones
    const handleClick = () => {
      pulseRef.current = 0;
      isInteractingRef.current = true;
      // Cambiar color aleatorio al click
      program.uniforms.uColor.value.set(
        Math.random() > 0.5 ? '#f43f5e' : '#10b981'
      );
    };

    gl.canvas.style.cursor = 'pointer';
    gl.canvas.addEventListener('click', handleClick);

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 8. Ciclo de Animación
    let frame: number;
    const update = (time: number) => {
      frame = requestAnimationFrame(update);
      const t = time * 0.001;

      // Rotación del cubo
      cube.rotation.x = t * 0.5;
      cube.rotation.y = t * 0.3;
      cube.rotation.z = t * 0.2;

      // Actualizar uniformes
      program.uniforms.uTime.value = t;
      
      if (isInteractingRef.current) {
        pulseRef.current += 0.05;
        program.uniforms.uPulse.value = pulseRef.current;
        if (pulseRef.current > 3) isInteractingRef.current = false;
      }

      renderer.render({ scene, camera });
    };
    frame = requestAnimationFrame(update);

    // Cleanup
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      gl.canvas.removeEventListener('click', handleClick);
      if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen relative group bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay informativo para el PoC */}
      <div className="absolute top-6 left-6 pointer-events-none select-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
          <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-widest opacity-80">OGL Core Scene</h3>
          <div className="flex gap-4 text-[10px] text-white/60 font-mono">
            <span>● Shapes</span>
            <span>● Materials</span>
            <span>● Lighting</span>
            <span>● Interaction</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 pointer-events-none">
        <p className="text-white/30 text-[10px] font-medium tracking-tighter uppercase italic">
          Haz click para interactuar
        </p>
      </div>
    </div>
  );
}
