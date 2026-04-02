import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal } from '../../data/personal';

// Simple animated counter component (no external dependency)
function AnimatedCounter({ end, suffix = '', duration = 2500 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Illustration */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="aspect-square w-full flex items-center justify-center p-12"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' }}>
                <span style={{ fontSize: '8rem' }}>👨‍💻</span>
              </div>
              {/* Code snippet overlay */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4 font-mono text-xs"
                style={{ background: 'rgba(15,15,19,0.9)', color: '#6366f1', border: '1px solid var(--border)' }}>
                <p><span style={{ color: '#8b5cf6' }}>const</span> <span style={{ color: '#06b6d4' }}>naresh</span> = {'{'}</p>
                <p>&nbsp;&nbsp;<span style={{ color: '#65a30d' }}>passion</span>: <span style={{ color: '#f59e0b' }}>"coding"</span>,</p>
                <p>&nbsp;&nbsp;<span style={{ color: '#65a30d' }}>focus</span>: <span style={{ color: '#f59e0b' }}>"problem-solving"</span>,</p>
                <p>&nbsp;&nbsp;<span style={{ color: '#65a30d' }}>coffee</span>: <span style={{ color: '#f59e0b' }}>Infinity</span></p>
                <p>{'}'}</p>
              </div>
            </div>

            {/* Decorative dots grid */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, #6366f1 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }} />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              Passionate Developer<br />
              <span className="gradient-text">& Problem Solver</span>
            </h2>
            <p className="section-subtitle" style={{ fontSize: '1rem' }}>{personal.bio}</p>

            {/* Fun facts */}
            <div className="mt-6 flex flex-col gap-3">
              {[
                { emoji: '🌍', label: 'Location', value: personal.location },
                { emoji: '📧', label: 'Email', value: personal.email },
                { emoji: '🎯', label: 'Currently', value: 'Building cool things at GoStudio' },
                { emoji: '🎮', label: 'Hobbies', value: 'Open Source, Gaming, Photography' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{item.label}: </span>
                    <span className="text-sm" style={{ color: 'var(--text)' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-card rounded-2xl p-5 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
