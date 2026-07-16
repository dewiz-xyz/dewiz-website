"use client";

import { useEffect, useRef } from "react";
import {
  advanceFloorOffset,
  decayFloorScrollVelocity,
  getFloorScrollVelocity,
} from "./perspective-floor-motion";
import { createPerspectiveFloorRenderer } from "./perspective-floor-webgl";
import c from "../styles/site.module.css";

export default function PerspectiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createPerspectiveFloorRenderer(canvas);
    if (!renderer) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame: number | undefined;
    let lastFrameTime: number | undefined;
    let lastScrollY = window.scrollY;
    let floorOffset = 0;
    let scrollVelocity = 0;

    const renderCurrentFrame = () => {
      renderer.resize();
      renderer.render(floorOffset);
      canvas.dataset.ready = "true";
    };

    const renderFrame = (now: number) => {
      animationFrame = undefined;
      const elapsedMs = lastFrameTime === undefined ? 0 : now - lastFrameTime;
      lastFrameTime = now;
      scrollVelocity = decayFloorScrollVelocity(scrollVelocity, elapsedMs);
      floorOffset = advanceFloorOffset(floorOffset, elapsedMs, scrollVelocity);
      renderer.render(floorOffset);
      animationFrame = requestAnimationFrame(renderFrame);
    };

    const stopAnimation = () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
      lastFrameTime = undefined;
    };

    const startAnimation = () => {
      if (
        animationFrame !== undefined ||
        motionPreference.matches ||
        document.visibilityState === "hidden"
      ) {
        return;
      }
      animationFrame = requestAnimationFrame(renderFrame);
    };

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const deltaY = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (motionPreference.matches || deltaY === 0) return;
      scrollVelocity = getFloorScrollVelocity(deltaY);
    };

    const handleMotionPreference = () => {
      if (motionPreference.matches) {
        stopAnimation();
        scrollVelocity = 0;
        renderCurrentFrame();
      } else {
        startAnimation();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") stopAnimation();
      else startAnimation();
    };

    const resizeObserver = new ResizeObserver(renderCurrentFrame);
    resizeObserver.observe(canvas);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreference);
    renderCurrentFrame();
    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionPreference);
      renderer.dispose();
      delete canvas.dataset.ready;
    };
  }, []);

  return (
    <div className={c.perspectiveBackground} aria-hidden="true">
      <div className={c.backgroundWall} />
      <div className={c.backgroundFloorViewport}>
        <canvas ref={canvasRef} className={c.backgroundFloorCanvas} />
        <div className={c.backgroundFloorFallback}>
          <div className={c.backgroundFloorGrid} />
        </div>
      </div>
    </div>
  );
}
