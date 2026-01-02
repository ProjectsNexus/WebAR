import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize, MoveVertical, RotateCw, RefreshCcw, Pause, Play, Info, Layers, Box, Cpu, X, Move, MousePointer2 } from 'lucide-react';

// Fix for TypeScript errors with A-Frame elements in React 18+
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-entity': any;
      'a-camera': any;
      'a-light': any;
      'a-sky': any;
      'a-marker': any;
      'a-cursor': any;
      'a-box': any;
      'a-sphere': any;
      'a-cylinder': any;
      'a-plane': any;
    }
  }
}

interface ThreeViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
  scale?: number;
  id?: string;
}

interface ModelStats {
  vertices: number;
  triangles: number;
  meshes: number;
  materials: string[];
  nodes: number;
  dimensions: { x: number; y: number; z: number };
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({ modelUrl, autoRotate = false, scale = 1, id }) => {
  const modelRef = useRef<any>(null);
  const rotationContainerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the "Base" transform (calculated automatically on load)
  const [baseTransform, setBaseTransform] = useState({ 
    scale: 1, 
    position: { x: 0, y: 0, z: 0 } 
  });
  
  // User Transform States
  const [userZoom, setUserZoom] = useState(1.0);
  const [userPan, setUserPan] = useState({ x: 0, y: 0 }); // New: Pan X/Y
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Interaction Refs (for smooth animation loop updates without re-renders)
  const manualRotation = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const interactionType = useRef<'none' | 'rotate' | 'pan'>('none');
  
  // Inspector State
  const [showInspector, setShowInspector] = useState(false);
  const [stats, setStats] = useState<ModelStats | null>(null);

  // Sync prop changes if they occur externally
  useEffect(() => {
    setIsRotating(autoRotate);
  }, [autoRotate]);

  // --- Animation Loop ---
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (rotationContainerRef.current) {
        const el = rotationContainerRef.current;
        if (el.object3D) {
            // Apply Auto Rotation if enabled and not currently dragging
            if (isRotating && !isDragging) {
               manualRotation.current.y += 0.005;
            }

            // Apply Composite Rotation (Manual + Auto) directly to Three.js Object
            // We use interpolation for smoothness could be added here, but direct assignment is responsive
            el.object3D.rotation.y = manualRotation.current.y;
            el.object3D.rotation.x = manualRotation.current.x;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating, isDragging]);

  // --- Model Loading Logic ---
  useEffect(() => {
    const handleModelLoaded = (evt: any) => {
        const entity = evt.target;
        const object3D = entity.object3D;
        
        if (object3D) {
            setTimeout(() => {
                const box = new (window as any).THREE.Box3().setFromObject(object3D);
                const size = new (window as any).THREE.Vector3();
                const center = new (window as any).THREE.Vector3();
                box.getSize(size);
                box.getCenter(center);

                const maxDim = Math.max(size.x, size.y, size.z);
                const targetScale = maxDim > 0 ? (3 / maxDim) * scale : 1;
                
                const centeredX = -center.x * targetScale;
                const centeredY = -center.y * targetScale;
                const centeredZ = -center.z * targetScale;
                
                // Stats
                let vertCount = 0;
                let triCount = 0;
                let meshCount = 0;
                let nodeCount = 0;
                const matSet = new Set<string>();

                object3D.traverse((node: any) => {
                    nodeCount++;
                    if (node.isMesh) {
                        meshCount++;
                        const geom = node.geometry;
                        if (geom) {
                            vertCount += geom.attributes.position.count;
                            geom.index ? (triCount += geom.index.count / 3) : (triCount += geom.attributes.position.count / 3);
                        }
                        if (node.material) {
                            const mats = Array.isArray(node.material) ? node.material : [node.material];
                            mats.forEach((m: any) => matSet.add(m.name || 'Untitled Material'));
                        }
                    }
                });

                setStats({
                    vertices: vertCount,
                    triangles: Math.round(triCount),
                    meshes: meshCount,
                    materials: Array.from(matSet),
                    nodes: nodeCount,
                    dimensions: { 
                        x: parseFloat(size.x.toFixed(2)), 
                        y: parseFloat(size.y.toFixed(2)), 
                        z: parseFloat(size.z.toFixed(2)) 
                    }
                });
                
                setBaseTransform({
                    scale: targetScale,
                    position: { x: centeredX, y: centeredY, z: centeredZ }
                });
                setIsLoaded(true);
            }, 100);
        }
    };

    const entity = modelRef.current;
    if (entity) entity.addEventListener('model-loaded', handleModelLoaded);
    return () => { if (entity) entity.removeEventListener('model-loaded', handleModelLoaded); }
  }, [modelUrl, scale]);

  // --- Interaction Handlers ---

  const handlePointerDown = (e: React.PointerEvent) => {
    // Prevent default to stop text selection
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };

    // Determine interaction type: Right click (button 2) is Pan, Left is Rotate
    if (e.button === 2 || e.shiftKey) {
        interactionType.current = 'pan';
    } else {
        interactionType.current = 'rotate';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    if (interactionType.current === 'rotate') {
        // Rotation sensitivity
        const sensitivity = 0.005;
        manualRotation.current.y += deltaX * sensitivity;
        manualRotation.current.x += deltaY * sensitivity;
    } else if (interactionType.current === 'pan') {
        // Pan sensitivity needs to account for zoom level
        const sensitivity = 0.005 / userZoom; 
        setUserPan(prev => ({
            x: prev.x + deltaX * sensitivity * 2,
            y: prev.y - deltaY * sensitivity * 2 // Invert Y for screen coords
        }));
    }

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    interactionType.current = 'none';
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent page scroll
    // e.preventDefault(); // Note: React synthetic events can't always prevent passive window scroll, handled via CSS usually
    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.1, Math.min(5, userZoom - e.deltaY * zoomSpeed));
    setUserZoom(newZoom);
  };

