import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personal } from '../../data/personal';

const socialLinks = [
  { href: personal.github, icon: <FaGithub size={19} />, label: 'GitHub' },
  { href: personal.linkedin, icon: <FaLinkedin size={19} />, label: 'LinkedIn' },
  { href: personal.twitter, icon: <FaTwitter size={19} />, label: 'Twitter' },
  { href: `mailto:${personal.email}`, icon: <Mail size={19} />, label: 'Email' },
];

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '5rem', position: 'relative' }}>
      <div className="container" style={{ width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* ═══ Left: Text ═══ */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                border: '1px solid var(--border)',
                background: 'rgba(99,102,241,0.07)',
                color: 'var(--primary-light)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Available for new projects
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: '1rem',
              }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">{personal.name.split(' ')[0]}</span>
              {' '}{personal.name.split(' ')[1]}
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '1.25rem', color: 'var(--text-muted)' }}
            >
              I build as a{' '}
              <span className="gradient-text-2" style={{ fontWeight: 700 }}>
                <TypeAnimation
                  sequence={personal.roles.flatMap(r => [r, 2000])}
                  wrapper="span"
                  repeat={Infinity}
                  speed={55}
                  cursor={true}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1rem' }}
            >
              {personal.bio.split('.').slice(0, 2).join('.')}. 
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}
            >
              <motion.button
                className="btn-primary"
                onClick={scrollToProjects}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work <ArrowRight size={16} />
              </motion.button>
              <motion.a
                href="/resume.pdf"
                className="btn-outline"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} /> Resume
              </motion.a>
            </motion.div>

            {/* Social Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.25rem' }}>Find me on</span>
              {socialLinks.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  id={`social-${s.label.toLowerCase()}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary-light)';
                    e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ═══ Right: Avatar ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            {/* Pulsing ring */}
            <div style={{
              position: 'absolute', inset: -20,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              animation: 'pulse-ring 3s ease-out infinite',
            }} />
            
            {/* Spinning gradient border */}
            <div style={{
              position: 'relative',
              width: 'clamp(250px, 30vw, 380px)',
              height: 'clamp(250px, 30vw, 380px)',
            }}>
              {/* Spinning outer ring */}
              <div style={{
                position: 'absolute', inset: -4,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
                animation: '8s spin-slow linear infinite',
              }} />
              
              {/* Inner photo / avatar */}
              <div style={{
                position: 'relative',
                width: '100%', height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid var(--bg)',
                background: 'linear-gradient(135deg, #1e1e2e, #16161f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                }}>
                  👨‍💻
                </div>
              </div>
            </div>

            {/* Floating badge: Role */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '5%', right: 0,
                padding: '0.5rem 1rem',
                borderRadius: 12,
                background: 'var(--gradient-1)',
                color: 'white',
                fontSize: '0.8rem', fontWeight: 700,
                boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
                backdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap',
              }}
            >
              ⚡ Product Engineer
            </motion.div>

            {/* Floating badge: Experience */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '8%', left: 0,
                padding: '0.5rem 1rem',
                borderRadius: 12,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontSize: '0.8rem', fontWeight: 700,
                boxShadow: 'var(--shadow-card)',
                whiteSpace: 'nowrap',
              }}
            >
              🎓 Final Year CSE
            </motion.div>

            {/* Floating badge: Open to work */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', bottom: '30%', right: '-5%',
                padding: '0.4rem 0.8rem',
                borderRadius: 8,
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22c55e',
                fontSize: '0.75rem', fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              ✓ Open to Work
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'var(--text-muted)', cursor: 'pointer',
          }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: 24, height: 40, borderRadius: 12,
            border: '1.5px solid var(--border)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 6,
          }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 4, height: 8, borderRadius: 4, background: 'var(--primary)' }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes pulse-ring { 0%{transform:scale(0.95);opacity:0.5} 100%{transform:scale(1.3);opacity:0} }
      `}</style>
    </section>
  );
}
