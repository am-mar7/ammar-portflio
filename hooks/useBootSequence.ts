// hooks/useBootSequence.ts
import { useEffect } from 'react';
import gsap from 'gsap';

export function useBootSequence(onComplete: () => void) {
  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl
      // Black screen → BIOS-style text flash
      .fromTo('#boot-screen', { opacity: 1 }, { opacity: 1, duration: 0.5 })
      .fromTo('#boot-logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('#boot-text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.2')
      // Progress bar fill
      .fromTo('#boot-progress-fill', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power1.inOut', transformOrigin: 'left' })
      // Fade out boot screen
      .to('#boot-screen', { opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.3')
      // Desktop icons cascade in
      .fromTo('.desktop-icon',
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.4)' }
      )
      .fromTo('#taskbar',
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '<0.1'
      );

    return () => { tl.kill(); };
  }, []);
}