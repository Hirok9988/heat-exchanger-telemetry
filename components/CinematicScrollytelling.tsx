"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 240;

const getFrameUrl = (index: number) => {
  const paddedIndex = index.toString().padStart(5, "0");
  return `/Animation/${paddedIndex}.jpg`;
};

export default function CinematicScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const lastDrawnRef = useRef(-1);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImagesLoading(false);
          drawFrame(1);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  const drawFrame = (frameIndex: number) => {
    if (lastDrawnRef.current === frameIndex) return;
    lastDrawnRef.current = frameIndex;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const clientW = rect.width;
    const clientH = rect.height;

    // Apply DPR for sharp rendering
    canvas.width = clientW * dpr;
    canvas.height = clientH * dpr;
    ctx.scale(dpr, dpr);

    // Match background exactly
    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, clientW, clientH);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // CROP BLACK SIDE BARS FROM SOURCE FRAMES
    // Remove ~12% from each side — isolates the heat exchanger center region
    const cropRatio = 0.12;
    const srcX = img.naturalWidth * cropRatio;
    const srcW = img.naturalWidth * (1 - cropRatio * 2);
    const srcY = 0;
    const srcH = img.naturalHeight;

    // Scale cropped region to fill canvas proportionally (cover)
    const scaleX = clientW / srcW;
    const scaleY = clientH / srcH;
    const scale = Math.max(scaleX, scaleY);

    const destW = srcW * scale;
    const destH = srcH * scale;
    const destX = (clientW - destW) / 2;
    const destY = (clientH - destH) / 2;

    ctx.drawImage(
      img,
      srcX, srcY, srcW, srcH,   // source crop region
      destX, destY, destW, destH // destination (centered, proportional)
    );
  };

  useEffect(() => {
    const handleScrollUpdate = (latestProgress: number) => {
      if (imagesLoading) return;
      const targetFrame = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.floor(latestProgress * FRAME_COUNT) + 1)
      );
      if (currentFrameRef.current !== targetFrame) {
        currentFrameRef.current = targetFrame;
        requestAnimationFrame(() => drawFrame(targetFrame));
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollUpdate);

    const handleResize = () => {
      lastDrawnRef.current = -1; // Force redraw on resize
      requestAnimationFrame(() => drawFrame(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress, imagesLoading]);

  // Framer Motion scroll-mapped text
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  const text2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.38, 0.45], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.15, 0.25, 0.45], [40, 0, -40]);

  const text3Opacity = useTransform(scrollYProgress, [0.45, 0.58, 0.72, 0.8], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.45, 0.58, 0.8], [40, 0, -40]);

  const text4Opacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const text4Y = useTransform(scrollYProgress, [0.8, 0.9], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#0A0A0C]" style={{ position: "relative" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden relative">

        {/* ─── Centered canvas container, max 1100px ─── */}
        <div
          className="relative w-full"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Aspect ratio box 16:9 */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>

            {/* Canvas — fills the 16:9 box */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full block"
              style={{ background: "#0A0A0C" }}
            />

            {/* ─── Cinematic edge blend: hides residual crop artifacts ─── */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to right, #0A0A0C 0%, transparent 15%, transparent 85%, #0A0A0C 100%)",
              }}
            />

            {/* ─── Radial depth vignette ─── */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 60%, rgba(10,10,12,0.65) 100%)",
              }}
            />

            {/* Subtle amber glow center */}
            <div className="absolute inset-0 pointer-events-none z-[5] flex items-center justify-center">
              <div className="w-[55%] h-[55%] bg-amber-600/5 rounded-full blur-[100px]" />
            </div>

            {/* Top / bottom fades to page bg */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0A0A0C] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A0A0C] to-transparent pointer-events-none z-10" />

          </div>
        </div>

        {/* ─── LOADING SCREEN ─── */}
        {imagesLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C]">
            <p className="font-display text-xs tracking-[0.25em] uppercase text-zinc-500 mb-5">
              Initializing Engine
            </p>
            <div className="w-48 h-px bg-zinc-800 overflow-hidden rounded">
              <div
                className="h-full bg-amber-500 transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-4 font-mono text-xs text-zinc-600">{loadingProgress}%</p>
          </div>
        )}

        {/* ─── TEXT: 0% ─── */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-center px-6"
        >
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-[0.2em] uppercase border border-zinc-700/50 rounded-full text-zinc-400 bg-zinc-900/40 backdrop-blur-sm">
            Product Visualization
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white mb-5 leading-none drop-shadow-xl">
            Heat Exchanger System
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 font-light tracking-wide max-w-lg">
            Thermal intelligence in motion
          </p>
        </motion.div>

        {/* ─── TEXT: 25% Left ─── */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex flex-col justify-center pointer-events-none z-30 px-10 md:px-20 lg:px-32 text-left"
        >
          <h2 className="font-display text-4xl md:text-6xl font-medium uppercase tracking-tight text-white mb-5 leading-tight drop-shadow-lg">
            Real-Time<br />Monitoring
          </h2>
          <p className="text-base md:text-xl text-zinc-400 font-light max-w-xs border-l-2 border-amber-500/60 pl-4 py-0.5">
            Precision data from every channel
          </p>
        </motion.div>

        {/* ─── TEXT: 60% Right ─── */}
        <motion.div
          style={{ opacity: text3Opacity, y: text3Y }}
          className="absolute inset-0 flex flex-col justify-center items-end pointer-events-none z-30 px-10 md:px-20 lg:px-32 text-right"
        >
          <h2 className="font-display text-4xl md:text-6xl font-medium uppercase tracking-tight text-white mb-5 leading-tight drop-shadow-lg">
            Internal<br />Flow Dynamics
          </h2>
          <p className="text-base md:text-xl text-zinc-400 font-light max-w-xs border-r-2 border-amber-500/60 pr-4 py-0.5">
            Visualizing heat transfer behavior
          </p>
        </motion.div>

        {/* ─── TEXT: 90% Center ─── */}
        <motion.div
          style={{ opacity: text4Opacity, y: text4Y }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-center px-6"
        >
          <div className="w-12 h-px bg-amber-500 mb-8" />
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-5 leading-none drop-shadow-lg">
            System Ready
          </h2>
          <p className="text-lg md:text-2xl text-zinc-400 font-light tracking-wide">
            Engineered for performance
          </p>
          <div className="w-12 h-px bg-amber-500 mt-8" />
        </motion.div>

      </div>
    </div>
  );
}
