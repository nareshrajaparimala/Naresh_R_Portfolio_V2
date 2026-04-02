import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { experience } from '../../data/experience';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">Career Journey</p>
          <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="timeline-line"
            style={{ left: 31 }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                className="flex gap-6"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative">
                  <div className="w-[42px] h-[42px] rounded-full border-2 flex items-center justify-center z-10 relative"
                    style={{
                      borderColor: 'var(--primary)',
                      background: 'var(--bg)',
                      boxShadow: 'var(--glow)',
                    }}>
                    <Briefcase size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-6 flex-1 mb-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
                        {job.role}
                      </h3>
                      <p className="font-medium gradient-text">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Calendar size={12} /> {job.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <MapPin size={12} /> {job.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{job.description}</p>

                  <ul className="flex flex-col gap-2 mb-4">
                    {job.achievements.map((ach, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                        {ach}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map(t => <span key={t} className="tag-chip">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
