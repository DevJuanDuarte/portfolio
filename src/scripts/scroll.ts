import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isCoarsePointer = () =>
  window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

function initLenis() {
  if (prefersReducedMotion() || isCoarsePointer()) return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function initHeroEntrance() {
  document.querySelectorAll<HTMLElement>("[data-hero-stagger]").forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>("[data-hero-item]");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 24 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.1,
    });
  });
}

function initScrollReveal() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((container) => {
    const items = container.querySelectorAll<HTMLElement>("[data-reveal-item]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 28 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        once: true,
      },
    });
  });

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (el.closest("[data-reveal-stagger]")) return;

    gsap.set(el, { opacity: 0, y: 24 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });
}

function initParallaxLayers() {
  if (prefersReducedMotion() || isCoarsePointer()) return;

  document.querySelectorAll<HTMLElement>("[data-parallax-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || "0.2");
    const isLocal = el.dataset.parallaxScope === "local";
    const trigger = isLocal ? (el.parentElement ?? el) : document.documentElement;

    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: isLocal ? "top bottom" : "top top",
        end: isLocal ? "bottom top" : "bottom bottom",
        scrub: true,
      },
    });
  });
}

function initMouseParallax() {
  if (prefersReducedMotion() || isCoarsePointer()) return;

  document.querySelectorAll<HTMLElement>("[data-mouse-parallax]").forEach((el) => {
    const strength = parseFloat(el.dataset.mouseParallaxStrength || "16");
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    window.addEventListener("mousemove", (event) => {
      const relX = event.clientX / window.innerWidth - 0.5;
      const relY = event.clientY / window.innerHeight - 0.5;
      xTo(relX * strength);
      yTo(relY * strength);
    });
  });
}

function initTimelineProgress() {
  if (prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>("[data-timeline-progress]").forEach((el) => {
      gsap.set(el, { scaleY: 1 });
    });
    return;
  }

  document.querySelectorAll<HTMLElement>("[data-timeline-progress]").forEach((el) => {
    gsap.set(el, { scaleY: 0 });
    gsap.to(el, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });
}

export function initScroll() {
  initLenis();
  initHeroEntrance();
  initScrollReveal();
  initParallaxLayers();
  initMouseParallax();
  initTimelineProgress();

  window.addEventListener("load", () => ScrollTrigger.refresh());
}
