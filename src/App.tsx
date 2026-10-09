import React, { useState, useEffect, useRef, useMemo } from 'react';
import heroImg from './assets/hero_model.jpg';
import portfolioFashionImg from './assets/portfolio_fashion.jpg';
import portfolioAdvImg from './assets/portfolio_adv.jpg';
import portfolioProductImg from './assets/portfolio_product.jpg';
import dilipIsolatedImg from './assets/dilip_kumar_white.jpg';

// Work Gallery Assets
import workBazaarImg from './assets/work_bazaar.jpg';
import workVogueImg from './assets/work_vogue.jpg';
import workSaraSofaImg from './assets/work_sara_sofa.jpg';
import workCampOutdoorImg from './assets/work_camp_outdoor.jpg';
import workPunkEditorialImg from './assets/work_punk_editorial.jpg';
import workBeachManImg from './assets/work_beach_man.jpg';
import workBackstageImg from './assets/work_backstage.jpg';
import workMenswearBikeImg from './assets/work_menswear_bike.jpg';
import workRooftopSportsImg from './assets/work_rooftop_sports.jpg';
import workEditorialFashionImg from './assets/work_editorial_fashion.jpg';
import fashionModelImg from './assets/fashion_model.jpg';
import { WorkSection } from './WorkSection';

import { 
  X, 
  Menu, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Send,
  Globe,
  RefreshCw,
  Sparkles,
  RotateCcw,
  Instagram,
  Linkedin
} from 'lucide-react';

function BehanceIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.228 15.01c.743 0 1.343-.171 1.8-.514.457-.343.686-.857.686-1.543 0-.571-.171-1.029-.514-1.371-.343-.343-.8-.514-1.371-.514H5.371v3.943h2.857zm-.229-5.486c.629 0 1.114-.143 1.457-.429.343-.286.514-.714.514-1.286 0-.514-.143-.914-.429-1.2-.286-.286-.743-.429-1.371-.429H5.371v3.343H8zm5.772 3.657c0 .857.257 1.514.771 1.971.514.457 1.2.686 2.057.686.8 0 1.457-.2 1.971-.6.286-.229.514-.543.686-.943h2.229c-.286 1.086-.857 1.943-1.714 2.571-.857.629-1.943.943-3.257.943-1.6 0-2.886-.486-3.857-1.457-.971-.971-1.457-2.286-1.457-3.943s.486-3.029 1.457-4c.971-.971 2.229-1.457 3.771-1.457 1.657 0 2.943.514 3.857 1.543.914 1.029 1.371 2.457 1.371 4.286v.4h-7.886zm5.829-1.771c-.057-.743-.286-1.314-.686-1.714-.4-.4-.971-.6-1.714-.6-.686 0-1.257.2-1.714.6-.457.4-.743.971-.8 1.714h4.914zM14.629 6.229h4.571v1.371h-4.571V6.229zM2.857 3.429h5.657c1.657 0 2.943.4 3.857 1.2.914.8 1.371 1.886 1.371 3.257 0 .971-.257 1.8-.771 2.486-.514.686-1.2 1.171-2.057 1.457 1.086.286 1.914.857 2.486 1.714.571.857.857 1.886.857 3.086 0 1.6-.543 2.886-1.629 3.857-1.086.971-2.543 1.457-4.371 1.457H2.857V3.429z" />
    </svg>
  );
}

/**
 * High-Performance Fast Image Component
 * Renders progressive image data immediately with zero artificial delay or blur lag
 */
interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  imageClassName?: string;
  src: string;
  alt: string;
  fetchPriority?: "high" | "low" | "auto";
}

function SmoothImage({
  src,
  alt,
  containerClassName = "",
  imageClassName = "",
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...props
}: SmoothImageProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0a0a0c] ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={`w-full h-full ${
          imageClassName?.includes('object-') ? '' : 'object-cover'
        } ${imageClassName || className}`}
        {...props}
      />
    </div>
  );
}

interface PortfolioCardProps {
  card: {
    id: string;
    line1: string;
    line2: string;
    img: string;
    alt: string;
    category: string;
  };
  onClick: () => void;
}

function InteractivePortfolioCard({ card, onClick }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    setMousePos({ x, y, normX, normY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
  };

  // 3D Magnetic tilt angles & parallax image shift
  const rotateX = isHovered ? -mousePos.normY * 7.5 : 0;
  const rotateY = isHovered ? mousePos.normX * 7.5 : 0;
  const shiftImgX = isHovered ? -mousePos.normX * 8 : 0;
  const shiftImgY = isHovered ? -mousePos.normY * 8 : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1000 }}
      className="relative aspect-[3.15/4] rounded-[18px] sm:rounded-[20px] cursor-pointer select-none group"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#0d0d10] border border-white/10 shadow-2xl shadow-black/80 group-hover:shadow-black group-hover:border-white/30 transition-all duration-300 relative"
      >
        {/* Parallax Image Shift with SmoothImage Reveal */}
        <div
          className="absolute inset-[-10px] overflow-hidden"
          style={{
            transform: isHovered
              ? `translate(${shiftImgX}px, ${shiftImgY}px) scale(1.06)`
              : 'translate(0px, 0px) scale(1.02)',
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
          }}
        >
          <SmoothImage
            src={card.img}
            alt={card.alt}
            imageClassName="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Ambient Torch / Cursor Spotlight Glow Following Mouse Coordinate */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.12), transparent 75%)`,
          }}
        />

        {/* Text in Bottom-Left Corner with 3D Depth Shift */}
        <div
          className="absolute bottom-6 left-6 right-6 pointer-events-none z-20"
          style={{
            transform: isHovered
              ? `translate(${mousePos.normX * 5}px, ${mousePos.normY * 5}px)`
              : 'translate(0, 0)',
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s ease-out',
          }}
        >
          <p className="font-bold text-[13px] sm:text-[14px] tracking-[0.06em] leading-[1.25] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {card.line1}<br />
            {card.line2}
          </p>
        </div>
      </div>
    </div>
  );
}

