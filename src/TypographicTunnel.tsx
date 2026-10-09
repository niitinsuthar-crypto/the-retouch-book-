import React, { useEffect, useRef } from 'react';

interface TypographicTunnelProps {
  className?: string;
  speed?: number;
}

export function TypographicTunnel({ className = '', speed = 32 }: TypographicTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Phrase without stars or sparkle icons - purely editorial and branded
    const phrase = 'DILIP KUMAR RETOUCHING • EDITORIAL POST-PRODUCTION • ';

    const resize = () => {
      if (!container || !canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let offset = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Slow, smooth, premium continuous motion around the cylinder
      offset += speed * dt;

      if (!ctx || width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Disable any glow or shadow effects completely
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      const fontFace = "'Anton', 'Montserrat', sans-serif";
      // Refined screen-fit base font size
      const baseFontSize = Math.max(44, Math.min(98, width * 0.062));

      // Measure character widths
      ctx.font = `900 ${baseFontSize}px ${fontFace}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // Letter spacing for effortless readability between characters
      const letterSpacing = Math.round(baseFontSize * 0.082);
      const charWidths: number[] = [];
      let totalPhraseWidth = 0;
      for (let i = 0; i < phrase.length; i++) {
        const isSpace = phrase[i] === ' ';
        const extraSpace = isSpace ? letterSpacing * 1.35 : letterSpacing;
        const w = ctx.measureText(phrase[i]).width + extraSpace;
        charWidths.push(w);
        totalPhraseWidth += w;
      }

      if (totalPhraseWidth <= 0) {
        ctx.restore();
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Vanishing point / camera center inside the cylinder
      const cx = width * 0.5;
      const cy = height * 0.5;

      // Angular span for the visible portion of the cylinder:
      // The whole cylinder line is much wider than the screen, viewer only sees the middle portion.
      const thetaMax = 1.35; // ~77 degrees each side

      // =========================================================================
      // SINGLE PRIMARY SLIDING TEXT: CONVEX OUTWARD (BAHAR KI TARAF) CYLINDER
      // In soft milky white with generous letter-spacing for premium readability
      // =========================================================================
      const tiers = [
        {
          id: 'foreground',
          depthScale: 1.0,
          color: '#F2F2F5', // Elegant solid milky white
          opacity: 1.0,
          yCenterOffset: -height * 0.06, // Settled slightly lower for balanced screen fit
          curveMagnitude: height * 0.25, // Convex downward curve toward sides
          speedFactor: 1.0,
        },
      ];

      for (const tier of tiers) {
        ctx.save();
        ctx.globalAlpha = tier.opacity;
        ctx.fillStyle = tier.color;

        const tierFontSize = baseFontSize * tier.depthScale;
        ctx.font = `900 ${tierFontSize}px ${fontFace}`;

        const tierTotalWidth = totalPhraseWidth * tier.depthScale;
        // Sliding smoothly outward across the front convex cylinder surface
        const currentTierOffset = (offset * tier.speedFactor) % tierTotalWidth;

        // Cover full cylinder arc including outside edges
        const numCopies = Math.ceil((width * 3.0) / tierTotalWidth) + 3;
        const startX = -(numCopies * tierTotalWidth * 0.5);

        for (let c = 0; c < numCopies; c++) {
          // Slide smoothly outward (left-to-right sweep across the front face)
          let charCursorX = startX + c * tierTotalWidth + currentTierOffset;

          for (let i = 0; i < phrase.length; i++) {
            const char = phrase[i];
            const charW = charWidths[i] * tier.depthScale;
            const charCenterX = charCursorX + charW * 0.5;
            charCursorX += charW;

            // Map linear X to angular position theta on the cylinder surface
            // The center of the screen is theta = 0 (closest point to viewer)
            const u = (charCenterX - cx) / (width * 0.5);
            const theta = u * (thetaMax * 0.85);

            // Skip characters outside the cylinder wrap
            if (Math.abs(theta) > thetaMax * 1.25) continue;

            const absTheta = Math.abs(theta);
            const signTheta = theta >= 0 ? 1 : -1;

            // -------------------------------------------------------------------
            // CONVEX 3D CYLINDRICAL PROJECTION (BAHAR KI TARAF / OUTWARD BULGE):
            // Center of screen = surface is closest to camera (bulging outward),
            // largest font size, horizontally prominent and readable.
            // Moving towards left and right = surface curves away into the
            // background, wrapping around the curved sides of the cylinder.
            // -------------------------------------------------------------------

            const cosT = Math.cos(Math.min(absTheta, Math.PI * 0.48));

            // Z distance: increases as the surface curves away into the background
            // At center (theta=0), zFactor is 1.0 (closest to viewer).
            // At sides, zFactor increases (further away into depth).
            const zFactor = 1.0 + 0.65 * (1.0 - cosT);

            // Perspective scale: maximum at center (1.0), receding at edges (~0.62)
            const pScale = 1.0 / zFactor;

            // Screen X: projected around cylinder drum
            const projX = cx + (width * 0.5) * Math.sin(theta) * 0.94;

            // Convex arch baseline:
            // Crowns in center (closest to viewer), curves down and away at edges
            const curveFactor = Math.pow(absTheta / thetaMax, 1.85);
            const projY = cy + tier.yCenterOffset + (tier.curveMagnitude * curveFactor);

            // Tangent angle along the convex arch
            const dY = tier.curveMagnitude * 1.85 * Math.pow(absTheta / thetaMax, 0.85) * (signTheta / thetaMax);
            const dX = width * 0.5;
            const tangentAngle = Math.atan2(dY, dX);

            // Scale and Foreshortening:
            // Center: bold, horizontally prominent (scaleX ~ 1.35x, scaleY ~ 1.15x)
            // Screen-fit balanced scale and foreshortening
            const scaleX = pScale * 1.34 * Math.max(0.24, cosT);
            const scaleY = pScale * 1.16;

            // Smooth fade at the extreme boundaries beyond viewport
            const edgeFade = Math.max(0, Math.min(1, 1 - (absTheta - thetaMax * 0.85) / (thetaMax * 0.35)));
            if (edgeFade <= 0.02) continue;

            ctx.save();
            ctx.translate(projX, projY);
            ctx.rotate(tangentAngle);
            ctx.scale(Math.max(0.1, scaleX), scaleY);
            ctx.globalAlpha = tier.opacity * edgeFade;

            ctx.fillText(char, 0, 0);
            ctx.restore();
          }
        }

        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* 3D Cylindrical Typographic Tunnel Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
