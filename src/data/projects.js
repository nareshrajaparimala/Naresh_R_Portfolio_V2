export const projects = [
  {
    id: 1,
    title: "AI Image Upscaling & Restoration Platform",
    description:
      "Full-stack AI platform for image upscaling, restoration, and enhancement. Integrated automated workflows for processing high-resolution imagery with low latency. Built a robust user management and storage system using Supabase and Next.js.",
    tags: ["Next.js", "TypeScript", "Supabase", "AI/ML"],
    category: "AI",
    github: "https://github.com/nareshrajaparimala",
    live: "https://imageupscale.io",
    featured: true,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "IoT Sign Language Translator",
    description:
      "Hybrid translation system combining MediaPipe video tracking and IoT Flex sensors (Arduino/MPU) for real-time sign language conversion to text/speech. Engineered a 148-dimensional feature vector system for advanced hand-landmark analysis with CNN + LSTM deep learning architecture.",
    tags: ["Python", "FastAPI", "MediaPipe", "CNN", "LSTM", "Arduino"],
    category: "AI",
    github: "https://github.com/nareshrajaparimala",
    live: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Real-Time Smart Quiz Platform",
    description:
      "Production-grade quiz engine with automated PDF reporting and real-time analytics. Built with the MERN stack, deployed on GCP with live leaderboards and performance dashboards.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "GCP"],
    category: "Web",
    github: "https://github.com/nareshrajaparimala",
    live: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
];

export const projectCategories = ["All", "Web", "AI"];
