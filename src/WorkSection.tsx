import React, { useState, useRef, useEffect } from 'react';
import { 
  Maximize2
} from 'lucide-react';
import { TypographicTunnel } from './TypographicTunnel';

// Work Project Assets
import workBazaarImg from './assets/work_bazaar.jpg';
import workVogueImg from './assets/work_vogue.jpg';
import workSaraSofaImg from './assets/work_sara_sofa.jpg';
import workCampOutdoorImg from './assets/work_camp_outdoor.jpg';
import workPunkEditorialImg from './assets/work_punk_editorial.jpg';
import workBeachManImg from './assets/work_beach_man.jpg';
import workEditorialFashionImg from './assets/work_editorial_fashion.jpg';
import workMenswearBikeImg from './assets/work_menswear_bike.jpg';
import workRooftopSportsImg from './assets/work_rooftop_sports.jpg';

export interface WorkProjectItem {
  id: string;
  brand: string;
  title: string;
  category: string;
  year: string;
  scope: string;
  img: string;
  aspect?: string;
  featured?: boolean;
  publication?: string;
}

interface WorkSectionProps {
  onOpenProjectDetail: (project: {
    title: string;
    category: string;
    img: string;
    brand?: string;
    year?: string;
    scope?: string;
  }) => void;
}

export function WorkSection({ onOpenProjectDetail }: WorkSectionProps) {
  // Curated editorial projects from Dilip Kumar Retouching portfolio
  const projects: WorkProjectItem[] = [
    {
      id: 'north-face',
      brand: 'THE NORTH FACE',
      title: 'Autumn Outerwear Campaign',
      category: 'Commercial Lifestyle',
      year: '2024',
      scope: 'Color Harmonization & Outdoor Dynamic Range',
      img: workCampOutdoorImg,
      publication: 'Global Brand Campaign'
    },
    {
      id: 'elle',
      brand: 'ELLE',
      title: 'Sara Ali Khan Celebrity Feature',
      category: 'Celebrity Editorial',
      year: '2024',
      scope: 'Natural Skin Tones & Velvet Texture Grading',
      img: workSaraSofaImg,
      publication: 'Elle Magazine'
    },
    {
      id: 'vogue',
      brand: 'VOGUE INDIA',
      title: 'Lead with Heart Cover Story',
      category: 'Magazine Cover',
      year: '2024',
      scope: 'Master Cover Color Grading & Beauty Retouch',
      img: workVogueImg,
      publication: 'Vogue India Cover'
    },
    {
      id: 'bazaar',
      brand: "HARPER'S BAZAAR",
      title: 'Alia Bhatt — The Beauty Issue',
      category: 'Magazine Cover',
      year: '2024',
      scope: 'High-End Skin Micro-Texture & Print Master',
      img: workBazaarImg,
      featured: true,
      publication: "Harper's Bazaar India"
    },
    {
      id: 'versace',
      brand: 'VERSACE',
      title: 'Violet Haute Couture Series',
      category: 'Haute Couture',
      year: '2024',
      scope: 'Avant-Garde Lighting & Crystal Embellishment',
      img: workPunkEditorialImg,
      publication: 'Couture Lookbook'
    },
    {
      id: 'ralph-lauren',
      brand: 'RALPH LAUREN',
      title: 'Riviera Resortwear Menswear',
      category: 'Commercial Catalog',
      year: '2024',
      scope: 'Sunlight Luminance & Natural Skin Grading',
      img: workBeachManImg,
      publication: 'Spring/Summer Collection'
    },
    {
      id: 'gucci',
      brand: 'GUCCI',
      title: 'Milan Haute Couture Editorial',
      category: 'Fashion Editorial',
      year: '2024',
      scope: 'Architectural Minimalist Editorial Retouching',
      img: workEditorialFashionImg,
      publication: 'Editorial Campaign'
    },
    {
      id: 'gq-menswear',
      brand: 'GQ MENSWEAR',
      title: 'Urban Cyclist Series',
      category: 'Commercial Editorial',
      year: '2024',
      scope: 'Dynamic Daylight & Technical Fabric Grading',
      img: workMenswearBikeImg,
      publication: 'GQ Fashion Edition'
    },
    {
      id: 'athletics',
      brand: 'ATHLETICS DEPT',
      title: 'High Altitude Rooftop Athletics',
      category: 'Sports & Movement',
      year: '2024',
      scope: 'Kinetic Movement & Atmospheric Tonal Balance',
      img: workRooftopSportsImg,
      publication: 'Performance Series'
    }
  ];

  const totalProjects = projects.length;

  const [hoveredVirtualKey, setHoveredVirtualKey] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1400);
  const [containerHeight, setContainerHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 800);

  // Cyclical animation state: target offset and smoothly lerped current offset
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const targetOffsetRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState<boolean>(false);

  // Resize listener
  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        setContainerWidth(stageRef.current.clientWidth);
      } else {
        setContainerWidth(window.innerWidth);
      }
      setContainerHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Slow-motion physics loop via requestAnimationFrame with delta-time
  // Set to 0.25 speed (slow motion smooth glide taking ~2.0s to settle)
  const lastTimeRef = useRef<number>(performance.now());
  useEffect(() => {
    let active = true;
    lastTimeRef.current = performance.now();

    const animate = (timestamp: number) => {
      if (!active) return;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.064);
      lastTimeRef.current = timestamp;

      const diff = targetOffsetRef.current - currentOffsetRef.current;
      if (Math.abs(diff) > 0.001) {
        // Slow motion decay: exp(-2.65 * 2.0) ≈ 0.005 (reaches 99.5% completion in ~2.0s, 0.25 speed)
        const decayFactor = 1 - Math.exp(-2.65 * dt);
        currentOffsetRef.current += diff * decayFactor;
        setCurrentOffset(currentOffsetRef.current);
      } else if (currentOffsetRef.current !== targetOffsetRef.current) {
        currentOffsetRef.current = targetOffsetRef.current;
        setCurrentOffset(currentOffsetRef.current);
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Window-level non-passive wheel event listener:
  // PREVENTS VERTICAL SCROLLING DOWN ON THE WORK SECTION COMPLETELY.
  // One scroll = one change at slow motion (0.25 speed).
  // Cooldown & accumulator prevents multi-card skipping so each distinct scroll action
  // cleanly advances exactly 1 card at a time with a luxurious slow-motion glide.
  useEffect(() => {
    let wheelAccumulator = 0;
    let lastCycleTime = 0;
    let gestureCooldown = false;

    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if lightbox modal is open
      if (document.querySelector('[data-lightbox-open="true"]')) return;

      // Lock vertical page scroll down completely
      e.preventDefault();

      // Determine scroll delta magnitude
      const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(rawDelta) < 0.5) return;

      const now = performance.now();
      
      // If we are in gesture cooldown from a recent cycle, ignore small inertia ripples
      if (gestureCooldown && now - lastCycleTime < 800) {
        return;
      }
      gestureCooldown = false;

      wheelAccumulator += rawDelta;
      const timeSinceLastCycle = now - lastCycleTime;

      // Detect discrete mouse wheel tick (|delta| >= 25) or accumulated trackpad gesture
      const isTick = Math.abs(rawDelta) >= 25;
      const threshold = isTick ? 25 : 65;

      if ((isTick && timeSinceLastCycle >= 800) || Math.abs(wheelAccumulator) >= threshold) {
        const dir = Math.sign(wheelAccumulator || rawDelta);
        // Advance exactly 1 project card per scroll in slow motion
        targetOffsetRef.current = Math.round(targetOffsetRef.current) + dir;
        wheelAccumulator = 0;
        lastCycleTime = now;
        gestureCooldown = true;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Pointer drag gestures (mouse click-drag & touch swipe)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartOffsetRef.current = targetOffsetRef.current;
    setIsCursorGrabbing(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const deltaY = e.clientY - dragStartYRef.current;
    
    // Support horizontal drag as well as vertical swipe gestures without page scrolling
    const dominantDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : deltaY;
    if (Math.abs(dominantDelta) > 5) {
      hasDraggedRef.current = true;
    }
    // Dragging sensitivity scaled for elegant control
    const sensitivity = containerWidth < 768 ? 0.003 : 0.002;
    targetOffsetRef.current = dragStartOffsetRef.current + dominantDelta * sensitivity;
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsCursorGrabbing(false);
      // Snap cleanly to the nearest project card at slow motion
      targetOffsetRef.current = Math.round(targetOffsetRef.current);
    }
  };

  // Keyboard navigation: 1 keypress = 1 change in slow motion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.querySelector('[data-lightbox-open="true"]')) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetOffsetRef.current = Math.round(targetOffsetRef.current) + 1;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetOffsetRef.current = Math.round(targetOffsetRef.current) - 1;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Responsive semi-circle scaling
  const isMobile = containerWidth < 768;
  const clampedWidth = Math.max(768, Math.min(1800, containerWidth));
  const widthRatio = clampedWidth / 1440;

  // Adapt card dimensions to viewport height and width so everything fits with zero vertical scroll
  const availableStageHeight = Math.max(420, containerHeight - 40);
  const maxCardWidthFromHeight = Math.round(availableStageHeight * 0.56);

  const baseCardWidth = isMobile 
    ? Math.round(Math.min(310, Math.max(240, containerWidth * 0.78)))
    : Math.round(Math.max(230, Math.min(340, 290 * widthRatio)));
  
  const cardWidth = Math.min(baseCardWidth, maxCardWidthFromHeight);
  const radius = Math.round(Math.max(660, Math.min(1120, 940 * widthRatio)));
  const angleStepDeg = isMobile ? 12 : 14.2;

  // Continuous infinite cyclical rendering window
  // Range of virtual keys k that fall within the visible arch
  const visibleSpan = isMobile ? 2.5 : 4.4;
  const minK = Math.floor(-visibleSpan - currentOffset);
  const maxK = Math.ceil(visibleSpan - currentOffset);

  const visibleCards = [];
  for (let k = minK; k <= maxK; k++) {
    const pos = k + currentOffset; // continuous position: 0 is center, < 0 is left, > 0 is right
    const projectIndex = ((k % totalProjects) + totalProjects) % totalProjects;
    const project = projects[projectIndex];
    visibleCards.push({
      virtualKey: k,
      projectIndex,
      project,
      pos
    });
  }

  return (
    <section 
      style={{ touchAction: 'none' }}
      className="w-full h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] bg-[#070709] text-white pt-0 sm:pt-1 pb-3 sm:pb-5 px-3 sm:px-6 lg:px-10 relative overflow-hidden select-none flex flex-col justify-between transition-colors duration-500"
    >
      
      {/* Upper Part: Continuous 3D Running Text / Typographic Tunnel (Balanced screen fit) */}
      <div className="w-full shrink-0 relative flex flex-col items-center justify-center pt-0 pb-0 translate-y-0.5 sm:translate-y-1 z-20 pointer-events-none select-none text-center overflow-visible">
        {/* 3D Typographic Tunnel behind upper Work Section */}
        <div className="relative w-screen -mx-3 sm:-mx-6 lg:-mx-10 h-[120px] sm:h-[145px] md:h-[170px] lg:h-[190px] overflow-hidden flex items-center justify-center">
          <TypographicTunnel speed={36} />
        </div>
      </div>

      {/* MAIN INTERACTIVE CAROUSEL STAGE (Shifted noticeably higher) */}
      <div 
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative z-10 w-full max-w-[1740px] mx-auto flex-1 min-h-0 flex items-end justify-center pb-2 sm:pb-4 pt-0 -translate-y-8 sm:-translate-y-14 md:-translate-y-20 lg:-translate-y-24 ${
          isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="relative w-full flex items-center justify-center">
          {visibleCards.map(({ virtualKey, project, pos }) => {
            const isHovered = hoveredVirtualKey === virtualKey;
            const distFromCenter = Math.abs(pos);
            const isCenter = distFromCenter < 0.45;

            // Geometry calculations
            let xOffsetPx = 0;
            let yArcPx = 0;
            let baseRotation = 0;
            let opacity = 1;

            if (isMobile) {
              // Mobile horizontal flow with subtle arc
              const spacing = cardWidth + 18;
              xOffsetPx = pos * spacing;
              yArcPx = Math.abs(pos) * 14;
              baseRotation = pos * 2.2;
              if (distFromCenter > 1.2) {
                opacity = Math.max(0, 1 - (distFromCenter - 1.2) / 0.9);
              }
            } else {
              // Desktop & Tablet: Semi-circle trigonometry (Apex at X=0, Y=0)
              const angleDeg = pos * angleStepDeg;
              const angleRad = (angleDeg * Math.PI) / 180;

              xOffsetPx = radius * Math.sin(angleRad);
              yArcPx = radius * (1 - Math.cos(angleRad));
              baseRotation = angleDeg * 0.82;

              // Graceful fade out at the edges before looping offscreen
              if (distFromCenter > 2.7) {
                opacity = Math.max(0, 1 - (distFromCenter - 2.7) / 1.1);
              }
            }

            // Depth stacking: center cards higher, hovered card on top
            const baseZIndex = Math.max(10, Math.round(50 - distFromCenter * 10));
            const currentZIndex = isHovered ? 120 : isCenter ? 65 : baseZIndex;

            // Active scale and lift
            const centerScaleBoost = Math.max(0, 1 - distFromCenter * 0.7) * 0.07;
            const activeScale = isHovered ? (isMobile ? 1.04 : 1.14) : 1.0 + centerScaleBoost;
            const activeRotate = isHovered ? 0 : baseRotation;
            const activeTranslateY = isHovered ? (isMobile ? yArcPx - 14 : yArcPx - 34) : yArcPx;

            return (
              <div
                key={virtualKey}
                onMouseEnter={() => setHoveredVirtualKey(virtualKey)}
                onMouseLeave={() => setHoveredVirtualKey(null)}
                onClick={() => {
                  if (hasDraggedRef.current) return;
                  onOpenProjectDetail({
                    title: project.title,
                    category: project.category,
                    img: project.img,
                    brand: project.brand,
                    year: project.year,
                    scope: project.scope
                  });
                }}
                style={{
                  transform: `translate3d(${xOffsetPx}px, ${activeTranslateY}px, 0) rotate(${activeRotate}deg) scale(${activeScale})`,
                  zIndex: currentZIndex,
                  opacity: opacity,
                  pointerEvents: opacity < 0.2 ? 'none' : 'auto',
                  willChange: 'transform, opacity'
                }}
                className={`absolute will-change-transform select-none ${
                  isHovered 
                    ? 'shadow-[0_36px_80px_-15px_rgba(0,0,0,0.95),0_18px_36px_rgba(0,0,0,0.85)]' 
                    : isCenter
                      ? 'shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85),0_10px_24px_rgba(0,0,0,0.65)]'
                      : 'shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7),0_6px_16px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Pure Image Card - All borders, brand name, and descriptions removed */}
                <div 
                  style={{ width: `${cardWidth}px` }}
                  className="rounded-[14px] overflow-hidden transition-all duration-700 relative group"
                >
                  {/* Clean Image Container with Editorial 3:4 Aspect Ratio, no borders, no padding */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 pointer-events-none rounded-[14px]">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out select-none"
                    />

                    {/* Subtle Hover Overlay with View Detail indicator */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-black/80 text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase shadow-xl flex items-center gap-1.5 animate-fadeIn">
                          <span>VIEW DETAIL</span>
                          <Maximize2 size={12} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

