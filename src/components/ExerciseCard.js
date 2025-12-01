import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const ExerciseCard = ({ exercise }) => {
  // Проверка на hidden больше не нужна, так как она происходит в App.js

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0); // Громкость от 0 до 1

  // Обработка воспроизведения/паузы
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Пауза всех других аудио
        document.querySelectorAll('audio').forEach(audio => {
          if (audio !== audioRef.current) {
            audio.pause();
          }
        });
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Обработка изменения громкости
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Синхронизация состояния воспроизведения с аудио
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Генерация пути к аудиофайлу
  const audioPath = `https://github.com/DDDDrew8/kiryushin/releases/download/Kyryushin/${exercise.displayNumber.padStart(3, '0')}.mp3`;

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-gray-600 dark:border-gray-600 flex flex-col h-full"
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-white dark:text-white">
          Упр. {exercise.displayNumber}
        </h3>
        {exercise.pdfRef && (
          <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-700 dark:bg-gray-600 px-2 py-1 rounded">
            {exercise.pdfRef}
          </span>
        )}
      </div>

      {/* Отображаем заголовок, если он есть */}
      {exercise.title && exercise.title.trim() !== '' && (
        <p className="text-gray-300 dark:text-gray-300 mb-2">{exercise.title}</p>
      )}
      {/* Отображаем описание, если оно есть */}
      {exercise.desc && exercise.desc.trim() !== '' && (
        <p className="text-gray-400 dark:text-gray-400 text-sm mb-3">{exercise.desc}</p>
      )}
      {/* Отображаем нотацию, если она есть */}
      {exercise.notation && exercise.notation.trim() !== '' && (
        <p className="text-gray-500 dark:text-gray-500 text-sm mb-3 font-mono bg-gray-900 dark:bg-gray-900 p-2 rounded">
          {exercise.notation}
        </p>
      )}

      {/* Плеер */}
      <div className="mt-auto pt-4 border-t border-gray-600 dark:border-gray-600">
        <audio ref={audioRef} src={audioPath} preload="none" />
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="flex items-center space-x-1 w-full">
            <FaVolumeUp className="text-gray-400 dark:text-gray-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-600 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              aria-label="Громкость"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;