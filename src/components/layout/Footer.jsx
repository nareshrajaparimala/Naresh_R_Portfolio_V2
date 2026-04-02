import React from 'react';
import { Heart, Code2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personal } from '../../data/personal';


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-1)' }}>
              <Code2 size={14} color="white" />
            </div>
            <span className="gradient-text">{personal.name}</span>
          </a>

          {/* Copyright */}
          <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            © {year} Made with <Heart size={14} style={{ color: '#ef4444', fill: '#ef4444' }} /> by {personal.name}
          </p>

          {/* Social links */}
          <div className="flex gap-3">
            {[
              { href: personal.github, icon: <FaGithub size={18} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <FaTwitter size={18} />, label: 'Twitter' },
              { href: `mailto:${personal.email}`, icon: <Mail size={18} />, label: 'Email' },
            ].map(s => (

              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-indigo-500 hover:text-indigo-400"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
