import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personal } from '../../data/personal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    // Simulate sending (replace with EmailJS in production)
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
    setSending(false);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's <span className="gradient-text">Work Together</span></h2>
          <p className="section-subtitle mx-auto text-center">
            Have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: <Mail size={20} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
              { icon: <Phone size={20} />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
              { icon: <MapPin size={20} />, label: 'Location', value: personal.location, href: '#' },
            ].map(item => (
              <a key={item.label} href={item.href}
                className="glass-card rounded-2xl p-5 flex items-start gap-4 group no-underline"
                style={{ textDecoration: 'none' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: 'rgba(99,102,241,0.12)', color: 'var(--primary)' }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                  <div className="font-medium" style={{ color: 'var(--text)' }}>{item.value}</div>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>Find me on</p>
              <div className="flex gap-3">
                {[
                  { href: personal.github, icon: <FaGithub size={20} />, label: 'GitHub' },
                  { href: personal.linkedin, icon: <FaLinkedin size={20} />, label: 'LinkedIn' },
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    whileHover={{ scale: 1.1, borderColor: '#6366f1', color: '#818cf8' }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="glass-card rounded-3xl p-7">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <CheckCircle size={60} style={{ color: '#22c55e' }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Your Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: 'rgba(99,102,241,0.05)',
                          border: `1px solid ${errors.name ? '#ef4444' : 'var(--border)'}`,
                          color: 'var(--text)',
                        }}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border)'}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/, message: 'Invalid email' }
                        })}
                        placeholder="john@example.com"
                        type="email"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: 'rgba(99,102,241,0.05)',
                          border: `1px solid ${errors.email ? '#ef4444' : 'var(--border)'}`,
                          color: 'var(--text)',
                        }}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border)'}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(99,102,241,0.05)',
                        border: `1px solid ${errors.subject ? '#ef4444' : 'var(--border)'}`,
                        color: 'var(--text)',
                      }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = errors.subject ? '#ef4444' : 'var(--border)'}
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{
                        background: 'rgba(99,102,241,0.05)',
                        border: `1px solid ${errors.message ? '#ef4444' : 'var(--border)'}`,
                        color: 'var(--text)',
                      }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border)'}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="btn-primary justify-center"
                    whileHover={!sending ? { scale: 1.02 } : {}}
                    whileTap={!sending ? { scale: 0.98 } : {}}
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