function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [headlineCount, setHeadlineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const fullHeadline = "METICULOUS CRAFTSMANSHIP";
  
  const paragraphWords = [
    { text: "Combining", lineBreak: false },
    { text: "over", lineBreak: false },
    { text: "13", lineBreak: false },
    { text: "years", lineBreak: false },
    { text: "of", lineBreak: false },
    { text: "individual", lineBreak: false },
    { text: "expertise", lineBreak: false },
    { text: "with", lineBreak: false },
    { text: "a", lineBreak: false },
    { text: "specialized", lineBreak: false },
    { text: "team", lineBreak: false },
    { text: "of", lineBreak: false },
    { text: "artists,", lineBreak: false },
    { text: "we", lineBreak: true },
    { text: "deliver", lineBreak: false },
    { text: "high-quality,", lineBreak: false },
    { text: "creative", lineBreak: false },
    { text: "post-production", lineBreak: false },
    { text: "for", lineBreak: false },
    { text: "the", lineBreak: false },
    { text: "commercial", lineBreak: false },
    { text: "and", lineBreak: false },
    { text: "fashion", lineBreak: false },
    { text: "industries.", lineBreak: false },
    { text: "As", lineBreak: false },
    { text: "a", lineBreak: true },
    { text: "premium", lineBreak: false },
    { text: "B2B", lineBreak: false },
    { text: "service", lineBreak: false },
    { text: "provider,", lineBreak: false },
    { text: "we", lineBreak: false },
    { text: "approach", lineBreak: false },
    { text: "every", lineBreak: false },
    { text: "pixel", lineBreak: false },
    { text: "with", lineBreak: false },
    { text: "uncompromised", lineBreak: false },
    { text: "dedication.", lineBreak: false },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Reset when user slides back up into the intro section
          setInView(false);
          setHeadlineCount(0);
          setWordCount(0);
          setIsFinished(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setHeadlineCount(0);
      setWordCount(0);
      setIsFinished(false);
      return;
    }

    // 1. Headline letter-by-letter typing write effect (crisp and fluid)
    let char = 0;
    const headlineInterval = setInterval(() => {
      char++;
      setHeadlineCount(char);
      if (char >= fullHeadline.length) {
        clearInterval(headlineInterval);
      }
    }, 32);

    // 2. Paragraph word-by-word streaming effect (starts seamlessly as headline flows)
    let word = 0;
    const startWordTimeout = setTimeout(() => {
      const wordInterval = setInterval(() => {
        word++;
        setWordCount(word);
        if (word >= paragraphWords.length) {
          clearInterval(wordInterval);
          setTimeout(() => setIsFinished(true), 250);
        }
      }, 40);
      return () => clearInterval(wordInterval);
    }, 380);

    return () => {
      clearInterval(headlineInterval);
      clearTimeout(startWordTimeout);
    };
  }, [inView]);

  return (
    <section 
      id="our-philosophy" 
      ref={sectionRef} 
      className="w-full bg-[#050505] text-white border-t border-white/10 py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 text-center select-none"
    >
      <div className="max-w-[880px] mx-auto">
        
        {/* Philosophy Kicker with subtle fade */}
        <h3 className={`text-[12.5px] sm:text-[13.5px] font-bold tracking-[0.22em] text-white uppercase mb-5 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}>
          OUR PHILOSOPHY
        </h3>

        {/* Philosophy Headline with Smooth Typing Flow (Zero Jitter, In-Place Letter Reveal with Tracking Pen) */}
        <h2 className="text-[32px] sm:text-[40px] md:text-[44px] font-normal tracking-[0.02em] leading-tight text-white uppercase mb-7 font-sans min-h-[48px] sm:min-h-[56px] flex items-center justify-center select-none">
          <span className="inline-flex items-center justify-center flex-wrap">
            {fullHeadline.split('').map((char, index) => {
              const isRevealed = inView && index < headlineCount;
              const isActivelyWriting = inView && index === headlineCount - 1 && headlineCount < fullHeadline.length;
              return (
                <React.Fragment key={index}>
                  <span
                    className={`inline-block transition-all duration-200 ${
                      isRevealed
                        ? 'opacity-100 translate-y-0 text-white scale-100 filter-none'
                        : 'opacity-0 translate-y-1 text-transparent scale-95 blur-[1px] pointer-events-none'
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                  {isActivelyWriting && (
                    <span className="inline-block w-[2.5px] h-[26px] sm:h-[34px] bg-white ml-0.5 -mr-1 animate-cursor-fast align-middle" />
                  )}
                </React.Fragment>
              );
            })}
          </span>
        </h2>

        {/* Philosophy Description Paragraph with Liquid Word Flow and Writing Effect (Fixed Layout, Zero Bounce) */}
        <p className="text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-[1.65] max-w-[760px] mx-auto mb-9 sm:mb-10 min-h-[72px]">
          {paragraphWords.map((item, idx) => {
            const isRevealed = inView && idx < wordCount;
            const isActivelyWriting = inView && idx === wordCount - 1 && !isFinished;
            return (
              <React.Fragment key={idx}>
                <span
                  className={`inline-block mr-[0.28em] transition-all duration-300 ease-out ${
                    isRevealed
                      ? 'opacity-100 translate-y-0 text-white blur-0'
                      : 'opacity-0 translate-y-1.5 text-transparent blur-[2px] pointer-events-none'
                  }`}
                >
                  {item.text}
                </span>
                {isActivelyWriting && (
                  <span className="inline-block w-[2px] h-[15px] bg-white ml-0.5 -mr-1 animate-cursor-fast align-middle" />
                )}
                {item.lineBreak && <br className="hidden md:inline" />}
              </React.Fragment>
            );
          })}
        </p>

        {/* Philosophy Core Values List with graceful cascade */}
        <div className={`flex flex-wrap items-center justify-center gap-y-2 text-[13px] sm:text-[13.5px] text-white font-semibold transition-all duration-700 ${
          isFinished || (inView && wordCount >= paragraphWords.length - 2)
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <span>Excellence</span>
          <span className="mx-4 sm:mx-5 text-white/50 font-bold">•</span>
          <span>Collaboration</span>
          <span className="mx-4 sm:mx-5 text-white/50 font-bold">•</span>
          <span>Innovation</span>
          <span className="mx-4 sm:mx-5 text-white/50 font-bold">•</span>
          <span>Precision</span>
          <span className="mx-4 sm:mx-5 text-white/50 font-bold">•</span>
          <span>Attention to detail</span>
        </div>

      </div>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'work' | 'about' | 'contact'>('home');
  const [heroAnimationKey, setHeroAnimationKey] = useState(0);
  const [aboutAnimationKey, setAboutAnimationKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ 
    title: string; 
    category: string; 
    img: string;
    brand?: string;
    year?: string;
    scope?: string;
  } | null>(null);

  // Home Hero Intro Images Carousel (9:16 Aspect Ratio with Smooth Cross-Fade Transition)
  const homeHeroImages = useMemo(() => [
    { id: 1, img: heroImg, alt: 'Redken Commercial Hair & Beauty Campaign' },
    { id: 2, img: workVogueImg, alt: 'Vogue India High Fashion Editorial' },
    { id: 3, img: workBazaarImg, alt: 'Harper’s Bazaar India Editorial Cover' },
    { id: 4, img: portfolioFashionImg, alt: 'High Fashion Crimson Gown Editorial' }
  ], []);

  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const [prevHeroImgIndex, setPrevHeroImgIndex] = useState<number | null>(null);
  const [isShining, setIsShining] = useState(false);
  const [shineKey, setShineKey] = useState(0);

  useEffect(() => {
    if (activeTab !== 'home') return;

    let isCancelled = false;
    let shineTimer: ReturnType<typeof setTimeout>;
    let changeTimer: ReturnType<typeof setTimeout>;
    let endShineTimer: ReturnType<typeof setTimeout>;

    const scheduleNextTransition = () => {
      // Current image displays for 4 seconds before the lighting begins
      shineTimer = setTimeout(() => {
        if (isCancelled) return;

        // Step 1: Slower, graceful lighting sweeps across current slide
        setIsShining(true);
        setShineKey((k) => k + 1);

        // Step 2: Exactly 2 seconds after lighting starts, slide starts changing
        changeTimer = setTimeout(() => {
          if (isCancelled) return;
          setHeroImgIndex((current) => {
            setPrevHeroImgIndex(current);
            return (current + 1) % homeHeroImages.length;
          });

          // Conclude the shine beam after its complete 2.2s sweep and schedule next cycle
          endShineTimer = setTimeout(() => {
            if (!isCancelled) {
              setIsShining(false);
              scheduleNextTransition();
            }
          }, 350);
        }, 2000);
      }, 4000);
    };

    scheduleNextTransition();

    return () => {
      isCancelled = true;
      clearTimeout(shineTimer);
      clearTimeout(changeTimer);
      clearTimeout(endShineTimer);
    };
  }, [activeTab, homeHeroImages.length]);

  // Global background asset pre-decoding so all pages, collage, and portfolio load silky smooth
  useEffect(() => {
    const assetsToWarm = [
      dilipIsolatedImg,
      portfolioFashionImg,
      portfolioAdvImg,
      portfolioProductImg,
      workBazaarImg,
      workVogueImg,
      workSaraSofaImg,
      workCampOutdoorImg,
      workPunkEditorialImg,
      workBeachManImg,
      workBackstageImg,
      workMenswearBikeImg,
      workRooftopSportsImg,
      workEditorialFashionImg,
      fashionModelImg
    ];

    const warmAssets = () => {
      assetsToWarm.forEach((src) => {
        const img = new Image();
        img.src = src;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(warmAssets, { timeout: 1200 });
    } else {
      setTimeout(warmAssets, 200);
    }
  }, []);

  const [sectionMouse, setSectionMouse] = useState({ x: 0, y: 0, active: false });

  const homePortfolioCards = [
    {
      id: 'fashion',
      line1: 'FASHION',
      line2: 'RETOUCHING',
      img: portfolioFashionImg,
      alt: 'Fashion Retouching - Red Gown Editorial on Leather Sofa',
      category: 'Fashion Editorial'
    },
    {
      id: 'adv',
      line1: 'ADVERTISING',
      line2: 'RETOUCHING',
      img: portfolioAdvImg,
      alt: 'Advertising Retouching - Male Model with Audio Headphones',
      category: 'Commercial Advertising'
    },
    {
      id: 'beauty',
      line1: 'BEAUTY & HAIR',
      line2: 'RETOUCHING',
      img: heroImg,
      alt: 'Beauty & Hair Retouching - Redken Campaign Model',
      category: 'Beauty & Skincare'
    },
    {
      id: 'product',
      line1: 'FOOD & PRODUCT',
      line2: 'RETOUCHING',
      img: portfolioProductImg,
      alt: 'Food & Product Retouching - Luxury Designer Handbags & Cosmetics',
      category: 'Luxury Product'
    },
    {
      id: 'couture',
      line1: 'HAUTE COUTURE',
      line2: 'EDITORIAL',
      img: workEditorialFashionImg,
      alt: 'Haute Couture Editorial Campaign - Architectural Studio Series',
      category: 'Couture Editorial'
    },
    {
      id: 'cover',
      line1: 'VOGUE INDIA',
      line2: 'COVER STORY',
      img: workVogueImg,
      alt: 'Vogue India - Cover Story Campaign',
      category: 'Magazine Cover'
    }
  ];

  const scrollToPortfolio = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('our-portfolio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToPhilosophy = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('our-philosophy');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Lock body vertical scroll when viewing the Work section
  useEffect(() => {
    if (activeTab === 'work') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeTab]);

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black flex flex-col justify-between relative font-sans ${activeTab === 'work' ? 'h-screen max-h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
      
      {/* Top Header / Navigation Bar (Flows naturally with the page, does not stick to same place) */}
      <header className="w-full relative z-40 bg-[#050505] shadow-xl shadow-black/70">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 pt-5 sm:pt-6 pb-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => {
              setActiveTab('home');
              setHeroAnimationKey((k) => k + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Dilip Kumar Retouching Home"
          >
            <div className="flex flex-col items-start select-none">
              <span className="font-bold tracking-[0.2em] text-[18px] sm:text-[19px] leading-tight text-white uppercase font-sans">
                DILIP KUMAR
              </span>
              <span className="mt-1 font-semibold tracking-[0.45em] text-[10px] sm:text-[10.5px] leading-none text-white/80 uppercase block pl-[2px] transition-colors group-hover:text-white">
                RETOUCHING
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-16 mr-6 lg:mr-16">
            <button
              onClick={() => {
                setActiveTab('home');
                setHeroAnimationKey((k) => k + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[12.5px] tracking-[0.16em] uppercase transition-colors duration-200 cursor-pointer ${
                activeTab === 'home' 
                  ? 'text-white font-bold' 
                  : 'text-white/60 hover:text-white font-medium'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => {
                setActiveTab('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[12.5px] tracking-[0.16em] uppercase transition-colors duration-200 cursor-pointer ${
                activeTab === 'work' 
                  ? 'text-white font-bold' 
                  : 'text-white/60 hover:text-white font-medium'
              }`}
            >
              WORK
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                setAboutAnimationKey((k) => k + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[12.5px] tracking-[0.16em] uppercase transition-colors duration-200 cursor-pointer ${
                activeTab === 'about' 
                  ? 'text-white font-bold' 
                  : 'text-white/60 hover:text-white font-medium'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[12.5px] tracking-[0.16em] uppercase transition-colors duration-200 cursor-pointer ${
                activeTab === 'contact' 
                  ? 'text-white font-bold' 
                  : 'text-white/60 hover:text-white font-medium'
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0c] px-6 py-6 space-y-4">
            <button
              onClick={() => { 
                setActiveTab('home'); 
                setHeroAnimationKey((k) => k + 1);
                setMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2 text-[14px] tracking-[0.2em] uppercase font-bold ${
                activeTab === 'home' ? 'text-white' : 'text-white/70'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => { 
                setActiveTab('work'); 
                setMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2 text-[14px] tracking-[0.2em] uppercase font-bold ${
                activeTab === 'work' ? 'text-white' : 'text-white/70'
              }`}
            >
              WORK
            </button>
            <button
              onClick={() => { 
                setActiveTab('about'); 
                setAboutAnimationKey((k) => k + 1);
                setMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2 text-[14px] tracking-[0.2em] uppercase font-bold ${
                activeTab === 'about' ? 'text-white' : 'text-white/70'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => { 
                setActiveTab('contact'); 
                setMobileMenuOpen(false); 
              }}
              className={`block w-full text-left py-2 text-[14px] tracking-[0.2em] uppercase font-bold ${
                activeTab === 'contact' ? 'text-white' : 'text-white/70'
              }`}
            >
              CONTACT
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col justify-center relative ${activeTab === 'work' ? 'h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] overflow-hidden min-h-0' : 'overflow-hidden'}`}>

        {/* Dynamic Animated Section Container on Navigation */}
        <div key={`section-view-${activeTab}`} className={`w-full flex-1 flex flex-col justify-center animate-section-enter ${activeTab === 'work' ? 'h-full min-h-0 overflow-hidden' : ''}`}>

        {/* 1. ABOUT VIEW (Screenshot 53 - 1:1 Pixel-Accurate Recreation) */}
        {activeTab === 'about' && (
          <section className="w-full bg-[#050505] text-white py-10 sm:py-14 px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-[1020px] mx-auto">
              
              {/* Top Hero: Stats & Greeting Left + Dilip Kumar Portrait Right */}
              <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 mb-10">
                
                {/* Left Side: Stats Counter + "Hello -By Dilip Kumar" */}
                <div className="flex-1 pt-2 sm:pt-4">
                  
                  {/* Stats Counter Row */}
                  <div className="flex items-start gap-12 sm:gap-16 mb-8 sm:mb-10">
                    <div>
                      <div className="text-[24px] sm:text-[28px] font-bold text-white tracking-normal">
                        + 2000
                      </div>
                      <div className="text-[13px] sm:text-[14px] text-white/90 font-semibold mt-0.5">
                        Project completed
                      </div>
                    </div>
                    <div>
                      <div className="text-[24px] sm:text-[28px] font-bold text-white tracking-normal">
                        + 100
                      </div>
                      <div className="text-[13px] sm:text-[14px] text-white/90 font-semibold mt-0.5">
                        Clients
                      </div>
                    </div>
                  </div>

                  {/* Primary Heading: Hello */}
                  <div className="mt-2">
                    <h1 className="text-[64px] sm:text-[76px] lg:text-[88px] font-normal text-white leading-none tracking-tight font-sans">
                      Hello
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-white font-normal mt-3.5 tracking-normal">
                      -By <span className="text-white font-bold">Dilip Kumar</span>
                    </p>
                  </div>

                </div>

                {/* Right Side: Single Person Image with Background Removed & Smooth Rise-Up Entrance Animation */}
                <div 
                  key={`about-portrait-${aboutAnimationKey}`}
                  className="w-full sm:w-[320px] md:w-[360px] lg:w-[390px] flex flex-col items-center md:items-end animate-smooth-rise-up"
                >
                  <div className="group w-full max-w-[340px] aspect-[3.1/4] rounded-2xl overflow-hidden bg-[#0c0c0e] border border-white/15 flex items-center justify-center relative select-none shadow-2xl shadow-black transition-all duration-500">
                    <SmoothImage 
                      src={dilipIsolatedImg} 
                      alt="Dilip Kumar - Lead Retoucher & Creative Director" 
                      containerClassName="w-full h-full bg-[#0c0c0e]"
                      imageClassName="object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="eager"
                    />

                    {/* Seamless bottom fade gradient to blend naturally with the black magic backdrop */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none z-10" />
                  </div>
                </div>

              </div>

              {/* Lower Section: Full Biography & Story Text */}
              <div className="max-w-[780px] text-[13px] sm:text-[13.5px] text-white leading-[1.65] font-normal space-y-5 pt-2">
                <p>
                  I’m Dilip Kumar, a passionate retoucher and editing professional with over 13 years of experience in the field. My journey began at the age of 17 when I discovered my love for photography and editing. What started as a hobby quickly evolved into a fulfilling career as I embraced the world of retouching and post-production.
                </p>

                <p>
                  Over the years, I've learned invaluable lessons through both challenges and successes. Each mistake has been an opportunity for growth, and I’ve always strived to improve my skills and refine my craft. This relentless pursuit of excellence continues to drive me every day.
                </p>

                <p>
                  Today, I lead a talented team of 10 dedicated professionals, and together we offer high-quality retouching services. We've had the privilege of working with some of the most esteemed photographers and advertising agencies, delivering work that meets the highest standards of creativity and precision.<br />
                  Our mission is simple: to transform images into visual masterpieces that resonate with audiences and leave a lasting impression.
                </p>

                <p>
                  Thank you for taking the time to learn about my journey. I hope our work reflects the passion, dedication, and attention to detail we pour into every project.<br />
                  Let’s create something extraordinary together!
                </p>

                <p className="pt-3 text-white text-[14.5px] font-bold">
                  Dilip Kumar
                </p>
              </div>

            </div>
          </section>
        )}

        {/* 2. WORK GALLERY VIEW (The Retoucher Book - Curved Editorial Semicircular Showcase) */}
        {activeTab === 'work' && (
          <WorkSection 
            onOpenProjectDetail={(project) => {
              setActiveLightboxImage({
                title: project.title,
                category: project.category,
                img: project.img,
                brand: project.brand,
                year: project.year,
                scope: project.scope
              });
            }}
          />
        )}

        {/* 3. HOME VIEW (Screenshot 50 & 51 - Hero + Philosophy + 4-Card Portfolio) */}
        {activeTab === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="w-full min-h-[calc(100vh-100px)] flex items-center py-8 sm:py-12 lg:py-16 bg-[#050505] text-white">
              <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                
                {/* Left Column: Typography & CTA */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center lg:pr-4">
                  
                  {/* Kicker Tagline with Replay Writing Action */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <h2 className="text-[12.5px] sm:text-[13.5px] font-bold tracking-[0.16em] text-white uppercase">
                      PROFESSIONAL PHOTO EDITING &amp; RETOUCHING
                    </h2>
                    <button
                      type="button"
                      onClick={() => setHeroAnimationKey((k) => k + 1)}
                      className="p-1 rounded text-white hover:text-white/70 transition-colors cursor-pointer"
                      title="Replay handwriting animation"
                      aria-label="Replay handwriting animation"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>

                  {/* Primary Hero Headline in Postamp Grotesk Font (Same Space & Location) */}
                  <h1 
                    key={`hero-title-${heroAnimationKey}`}
                    style={{
                      fontFamily: "'Postamp Grotesk', 'Post Grotesk', 'Host Grotesk', 'Bricolage Grotesque', 'Montserrat', sans-serif"
                    }}
                    className="font-postamp text-[48px] sm:text-[64px] md:text-[76px] lg:text-[84px] xl:text-[92px] font-extrabold tracking-[-0.025em] leading-[1.03] text-white uppercase mb-6 sm:mb-7 select-none flex flex-col items-start"
                  >
                    {/* Line 1: PERFECTION */}
                    <span className="relative inline-block w-fit max-w-full overflow-hidden py-0.5">
                      <span className="hero-ink-line-1 block text-white font-postamp">PERFECTION</span>
                    </span>

                    {/* Line 2: IN EVERY */}
                    <span className="relative inline-block w-fit max-w-full overflow-hidden py-0.5">
                      <span className="hero-ink-line-2 block text-white font-postamp">IN EVERY</span>
                    </span>

                    {/* Line 3: PIXEL. */}
                    <span className="relative inline-block w-fit max-w-full overflow-hidden py-0.5">
                      <span className="hero-ink-line-3 block text-white font-postamp">PIXEL.</span>
                    </span>
                  </h1>

                  {/* Description Body Text (Larger, Bolder, with Fluid Ink Writing Reveal) */}
                  <div key={`hero-sub-${heroAnimationKey}`} className="relative inline-block w-fit max-w-[620px] mb-8 sm:mb-9 overflow-hidden">
                    <p className="hero-ink-subtext text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[21px] font-bold text-white leading-[1.55] tracking-[0.01em]">
                      High-end retouching services for brands, photographers and<br className="hidden sm:inline" /> agencies worldwide. Quality that speaks. Results that sell.
                    </p>
                  </div>

                  {/* Explore Work CTA Button */}
                  <div>
                    <button
                      onClick={() => {
                        setActiveTab('work');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-3.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#141416] hover:bg-[#222226] text-white border-2 border-white text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-black/80 hover:shadow-white/10 group cursor-pointer"
                    >
                      <span className="text-white">EXPLORE WORK</span>
                      <span className="text-[15px] leading-none transition-transform duration-300 group-hover:translate-x-1 font-sans text-white">→</span>
                    </button>
                  </div>

                </div>

                {/* Right Column: Hero Intro Multi-Image Showcase with Expanded Width, Subtle Float & Transition Shine */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end">
                  <div className="w-full flex justify-center lg:justify-end animate-subtle-float">
                    <div className="group w-full max-w-[500px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] aspect-[3.45/4] max-h-[660px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0c0c0e] shadow-2xl shadow-black relative select-none transition-all duration-500 isolate transform-gpu border-0">
                      
                      {/* All Hero Images with Silky Non-Jarring Cross-Fade */}
                      {homeHeroImages.map((item, idx) => {
                        const isCurrent = idx === heroImgIndex;
                        const isPrevious = idx === prevHeroImgIndex;
                        return (
                          <img
                            key={item.id}
                            src={item.img}
                            alt={item.alt}
                            className={`absolute inset-0 w-full h-full object-cover object-center hero-crossfade-img group-hover:scale-[1.02] ${
                              isCurrent
                                ? 'hero-crossfade-active'
                                : isPrevious
                                ? 'hero-crossfade-prev'
                                : 'hero-crossfade-idle'
                            }`}
                            loading={idx === 0 ? "eager" : "lazy"}
                            decoding={idx === 0 ? "sync" : "async"}
                            fetchPriority={idx === 0 ? "high" : "low"}
                          />
                        );
                      })}

                      {/* Elegant Subtle Light Sheen Beam: Lighting happens, then after 2s slide changes */}
                      {isShining && (
                        <div
                          key={`hero-shine-${shineKey}`}
                          className="hero-slide-shine absolute inset-0 pointer-events-none z-30"
                        />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* OUR PHILOSOPHY SECTION (Screenshot 51 - White Background with Smooth Text Flow & Write Effect) */}
            <PhilosophySection />

            {/* OUR PORTFOLIO SECTION (Screenshot 51 - Light Background with Interactive Cursor Glow & Magnetic 3D Cards) */}
            <section 
              id="our-portfolio" 
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSectionMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
              }}
              onMouseLeave={() => setSectionMouse((prev) => ({ ...prev, active: false }))}
              className="w-full bg-[#050505] text-white pt-20 pb-28 sm:py-24 lg:py-28 px-0 relative overflow-hidden"
            >
              {/* Atmospheric Cursor Background Ambient Glow */}
              {sectionMouse.active && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(750px circle at ${sectionMouse.x}px ${sectionMouse.y}px, rgba(255, 255, 255, 0.05), transparent 75%)`,
                  }}
                />
              )}

              <div className="w-full relative z-10">
                
                {/* Section Title & Subtitle */}
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center mb-10 sm:mb-14">
                  <h2 className="text-[22px] sm:text-[24px] font-normal tracking-[0.16em] uppercase text-white mb-2">
                    OUR PORTFOLIO
                  </h2>
                  <p className="text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-white font-bold">
                    Continuous Showcase • Hover to Pause &amp; Explore
                  </p>
                </div>

                {/* Continuous Seamless Infinite Moving Cycle (Right to Left - 100% Full Bleed, Zero Side Margins/Borders) */}
                <div className="relative w-full overflow-hidden py-4 px-0">
                  {/* Infinite Continuous Moving Marquee Track */}
                  <div className="flex w-max animate-portfolio-cycle hover:[animation-play-state:paused] gap-6 sm:gap-7 items-center select-none">
                    {/* Set 1: Pre-overflowing to left of screen */}
                    {homePortfolioCards.map((card, idx) => (
                      <div 
                        key={`set1-${card.id}-${idx}`} 
                        className="w-[270px] sm:w-[310px] md:w-[350px] shrink-0 transform-gpu"
                      >
                        <InteractivePortfolioCard
                          card={card}
                          onClick={() => setActiveLightboxImage({ title: `${card.line1} ${card.line2}`, category: card.category, img: card.img })}
                        />
                      </div>
                    ))}

                    {/* Set 2: Center Viewport */}
                    {homePortfolioCards.map((card, idx) => (
                      <div 
                        key={`set2-${card.id}-${idx}`} 
                        className="w-[270px] sm:w-[310px] md:w-[350px] shrink-0 transform-gpu"
                      >
                        <InteractivePortfolioCard
                          card={card}
                          onClick={() => setActiveLightboxImage({ title: `${card.line1} ${card.line2}`, category: card.category, img: card.img })}
                        />
                      </div>
                    ))}

                    {/* Set 3: Post-overflowing to right of screen */}
                    {homePortfolioCards.map((card, idx) => (
                      <div 
                        key={`set3-${card.id}-${idx}`} 
                        className="w-[270px] sm:w-[310px] md:w-[350px] shrink-0 transform-gpu"
                      >
                        <InteractivePortfolioCard
                          card={card}
                          onClick={() => setActiveLightboxImage({ title: `${card.line1} ${card.line2}`, category: card.category, img: card.img })}
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </>
        )}

        {/* 4. CONTACT VIEW */}
        {activeTab === 'contact' && (
          <section className="w-full py-12 sm:py-20 bg-[#050505] border-t border-white/10 text-white">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <span className="text-[12px] font-bold tracking-[0.2em] text-white uppercase block mb-3">
                    INQUIRIES &amp; BOOKINGS
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-light text-white uppercase tracking-tight mb-6">
                    LET'S CREATE PERFECTION.
                  </h2>
                  <p className="text-white text-[15px] leading-relaxed mb-8">
                    Currently accepting selective commercial campaigns, beauty editorials, and brand lookbooks. Rush 24-48h turnaround available upon request.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-sm text-white">
                      <div className="w-10 h-10 rounded-lg bg-[#141416] border border-white/20 flex items-center justify-center text-white">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-white font-bold uppercase tracking-widest block">Direct Email</span>
                        <a href="mailto:studio@dilipkumarretouching.com" className="hover:underline transition-colors font-semibold text-white">
                          studio@dilipkumarretouching.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-white">
                      <div className="w-10 h-10 rounded-lg bg-[#141416] border border-white/20 flex items-center justify-center text-white">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-white font-bold uppercase tracking-widest block">WhatsApp Instant</span>
                        <a href="https://wa.me/919824042931?text=Hello%20Dilip,%20I'm%20inquiring%20about%20a%20retouching%20project." target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors font-semibold text-white">
                          +91 98240 42931
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white">
                      <div className="w-10 h-10 rounded-lg bg-[#141416] border border-white/20 flex items-center justify-center text-white">
                        <Globe size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] text-white font-bold uppercase tracking-widest block">Location &amp; Delivery</span>
                        <span className="font-semibold text-white">London • New York • Mumbai • Worldwide FTP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-[#0c0c0e] p-8 sm:p-10 rounded-2xl border border-white/15 shadow-2xl shadow-black text-white">
                    {contactSuccess ? (
                      <div className="py-12 text-center space-y-4">
                        <CheckCircle2 size={48} className="text-white mx-auto" />
                        <h3 className="text-2xl font-light text-white uppercase">Inquiry Received</h3>
                        <p className="text-sm text-white max-w-md mx-auto">
                          Thank you for reaching out. We will review your project brief and respond with rate cards and availability within 4 business hours.
                        </p>
                        <button
                          onClick={() => setContactSuccess(false)}
                          className="mt-4 px-6 py-2.5 border-2 border-white bg-[#141416] hover:bg-[#222226] text-white text-xs font-bold tracking-widest uppercase transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setContactSuccess(true);
                        }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] uppercase tracking-widest text-white font-bold mb-2">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Alex Rivers"
                              className="w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors rounded-sm placeholder:text-stone-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-widest text-white font-bold mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="alex@agency.com"
                              className="w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors rounded-sm placeholder:text-stone-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] uppercase tracking-widest text-white font-bold mb-2">
                              Project Category
                            </label>
                            <select className="w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors rounded-sm">
                              <option className="bg-[#141416] text-white">Fashion Editorial</option>
                              <option className="bg-[#141416] text-white">Advertising Retouching</option>
                              <option className="bg-[#141416] text-white">Beauty &amp; Haircare</option>
                              <option className="bg-[#141416] text-white">Food &amp; Product Retouching</option>
                              <option className="bg-[#141416] text-white">Other / Custom Project</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-widest text-white font-bold mb-2">
                              Estimated Quantity
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 10 - 25 images"
                              className="w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors rounded-sm placeholder:text-stone-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-widest text-white font-bold mb-2">
                            Project Scope &amp; Deadline
                          </label>
                          <textarea
                            rows={4}
                            required
                            placeholder="Tell us about the shoot, turnaround deadlines, specific retouching notes..."
                            className="w-full bg-[#141416] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors rounded-sm placeholder:text-stone-400"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-8 py-3.5 bg-[#141416] hover:bg-[#222226] text-white border-2 border-white text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-black"
                        >
                          <span className="text-white">SUBMIT PROJECT BRIEF</span>
                          <Send size={14} className="text-white" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        </div>
      </main>

      {/* Footer (Hidden on Work section so there is no vertical scroll down) */}
      {activeTab !== 'work' && (
        <footer className="w-full bg-[#050505] border-t border-white/10 py-10 px-6 sm:px-10 lg:px-16 text-xs text-white">
          <div className="max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand Mark */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-bold text-white tracking-[0.2em] uppercase text-sm">DILIP KUMAR</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">RETOUCHING STUDIO</span>
            </div>

            {/* Social Media Links (Instagram, LinkedIn, Behance) */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <a
                href="https://www.instagram.com/theretoucherbook/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dilip Kumar on Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#141416] border border-white/20 hover:border-white flex items-center justify-center text-white hover:bg-[#222226] transition-all duration-300 hover:scale-110 shadow-sm shadow-black group"
              >
                <Instagram size={15} className="transition-transform group-hover:scale-110 text-white" />
              </a>
              <a
                href="https://in.linkedin.com/in/dilip-kumar-43a88221a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dilip Kumar on LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#141416] border border-white/20 hover:border-white flex items-center justify-center text-white hover:bg-[#222226] transition-all duration-300 hover:scale-110 shadow-sm shadow-black group"
              >
                <Linkedin size={15} className="transition-transform group-hover:scale-110 text-white" />
              </a>
              <a
                href="https://behance.net/dilipkumarretouching"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dilip Kumar on Behance"
                title="Behance"
                className="w-9 h-9 rounded-full bg-[#141416] border border-white/20 hover:border-white flex items-center justify-center text-white hover:bg-[#222226] transition-all duration-300 hover:scale-110 shadow-sm shadow-black group"
              >
                <BehanceIcon size={15} className="transition-transform group-hover:scale-110 text-white" />
              </a>
            </div>

            {/* Copyright & Locations */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center md:text-right">
              <p>© {new Date().getFullYear()} Dilip Kumar Retouching. All rights reserved.</p>
              <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase text-white font-semibold">
                <span>London</span>
                <span className="text-white/50 font-bold">•</span>
                <span>New York</span>
                <span className="text-white/50 font-bold">•</span>
                <span>Mumbai</span>
              </div>
            </div>

          </div>
        </footer>
      )}

      {/* Image Lightbox Modal */}
      {activeLightboxImage && (
        <div 
          data-lightbox-open="true"
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-[#0c0c0e] border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl text-white"
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#18181b] border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#25252b] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-[#050505]">
              <img 
                src={activeLightboxImage.img} 
                alt={activeLightboxImage.title}
                className="max-h-[75vh] w-auto object-contain smooth-image-reveal transition-all duration-500 animate-fadeIn"
                loading="eager"
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-[#0c0c0e] text-white">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold block">
                  {activeLightboxImage.category} {activeLightboxImage.year ? `• ${activeLightboxImage.year}` : ''}
                </span>
                <h4 className="text-base font-semibold text-white">
                  {activeLightboxImage.brand ? `${activeLightboxImage.brand} — ` : ''}{activeLightboxImage.title}
                </h4>
                {activeLightboxImage.scope && (
                  <p className="text-xs text-white/60 mt-0.5">Scope: {activeLightboxImage.scope}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setActiveLightboxImage(null);
                    setActiveTab('contact');
                  }}
                  className="px-5 py-2 bg-[#18181b] hover:bg-[#25252b] text-white border-2 border-white text-xs font-bold tracking-wider uppercase shadow-sm transition-colors cursor-pointer"
                >
                  Inquire on this project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button in Bottom Right */}
      <a
        href="https://wa.me/919824042931?text=Hello%20Dilip,%20I'm%20interested%20in%20your%20photo%20retouching%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct Chat on WhatsApp"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
        >
          <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12c0 1.83.498 3.545 1.365 5.02L2 22l5.127-1.344C8.57 21.492 10.254 22 12.031 22c5.516 0 10-4.484 10-10s-4.484-10-10-10zm5.836 14.18c-.244.688-1.22 1.264-1.69 1.332-.457.067-1.047.098-3.375-.867-2.977-1.236-4.9-4.246-5.048-4.444-.146-.197-1.2-1.6-1.2-3.053 0-1.453.76-2.168 1.03-2.463.272-.295.592-.37.79-.37.198 0 .396.002.57.01.185.01.432-.07.676.516.248.594.843 2.057.917 2.207.074.15.124.325.025.523-.1.198-.15.32-.297.493-.15.173-.314.387-.45.52-.15.148-.306.31-.132.608.174.298.775 1.28 1.662 2.072 1.142 1.018 2.105 1.334 2.404 1.482.298.148.472.124.646-.074.174-.198.743-.865.942-1.162.198-.297.396-.248.67-.148.272.1.1.742 2.057 1.236 2.057.148.05.297.1.446.15.148.05.272.247.37.495z" />
        </svg>
      </a>

    </div>
  );
}
