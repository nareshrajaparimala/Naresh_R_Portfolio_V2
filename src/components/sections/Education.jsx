import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Trophy, Star } from 'lucide-react';

const education = [
  {
    degree: "B.E. Computer Science Engineering",
    institution: "MS Engineering College",
    duration: "2022 – 2026",
    grade: "8.82 CGPA",
    highlights: ["Data Structures & Algorithms", "OOP", "Machine Learning", "Database Management", "Web Technologies"],
  },
];

const certifications = [
  { name: "Full Stack Development", issuer: "Self-taught / Projects", year: "2024", icon: "⚛️", color: "#6366f1" },
  { name: "AI & ML Architectures", issuer: "Final Year Project", year: "2025", icon: "🤖", color: "#8b5cf6" },
  { name: "Supabase & PostgreSQL", issuer: "Gostudio.ai Internship", year: "2026", icon: "🗄️", color: "#3ecf8e" },
  { name: "FastAPI & Python", issuer: "IoT Sign Language Project", year: "2025", icon: "🐍", color: "#06b6d4" },
];

const achievements = [
  { title: "Amazon Datathon — Rank 1008", desc: "Worldwide online competition with 5 Lakh+ participants", icon: <Trophy size={22} /> },
  { title: "1st Place — College Bug Bounty", desc: "2nd Place — Algocode (50+ participants)", icon: <Award size={22} /> },
  { title: "Main Event Coordinator", desc: "Successfully managed and hosted 4+ major college events", icon: <Star size={22} /> },
];

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="section-label">Background</p>
          <h2 className="section-title">Education & <span className="gradient-text">Certifications</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <GraduationCap size={22} style={{ color: 'var(--primary)' }} /> Academic Background
            </h3>
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold" style={{ fontFamily: 'Space Grotesk', color: 'var(--text)' }}>{edu.degree}</h4>
                    <p className="gradient-text font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm" style={{ color: 'var(--text-muted)' }}>
                    <p>{edu.duration}</p>
                    <p className="font-bold" style={{ color: 'var(--primary)' }}>{edu.grade}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.highlights.map(h => <span key={h} className="tag-chip">{h}</span>)}
                </div>
              </motion.div>
            ))}

            {/* Achievements */}
            <h3 className="text-lg font-semibold mb-5 mt-8 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Trophy size={22} style={{ color: 'var(--primary)' }} /> Achievements
            </h3>
            <div className="flex flex-col gap-4">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-xl p-4 flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--primary)' }}>
                    {ach.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold" style={{ color: 'var(--text)' }}>{ach.title}</h5>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{ach.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Award size={22} style={{ color: 'var(--primary)' }} /> Certifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-3"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl">{cert.icon}</div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{cert.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{cert.issuer}</div>
                  <span className="tag-chip text-xs">{cert.year}</span>
                </motion.div>
              ))}
            </div>

            {/* GitHub Stats */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                <span>📊</span> GitHub Stats
              </h3>
              <div className="flex flex-col gap-3">
                <motion.img
                  src="https://github-readme-stats.vercel.app/api?username=nareshrajaparimala&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1a1a24&title_color=6366f1&icon_color=8b5cf6&text_color=94a3b8"
                  alt="GitHub Stats"
                  className="w-full rounded-xl"
                  onError={e => e.target.style.display='none'}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                />
                <motion.img
                  src="https://github-readme-streak-stats.herokuapp.com?user=nareshrajaparimala&theme=tokyonight&hide_border=true&background=1a1a24&ring=6366f1&fire=8b5cf6&currStreakLabel=818cf8"
                  alt="GitHub Streak"
                  className="w-full rounded-xl"
                  onError={e => e.target.style.display='none'}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
