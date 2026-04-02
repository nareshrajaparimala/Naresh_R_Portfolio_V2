import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../../data/skills';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const current = skills.find(s => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Skills & <span className="gradient-text">Technologies</span></h2>
          <p className="section-subtitle mx-auto text-center">
            Technologies I've worked with and am comfortable using in production environments.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {skills.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.category
                  ? 'text-white shadow-lg'
                  : 'hover:bg-white/5'
              }`}
              style={activeCategory === cat.category
                ? { background: 'var(--gradient-1)', boxShadow: 'var(--glow)' }
                : { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {current?.items.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.08 }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 object-contain"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <span className="text-sm font-medium text-center" style={{ color: 'var(--text)' }}>
                {skill.name}
              </span>
              {/* Proficiency bar */}
              <div className="w-full skill-bar">
                <motion.div
                  className="skill-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "Frontend Expert", desc: "React, TypeScript, Tailwind", emoji: "⚛️" },
            { label: "Backend Developer", desc: "Node.js, PostgreSQL, Redis", emoji: "🛠️" },
            { label: "AI Integrator", desc: "OpenAI, Fal AI, LangChain", emoji: "🤖" },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.label}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
