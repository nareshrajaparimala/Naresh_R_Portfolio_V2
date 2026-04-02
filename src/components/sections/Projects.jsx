import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects, projectCategories } from '../../data/projects';


function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="rounded-3xl max-w-2xl w-full overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card), transparent)' }} />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)' }}>
              {project.title}
            </h3>
            <span className="tag-chip">{project.category}</span>
          </div>
          <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => <span key={tag} className="tag-chip">{tag}</span>)}
          </div>
          <div className="flex gap-3">
            {project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline flex-1 justify-center text-sm py-2">
                <FaGithub size={16} /> GitHub
              </a>
            )}
            {project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary flex-1 justify-center text-sm py-2">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle mx-auto text-center">
            A curated selection of projects I've built — from AI platforms to production web apps.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
              style={filter === cat
                ? { background: 'var(--gradient-1)', color: 'white' }
                : { background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured project */}
        {filter === 'All' && projects.find(p => p.featured) && (
          <motion.div
            className="glass-card rounded-3xl overflow-hidden mb-8 cursor-pointer group"
            onClick={() => setSelected(projects[0])}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative overflow-hidden h-64 md:h-auto">
                <img src={projects[0].image} alt={projects[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(15,15,19,0.3))' }} />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: 'var(--gradient-1)' }}>
                    ⭐ Featured
                  </span>
                  <span className="tag-chip">{projects[0].category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)' }}>
                  {projects[0].title}
                </h3>
                <p className="mb-5" style={{ color: 'var(--text-muted)' }}>{projects[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].tags.map(tag => <span key={tag} className="tag-chip">{tag}</span>)}
                </div>
                <div className="flex gap-3">
                  <a href={projects[0].github} target="_blank" rel="noreferrer" className="btn-outline text-sm py-2" onClick={e => e.stopPropagation()}>
                    <FaGithub size={15} /> Code
                  </a>
                  <a href={projects[0].live} target="_blank" rel="noreferrer" className="btn-primary text-sm py-2" onClick={e => e.stopPropagation()}>
                    <ExternalLink size={15} /> Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.filter(p => filter !== 'All' || !p.featured || filtered.indexOf(p) !== 0).map((project, i) => (
            <motion.div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden h-44">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,15,19,0.8), transparent)' }} />
                <span className="absolute top-3 right-3 tag-chip text-xs" style={{ background: 'rgba(15,15,19,0.8)', backdropFilter: 'blur(10px)' }}>
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)' }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map(tag => <span key={tag} className="tag-chip text-xs">{tag}</span>)}
                </div>
                <div className="flex gap-2">
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:bg-indigo-500/10"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      <FaGithub size={16} />
                    </a>
                  )}
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all hover:bg-indigo-500/10"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
