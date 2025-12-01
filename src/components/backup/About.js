import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiLayers } from 'react-icons/fi';

const About = () => {
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

  // Data for cards
  const educationData = {
    degree: 'B.Tech in AI & Data Science',
    college: 'Technology Institute',
    year: 'Final Year (2025)',
  };

  const interestsData = [
    { name: 'Artificial Intelligence', icon: <FiCpu /> },
    { name: 'Robotics', icon: <FiLayers /> },
    { name: 'Web Development', icon: <FiCode /> },
    { name: 'App Development', icon: <FiLayers /> },
    { name: 'Data Analysis', icon: <FiDatabase /> },
  ];

  const toolsData = [
    { name: 'Python', category: 'Programming' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'PyTorch', category: 'AI/ML' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'Streamlit', category: 'Data' },
    { name: 'Pandas', category: 'Data' },
    { name: 'SQL', category: 'Database' },
    { name: 'Git', category: 'Version Control' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Mongo DB', category: 'DevOps' },
    { name: 'Media Pipe', category: 'Design' },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Education Card */}
          <motion.div variants={itemVariants} className="glass rounded-xl p-6 neon-border">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Education
            </h3>
            <div className="space-y-3">
              <p className="font-medium">{educationData.degree}</p>
              <p className="text-gray-600 dark:text-gray-400">{educationData.college}</p>
              <p className="text-gray-600 dark:text-gray-400">{educationData.year}</p>
            </div>
          </motion.div>

          {/* Interests Card */}
          <motion.div variants={itemVariants} className="glass rounded-xl p-6 neon-border">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Interests
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {interestsData.map((interest, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-primary-500 dark:text-primary-400">{interest.icon}</span>
                  <span className="text-sm">{interest.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools Card */}
          <motion.div variants={itemVariants} className="glass rounded-xl p-6 neon-border">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolsData.map((tool, index) => (
                <span 
                  key={index} 
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;