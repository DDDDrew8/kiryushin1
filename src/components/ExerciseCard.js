import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStop, FaVolumeUp } from 'react-icons/fa'; // Добавлена иконка FaStop

const ExerciseCard = ({ exercise }) => {
  // Проверка на hidden должна происходить в App.js при фильтрации.
  // В этом компоненте мы предполагаем, что получили только видимые упражнения.
  // if (exercise.hidden) { return null; } // <-- Эта строка вызывает ошибку ESLint

  const audioRef = useRef(null);
  const progressRef = useRef(null); // Ref для прогресс-бара
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0); // Для отслеживания текущего времени
  const [duration, setDuration] = useState(0); // Для отслеживания общей продолжительности

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

  // Обработка стоп
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Перемотка в начало
      setIsPlaying(false);
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

  // Обработка изменения времени воспроизведения (перемотка)
  const handleProgressChange = (e) => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Обновление прогресс-бара при воспроизведении
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (progressRef.current) {
        // Обновляем значение прогресс-бара в процентах
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        progressRef.current.value = percent || 0;
      }
    }
  };

  // Установка общей продолжительности при загрузке метаданных
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
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
    audio.addEventListener('timeupdate', handleTimeUpdate); // Слушаем изменение времени
    audio.addEventListener('loadedmetadata', handleLoadedMetadata); // Слушаем метаданные

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Форматирование времени (секунды -> MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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
        <audio ref={audioRef} src={audioPath} preload="metadata" /> {/* preload="metadata" для загрузки времени */}
        <div className="flex flex-col space-y-2">
          {/* Прогресс-бар */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 dark:text-gray-500 w-10">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              ref={progressRef} // Привязываем ref
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0} // Значение в процентах
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
              aria-label="Прогресс воспроизведения"
            />
            <span className="text-xs text-gray-400 dark:text-gray-500 w-10 text-right">
              {formatTime(duration)}
            </span>
          </div>

          {/* Кнопки управления */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={handleStop}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label="Стоп"
              >
                <FaStop />
              </button>
            </div>
            <div className="flex items-center space-x-1 w-full max-w-[60%]">
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
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
