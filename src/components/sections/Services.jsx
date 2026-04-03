import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Cpu, Rocket, Palette, Cloud, Database } from 'lucide-react';
import { personal } from '../../data/personal';

const iconMap = { Code2, Server, Cpu, Rocket, Palette, Cloud, Database };

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const process = [
    { step: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and technical requirements.' },
    { step: '02', title: 'Design', desc: 'Wireframing, prototyping, and crafting the perfect user experience.' },
    { step: '03', title: 'Build', desc: 'Writing clean, scalable code with performance as a top priority.' },
    { step: '04', title: 'Deploy', desc: 'Launching to production with CI/CD, monitoring, and zero downtime.' },
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">What I Offer</p>
          <h2 className="section-title">Services I <span className="gradient-text">Provide</span></h2>
          <p className="section-subtitle mx-auto text-center">
            From concept to deployment — I bring full-stack expertise to every project.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {personal.services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                className="glass-card rounded-2xl p-6 group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--primary)' }}>
                  {Icon && <Icon size={24} />}
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Process steps */}
        <div>
          <h3 className="text-xl font-bold text-center mb-10" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
            My <span className="gradient-text">Process</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px z-0"
                    style={{ background: 'linear-gradient(to right, var(--primary), transparent)', width: '100%' }} />
                )}
                <div className="glass-card rounded-2xl p-5 relative z-10">
                  <div className="text-4xl font-black mb-3 opacity-20 gradient-text" style={{ fontFamily: 'Space Grotesk' }}>
                    {step.step}
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{step.title}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
