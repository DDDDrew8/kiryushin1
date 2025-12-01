import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineHome, AiOutlineProject, AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

const LoadingScreen = ({ finishLoading }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Icons for the loading animation
  const icons = [
    { Icon: AiOutlineHome, color: 'text-blue-400' },
    { Icon: AiOutlineProject, color: 'text-purple-500' },
    { Icon: AiOutlineUser, color: 'text-pink-500' },
    { Icon: AiOutlineMail, color: 'text-orange-400' }
  ];

  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Wait for exit animation to complete before unmounting
      const transitionTimer = setTimeout(() => {
        finishLoading();
      }, 1500); // Increased time to allow for the enhanced exit animation
      
      return () => clearTimeout(transitionTimer);
    }, 3500); // Slightly longer initial loading time to show the animation

    return () => clearTimeout(loadingTimer);
  }, [finishLoading]);

  // Animation variants for the container
  const containerVariants = {
    loading: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother transition
      }
    }
  };

  // Animation variants for the welcome text
  const textVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  // Animation variants for the icons
  const iconCircleVariants = {
    loading: {
      scale: 1,
      transition: {
        duration: 3,
        ease: 'linear',
        repeat: Infinity
      }
    },
    complete: {
      scale: 1.1,
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother transition
      }
    }
  };

  // Animation for the inner icon to counter-rotate and pulse
  const innerIconVariants = {
    loading: {
      rotate: -360,
      transition: {
        duration: 3,
        ease: 'linear',
        repeat: Infinity
      }
    },
    complete: {
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  // Animation variants for individual icons
  const iconVariants = {
    initial: {
      scale: 0,
      opacity: 0
    },
    loading: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.5 + i * 0.15 // Staggered burst-out effect
      }
    }),
    complete: (i) => ({
      scale: [1, 1.3, 1], // "Pop" effect when returning to center
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: i * 0.1
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-black z-50"
      variants={containerVariants}
      initial="loading"
      animate={isLoading ? 'loading' : 'exit'}
    >
      {/* Animated blobs similar to the main app */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      {/* Welcome text */}
      <motion.div
        className="text-center mb-16 relative z-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-white">Welcome to </span>
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Portfolio
            </motion.span>
          </h1>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            of Naveen
          </motion.h2>
        </motion.div>
      </motion.div>
      
      {/* Loading animation with icons */}
      <motion.div
        className="relative h-40 w-40 mb-8 flex items-center justify-center"
        variants={iconCircleVariants}
        initial="loading"
        animate={isLoading ? 'loading' : 'complete'}
      >
        <div className="absolute w-full h-full rounded-full border border-white/10 opacity-30"></div>
        {icons.map(({ Icon, color }, i) => (
          <motion.div
            key={i}
            className={`flex items-center justify-center ${color} text-2xl z-10`}
            custom={i}
            variants={iconVariants}
            initial="initial"
            animate={isLoading ? 'loading' : 'complete'}
          >
            <motion.div
              className="ios-glass p-3 rounded-full backdrop-blur-md"
              variants={innerIconVariants}
              style={{ 
                animation: isLoading ? `pulse-glow 2s infinite` : 'none',
                boxShadow: `0 0 15px 2px rgba(${i === 0 ? '56, 189, 248' : i === 1 ? '168, 85, 247' : i === 2 ? '236, 72, 153' : '249, 115, 22'}, 0.5)`
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Loading text */}
      {isLoading && (
        <motion.div 
          className="text-white/80 text-sm mt-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className="h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mb-2 mx-auto max-w-[200px]"
          />
          <motion.span
            animate={{ 
              opacity: [0.5, 1, 0.5],
              transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            Loading...
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
