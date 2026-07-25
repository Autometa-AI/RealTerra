'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [];

    // ── Scroll reveal ──────────────────────────────────────────────
    (function initReveal() {
      const els = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('up');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
      );
      els.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    })();

    // ── Progress bar ───────────────────────────────────────────────
    (function initProgress() {
      const bar = document.getElementById('progress');
      if (!bar) return;
      const update = () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        bar.style.width = Math.min(pct * 100, 100) + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener('scroll', update));
    })();

    // ── Animated stat counters ─────────────────────────────────────
    (function initCounters() {
      const items = document.querySelectorAll('.stat-num[data-target]');
      if (!items.length) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const raw = el.dataset.target;
            const prefix = raw.match(/^[A-Za-z]+/)?.[0] || '';
            const suffix = raw.match(/[^0-9.]+$/)?.[0] || '';
            const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
            const decimals = num % 1 !== 0 ? 1 : 0;
            const duration = 1400;
            const start = performance.now();
            const animate = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              const val = (num * eased).toFixed(decimals);
              el.textContent =
                prefix + (decimals ? val : Math.floor(val).toLocaleString()) + suffix;
              if (p < 1) requestAnimationFrame(animate);
              else
                el.textContent =
                  prefix + (decimals ? num.toFixed(decimals) : num.toLocaleString()) + suffix;
            };
            requestAnimationFrame(animate);
            obs.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      items.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    })();

    // ── Nav scroll state ───────────────────────────────────────────
    (function initNavScroll() {
      const nav = document.querySelector('nav');
      if (!nav) return;
      const update = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener('scroll', update));
    })();

    // ── Scroll Parallax ────────────────────────────────────────────
    (function initScrollParallax() {
      if (window.matchMedia('(max-width: 900px)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const targets = [
        { sel: '.hero-right-parallax', speed: 0.22 },
        { sel: '.philosophy-right-wrap', speed: 0.18 },
        { sel: '.founder-strip-parallax', speed: 0.14 },
      ]
        .map((t) => ({ el: document.querySelector(t.sel), speed: t.speed }))
        .filter((t) => t.el);

      if (!targets.length) return;

      let rafId = null;

      const update = () => {
        const scrollY = window.scrollY;
        targets.forEach(({ el, speed }) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
          const elCenterY = scrollY + rect.top + rect.height / 2;
          const offset = (scrollY - elCenterY + window.innerHeight * 0.5) * speed;
          el.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
        });
        rafId = null;
      };

      const onScroll = () => {
        if (!rafId) rafId = requestAnimationFrame(update);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
      cleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        if (rafId) cancelAnimationFrame(rafId);
      });
    })();

    // ── Image hover parallax — subtle ─────────────────────────────
    (function initImgParallax() {
      document.querySelectorAll('.img-zoom').forEach((wrap) => {
        const img = wrap.querySelector('img');
        if (!img) return;
        const onMove = (e) => {
          const r = wrap.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
          const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
          img.style.transform = `scale(1.04) translate(${x}px, ${y}px)`;
        };
        const onLeave = () => {
          img.style.transform = '';
        };
        wrap.addEventListener('mousemove', onMove);
        wrap.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          wrap.removeEventListener('mousemove', onMove);
          wrap.removeEventListener('mouseleave', onLeave);
        });
      });
    })();

    // ── Button press feedback ──────────────────────────────────────
    (function initButtonFeedback() {
      document.querySelectorAll('.btn, .nav-cta').forEach((btn) => {
        const down = () => {
          btn.style.transform = 'scale(0.98)';
        };
        const reset = () => {
          btn.style.transform = '';
        };
        btn.addEventListener('mousedown', down);
        btn.addEventListener('mouseup', reset);
        btn.addEventListener('mouseleave', reset);
        cleanups.push(() => {
          btn.removeEventListener('mousedown', down);
          btn.removeEventListener('mouseup', reset);
          btn.removeEventListener('mouseleave', reset);
        });
      });
    })();

    // ── Section line counter stagger ───────────────────────────────
    (function initLineStagger() {
      const staggerGroups = document.querySelectorAll(
        '.market-metrics, .founder-capabilities, .pillars-mini, .macro-points, .contact-hero-details'
      );

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const rows = e.target.children;
            Array.from(rows).forEach((row, i) => {
              row.style.opacity = '0';
              row.style.transform = 'translateY(10px)';
              row.style.transition = `opacity 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms,
                                 transform 480ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`;
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  row.style.opacity = '1';
                  row.style.transform = 'none';
                })
              );
            });
            obs.unobserve(e.target);
          });
        },
        { threshold: 0.15 }
      );

      staggerGroups.forEach((g) => obs.observe(g));
      cleanups.push(() => obs.disconnect());
    })();

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
