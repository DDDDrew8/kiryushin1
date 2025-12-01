import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: 'Electricity Management System',
      description: 'A user-friendly web app to calculate and analyze household electricity usage.',
      tags: ['Web', 'IoT', 'AI'],
      fullDescription: 'A user-friendly web app to calculate and analyze household electricity usage. The app includes: User login/registration system, Appliance-based electricity usage calculator, Insight dashboard showing analytics from user data.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python (Flask)', 'SQLite', 'Chart.js', 'Custom Python API for “Eli Chatbot”'],
      githubLink: 'https://github.com/Naveenp7/Eli',
      liveLink: '#',
      image: '/eli.jpg',
    },
    {
      id: 2,
      title: 'GymTrack Pro – QR Attendance System',
      description: 'A gym member management and attendance system featuring QR code-based daily check-ins.',
      tags: ['Mobile', 'QR', 'Management'],
      fullDescription: 'A gym member management and attendance system featuring: QR code-based daily check-ins using mobile camera, Member & admin dashboards, Membership and payment tracking, Attendance reports & plan expiry notifications.',
      technologies: ['HTML', 'CSS', 'JavaScript (React planned)', 'Python (Flask)', 'SQLite', 'qrcode Python module', 'OpenCV (planned)', 'Email alerts'],
      githubLink: 'https://github.com/Naveenp7/Gym-Management',
      liveLink: 'https://gym-management-wheat.vercel.app/',
      image: '/gym.jpg',
    },
    {
      id: 3,
      title: 'Hand Cricket Game Using Camera',
      description: 'An interactive camera-based hand cricket game that detects hand gestures.',
      tags: ['AI', 'Game', 'Computer Vision'],
      fullDescription: 'An interactive camera-based hand cricket game that detects hand gestures (fist or number) from both players using live camera input, calculates runs, and determines outcomes in real-time. Features: Two-player hand gesture input using device cameras, Real-time run detection logic, Game flow management: toss, innings, scoring.',
      technologies: ['OpenCV', 'MediaPipe Hands', 'Python', 'Streamlit (or HTML/JS frontend planned)'],
      githubLink: 'https://github.com/Naveenp7/Hand-Cricket-Game-with-OpenCV',
      liveLink: '#',
      image: '/hand.jpg',
    },
    {
      id: 4,
      title: 'Money Tracker (PWA in progress)',
      description: 'A progressive web app (PWA) to manage and analyze financial data for Panekkatt Mill.',
      tags: ['PWA', 'Finance', 'AI'],
      fullDescription: 'A progressive web app (PWA) to manage and analyze financial data for Panekkatt Mill. Key features: Record stock purchases and daily earnings, OCR and voice input support for ease of data entry, Real-time dashboard insights, AI agent for business analysis.',
      technologies: ['React', 'Tailwind CSS', 'Capacitor', 'Firebase (Auth + Firestore)', 'Custom AI agent (planned)', 'Chart.js or Recharts', 'Web Speech API'],
      githubLink: 'https://github.com/Naveenp7/Finance-Manger',
      liveLink: 'https://panekkatt-money-tracker.web.app/',
      image: '/money.jpg',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-card glass rounded-xl overflow-hidden neon-border cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="glass rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto neon-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-6">
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSelectedProject(null)}
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  <h2 className="text-2xl font-bold mb-4 pr-10">{selectedProject.title}</h2>

                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedProject.fullDescription}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                      View on GitHub
                    </a>
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FiExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;