  const handleReset = () => {
      setUserZoom(1.0);
      setUserPan({ x: 0, y: 0 });
      setIsRotating(autoRotate);
      manualRotation.current = { x: 0, y: 0 };
  };

  // Calculate final transforms
  const finalScale = baseTransform.scale * userZoom;
  const finalPosition = `${baseTransform.position.x + userPan.x} ${baseTransform.position.y + userPan.y} ${baseTransform.position.z}`;

  return (
    <div 
        ref={containerRef}
        className={`w-full h-full relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden group touch-none select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()} // Disable context menu for right-click pan
    >
      
      {/* Inspector Panel Overlay */}
      {showInspector && stats && (
        <div 
            className="absolute top-4 left-4 z-40 w-64 bg-surface/95 backdrop-blur-xl border border-surfaceHighlight rounded-xl shadow-2xl animate-in fade-in slide-in-from-left-2 duration-200 flex flex-col max-h-[80%] cursor-default"
            onPointerDown={(e) => e.stopPropagation()} // Prevent rotation when clicking panel
        >
            <div className="flex items-center justify-between p-3 border-b border-surfaceHighlight">
                <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-primary" />
                    <span className="text-xs font-bold text-textMain uppercase tracking-wider">Model Inspector</span>
                </div>
                <button onClick={() => setShowInspector(false)} className="text-textMuted hover:text-white">
                    <X size={14} />
                </button>
            </div>
            
            <div className="p-3 overflow-y-auto custom-scrollbar space-y-4">
                {/* Stats Content */}
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-textMuted flex items-center gap-1"><Box size={10} /> Dimensions</span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-black/40 rounded p-1"><span className="text-[10px] text-red-400 block">X</span><span className="text-xs font-mono text-white">{stats.dimensions.x}</span></div>
                        <div className="bg-black/40 rounded p-1"><span className="text-[10px] text-green-400 block">Y</span><span className="text-xs font-mono text-white">{stats.dimensions.y}</span></div>
                        <div className="bg-black/40 rounded p-1"><span className="text-[10px] text-blue-400 block">Z</span><span className="text-xs font-mono text-white">{stats.dimensions.z}</span></div>
                    </div>
                </div>
                <div className="space-y-1">
                     <span className="text-[10px] uppercase font-bold text-textMuted flex items-center gap-1"><Box size={10} /> Geometry</span>
                    <div className="bg-surfaceHighlight/50 rounded-lg p-2 space-y-1">
                        <div className="flex justify-between text-xs"><span className="text-textMuted">Vertices</span><span className="text-white font-mono">{stats.vertices.toLocaleString()}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-textMuted">Triangles</span><span className="text-white font-mono">{stats.triangles.toLocaleString()}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-textMuted">Meshes</span><span className="text-white font-mono">{stats.meshes}</span></div>
                    </div>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-textMuted flex items-center gap-1"><Layers size={10} /> Materials ({stats.materials.length})</span>
                    <div className="bg-surfaceHighlight/50 rounded-lg p-2 max-h-32 overflow-y-auto custom-scrollbar">
                        {stats.materials.map((mat, i) => (
                            <div key={i} className="text-[10px] text-textMuted border-b border-white/5 last:border-0 py-1 truncate">{mat}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Embedded A-Frame Scene */}
      <a-scene 
        embedded 
        vr-mode-ui="enabled: false"
        renderer="colorManagement: true; antialias: true; alpha: true;"
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }} // Pass through events to React container
      >
        {/* Camera: Locked (Controls Disabled) */}
        <a-entity position="0 0 4">
            <a-camera look-controls-enabled="false" wasd-controls-enabled="false"></a-camera>
        </a-entity>

        <a-light type="ambient" color="#ffffff" intensity="0.5"></a-light>
        <a-light type="directional" position="10 10 5" intensity="1" castShadow="true"></a-light>
        <a-light type="directional" position="-10 5 -5" intensity="0.5"></a-light>

        {/* Rotation Wrapper Controlled by RAF + User Input */}
        <a-entity ref={rotationContainerRef}>
            {/* The Model with transforms */}
            <a-entity 
                ref={modelRef}
                gltf-model={modelUrl}
                scale={`${finalScale} ${finalScale} ${finalScale}`}
                position={finalPosition}
            ></a-entity>
        </a-entity>
      </a-scene>

      {/* Floating Controls Overlay */}
      {isLoaded && (
          <div 
            className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onPointerDown={(e) => e.stopPropagation()} // Prevent scene interaction when using controls
          >
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                        <MousePointer2 size={12} />
                        L: Rotate | R: Pan | Scroll: Zoom
                    </span>
                    <div className="flex gap-2">
                        <button onClick={() => setShowInspector(!showInspector)} className={`p-1.5 rounded-lg transition-colors ${showInspector ? 'bg-primary text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}><Info size={14} /></button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <button onClick={() => setIsRotating(!isRotating)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">{isRotating ? <Pause size={14} /> : <Play size={14} />}</button>
                        <button onClick={handleReset} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"><RefreshCcw size={14} /></button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-textMuted"><Maximize size={12} /><span>Scale</span></div>
                        <input type="range" min="0.1" max="3.0" step="0.1" value={userZoom} onChange={(e) => setUserZoom(parseFloat(e.target.value))} className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"/>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-textMuted"><Move size={12} /><span>Pan Y</span></div>
                        <input type="range" min="-2" max="2" step="0.1" value={userPan.y} onChange={(e) => setUserPan(p => ({...p, y: parseFloat(e.target.value)}))} className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"/>
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* Persistent Badge */}
      <div className="absolute top-4 right-4 pointer-events-none group-hover:opacity-0 transition-opacity">
        <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Interactive 3D
        </div>
      </div>
    </div>
  );
};