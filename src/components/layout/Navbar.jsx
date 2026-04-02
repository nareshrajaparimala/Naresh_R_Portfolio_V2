import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', ...navLinks.map(l => l.href.slice(1))];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? '0.8rem 0' : '1.2rem 0',
          background: scrolled
            ? theme === 'dark' ? 'rgba(10,10,15,0.88)' : 'rgba(244,244,248,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          borderBottom: scrolled ? `1px solid var(--border)` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={e => { e.preventDefault(); handleNavClick('#hero'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none' }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'var(--gradient-1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
            }}>
              <Code2 size={17} color="white" />
            </div>
            <span className="gradient-text">Naresh</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Raja</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}
            className="hidden md:flex">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    id={`nav-${link.label.toLowerCase()}`}
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: 8,
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--primary-light)' : 'var(--text-muted)',
                      background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; } }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        style={{
                          position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                          width: 4, height: 4, borderRadius: '50%', background: 'var(--primary)',
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text-muted)', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden md:inline-flex"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Resume
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="md:hidden"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
              whileTap={{ scale: 0.9 }}
              style={{
                width: 38, height: 38, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text)', cursor: 'pointer',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: theme === 'dark' ? 'rgba(10,10,15,0.97)' : 'rgba(244,244,248,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              padding: '7rem 2rem 2rem',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '1rem 1.25rem',
                      borderRadius: 12,
                      fontSize: '1.25rem', fontWeight: 600,
                      background: activeSection === link.href.slice(1) ? 'rgba(99,102,241,0.12)' : 'transparent',
                      color: activeSection === link.href.slice(1) ? 'var(--primary-light)' : 'var(--text)',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <a href="/resume.pdf" className="btn-primary" target="_blank" rel="noreferrer"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
