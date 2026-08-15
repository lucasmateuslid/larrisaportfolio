'use client';

import React, { useEffect, useRef } from 'react';

export interface VoxelTopographyGridProps {
  tileSize?: number;
  maxHeight?: number;
  primaryColor?: string;
  wireColor?: string;
  speed?: number;
}

export function VoxelTopographyGrid({
  tileSize = 28,
  maxHeight = 70,
  primaryColor = '#6366f1',
  wireColor = 'rgba(129, 140, 248, 0.4)',
  speed = 0.015,
}: VoxelTopographyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const hexToRgb = (hex: string) => {
      const cleanHex = hex.replace('#', '');
      const bigint = parseInt(
        cleanHex.length === 3 ? cleanHex.split('').map((c) => c + c).join('') : cleanHex,
        16,
      );
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };

    const baseRgb = hexToRgb(primaryColor);
    const leftFaceColor = `rgba(${Math.floor(baseRgb.r * 0.45)}, ${Math.floor(baseRgb.g * 0.45)}, ${Math.floor(baseRgb.b * 0.45)}, 0.85)`;
    const rightFaceColor = `rgba(${Math.floor(baseRgb.r * 0.65)}, ${Math.floor(baseRgb.g * 0.65)}, ${Math.floor(baseRgb.b * 0.65)}, 0.85)`;
    const topColorLUT: string[] = new Array(101);

    for (let i = 0; i <= 100; i++) {
      const ratio = i / 100;
      const r = Math.floor(baseRgb.r * (0.55 + ratio * 0.45));
      const g = Math.floor(baseRgb.g * (0.55 + ratio * 0.45));
      const b = Math.floor(baseRgb.b * (0.55 + ratio * 0.45));
      topColorLUT[i] = `rgb(${r},${g},${b})`;
    }

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const updatePointerPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = clientX - rect.left;
      mouseRef.current.targetY = clientY - rect.top;
    };
    const handlePointerMove = (event: PointerEvent) => updatePointerPos(event.clientX, event.clientY);
    const handlePointerLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    const tileW = tileSize * 0.866025;
    const tileH = tileSize * 0.5;
    const maxRadiusSq = 220 * 220;
    const invMaxHeight = 1 / (maxHeight + 55);

    const draw = () => {
      time += speed;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.32;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.32;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = '#071711';
      ctx.fillRect(0, 0, width, height);

      const gridCols = Math.ceil(width / tileW) + 4;
      const gridRows = Math.ceil(height / tileH) + 8;
      const originX = width * 0.5;
      const originY = height / 3.2;
      const startR = -Math.floor(gridRows / 2);
      const endR = Math.ceil(gridRows / 2);
      const startC = -Math.floor(gridCols / 2);
      const endC = Math.ceil(gridCols / 2);

      for (let r = startR; r < endR; r++) {
        for (let c = startC; c < endC; c++) {
          const isoX = originX + (c - r) * tileW;
          const isoY = originY + (c + r) * tileH;
          const dx = isoX - mx;
          const dy = isoY - my;
          const distSq = dx * dx + dy * dy;
          const wave1 = Math.sin(time * 2 + c * 0.25 + r * 0.25);
          const wave2 = Math.cos(time * 1.5 + c * 0.15 - r * 0.3);
          let h = (wave1 + wave2 + 2) * 0.25 * maxHeight;

          if (distSq < maxRadiusSq) {
            const influence = 1 - Math.sqrt(distSq) / 220;
            h += influence * influence * 55;
          }

          const py = isoY - h;
          if (isoX + tileW < 0 || isoX - tileW > width || py + h + 15 < 0 || py - tileH > height) continue;

          const topP1Y = py - tileH;
          const topP2X = isoX + tileW;
          const topP3Y = py + tileH;
          const topP4X = isoX - tileW;
          const sideBottomShift = h + 15;

          ctx.beginPath();
          ctx.moveTo(topP4X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.lineTo(topP4X, py + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = leftFaceColor;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(isoX, topP3Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(topP2X, py + sideBottomShift);
          ctx.lineTo(isoX, topP3Y + sideBottomShift);
          ctx.closePath();
          ctx.fillStyle = rightFaceColor;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(isoX, topP1Y);
          ctx.lineTo(topP2X, py);
          ctx.lineTo(isoX, topP3Y);
          ctx.lineTo(topP4X, py);
          ctx.closePath();
          const rawLight = h * invMaxHeight;
          const lightRatio = rawLight > 1 ? 1 : rawLight < 0.1 ? 0.1 : rawLight;
          ctx.fillStyle = topColorLUT[(lightRatio * 100) | 0];
          ctx.fill();
          ctx.strokeStyle = wireColor;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tileSize, maxHeight, primaryColor, wireColor, speed]);

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-slate-950 p-4 sm:p-8">
      <div className="relative aspect-video w-full max-w-5xl rounded-2xl border border-slate-800/80 bg-slate-900/80 p-2 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] backdrop-blur-md">
        <div ref={containerRef} className="relative h-full w-full touch-none cursor-pointer overflow-hidden rounded-xl border border-slate-800/50 bg-slate-950">
          <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default VoxelTopographyGrid;
