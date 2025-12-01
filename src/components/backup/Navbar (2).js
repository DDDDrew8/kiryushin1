import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
// import { BsSun, BsMoon } from 'react-icons/bs'; // Эти иконки, вероятно, для темы, но в этом коде не используются
import { AiOutlineHome, AiOutlineProject, AiOutlineUser, AiOutlineMail, AiOutlineBook } from 'react-icons/ai';
// Убираем импорты Link и useLocation

const Navbar = ({ theme, toggleTheme }) => { // theme и toggleTheme не используются в этом фрагменте
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [hidden, setHidden] = useState(false); // Скрытие при скролле не реализовано
  const [sectionOffsets, setSectionOffsets] = useState([]);
  const { scrollY } = useScroll();

  // Кэширование позиций секций
  useEffect(() => {
    const calculateOffsets = () => {
      const sections = document.querySelectorAll('section[id]'); // Ищем элементы с атрибутом id
      const offsets = Array.from(sections).map(section => ({
        id: section.getAttribute('id'),
        offsetTop: section.offsetTop,
        offsetHeight: section.offsetHeight,
      }));
      setSectionOffsets(offsets);
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
  }, []);

  // Обработчик скролла для обновления стилей и активной ссылки
  useMotionValueEvent(scrollY, 'change', latest => {
    // Обновление состояния скролла для изменения стиля навбара
    setScrolled(latest > 50);

    // Обновление активной ссылки
    let currentSection = 'home'; // По умолчанию home
    for (const section of sectionOffsets) {
      const sectionTop = section.offsetTop - 100; // Отступ для точности
      const sectionBottom = sectionTop + section.offsetHeight;
      if (latest >= sectionTop && latest < sectionBottom) {
        currentSection = section.id;
        break;
      }
    }
    setActiveLink(currentSection);
  });

  // Обработчик плавного скролла
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === '#home') {
      // Прокрутка к началу страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveLink('home'); // Обновляем активную ссылку
    } else {
      const section = document.querySelector(targetId);
      if (section) {
        setActiveLink(targetId.substring(1)); // Обновляем активную ссылку
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Определение пунктов меню (теперь с якорными ссылками)
  const navLinks = [
    { name: 'Home', path: '#exercises', icon: AiOutlineHome }, // Изменен путь на #exercises
    { name: 'About', path: '#about', icon: AiOutlineUser },   // Вернули #about
    // { name: 'Projects', path: '#projects', icon: AiOutlineProject }, // Закомментировано
    // { name: 'Studies', path: '#studies', icon: AiOutlineBook },     // Закомментировано
    // { name: 'Contact', path: '#contact', icon: AiOutlineMail },     // Закомментировано
  ];

  // Анимации для элементов навигации
  const indicatorTransition = {
    type: 'spring',
    stiffness: 380,
    damping: 15,
    mass: 0.7,
  };

  const navLinkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 25,
        delay: 0.1,
        staggerChildren: 0.07
      }
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-5">
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        // Изменен max-w для уменьшения ширины
        className={`ios-glass rounded-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'} shadow-lg px-3 md:max-w-xs lg:max-w-xs w-full border border-white/10 backdrop-blur-xl bg-black/10`}
      >
        <nav className="flex items-center justify-between w-full" aria-label="Main navigation">
          {/* Список ссылок */}
          {/* Уменьшен padding-x */}
          <ul className="flex items-center justify-between w-full px-1 md:px-2">
            {navLinks.map((link) => (
              <motion.li key={link.name} variants={navLinkVariants}>
                <a
                  href={link.path}
                  className="flex flex-col items-center relative group"
                  onClick={(e) => handleSmoothScroll(e, link.path)} // Вызов обработчика
                  aria-current={activeLink === link.path.substring(1) ? 'page' : undefined}
                >
                  <div
                    // Изменены стили для иконки и фона при наведении/активности: цвета текста теперь белый/светло-серый
                    className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 ${activeLink === link.path.substring(1) ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 text-white' : 'text-white/80 hover:text-white'}`}
                  >
                    <link.icon className={`text-lg md:text-xl ${activeLink === link.path.substring(1) ? 'text-white' : 'text-white/80'}`} aria-hidden="true" />
                  </div>
                  <span
                    // Изменены стили для текста: теперь белый/светло-серый
                    className={`text-[9px] md:text-[10px] mt-0.5 md:mt-1 font-medium transition-all duration-300 ${activeLink === link.path.substring(1) ? 'text-white' : 'text-white/80'}`}
                  >
                    {link.name}
                  </span>
                  {activeLink === link.path.substring(1) && (
                    <motion.div
                      className="absolute -bottom-1 w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      layoutId="navIndicator"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={indicatorTransition}
                      aria-hidden="true"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </div>
  );
};

export default Navbar;