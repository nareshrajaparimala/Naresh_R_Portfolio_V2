import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    avatar: "SJ",
    color: "#6366f1",
    quote: "Naresh delivered an exceptional dashboard product. His attention to detail, communication, and technical skills are top-notch. The performance improvements alone saved us thousands in infrastructure costs.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "CTO at StartupXYZ",
    avatar: "AM",
    color: "#8b5cf6",
    quote: "Working with Naresh was a game-changer. He didn't just write code — he thought about the product holistically and brought ideas we hadn't even considered. Highly recommend!",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Founder at DesignStudio",
    avatar: "LP",
    color: "#06b6d4",
    quote: "Naresh transformed our Figma designs into a pixel-perfect, animated website that our clients absolutely love. Fast, professional, and extremely talented.",
    rating: 5,
  },
  {
    name: "Ravi Kumar",
    role: "Lead Developer at InnovateTech",
    avatar: "RK",
    color: "#f59e0b",
    quote: "The AI integration Naresh built for our platform cut our manual processing by 80%. His deep knowledge of both frontend and backend systems is impressive.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">What People Say</p>
          <h2 className="section-title">Client <span className="gradient-text">Testimonials</span></h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="glass-card rounded-3xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <Quote size={40} className="mx-auto mb-6 opacity-30" style={{ color: 'var(--primary)' }} />

              <p className="text-lg leading-relaxed mb-8 italic" style={{ color: 'var(--text-muted)' }}>
                "{testimonials[current].quote}"
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ background: testimonials[current].color }}>
                  {testimonials[current].avatar}
                </div>
                <div className="font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>
                  {testimonials[current].name}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {testimonials[current].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:border-indigo-500 hover:text-indigo-400"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i === current ? 'var(--primary)' : 'var(--border)', width: i === current ? '24px' : '8px' }}
                />
              ))}
            </div>
            <button onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:border-indigo-500 hover:text-indigo-400"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
