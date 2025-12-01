import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExerciseCard from './ExerciseCard'; // Новый компонент для карточки упражнения

const ExerciseSection = ({ exercises, searchTerm, setSearchTerm }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Добавляем отступ сверху, чтобы заголовок не был под navbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 pt-10" // <-- Добавлен pt-10 для отступа сверху
        >
          <h2 className="text-4xl font-bold text-white dark:text-white mb-4">Музыкальные Упражнения Кирюшина</h2>
          <p className="text-lg text-gray-300 dark:text-gray-400">
            Поиск по номеру упражнения
          </p>
        </motion.div>

        {/* Поисковая строка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите номер упражнения (например, 1, 15, 100)"
            className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-700 dark:bg-gray-700 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-600 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
          />
        </motion.div>

        {/* Список упражнений */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </motion.div>

        {exercises.length === 0 && searchTerm && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 dark:text-gray-500 mt-8"
          >
            Упражнение с номером "{searchTerm}" не найдено.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ExerciseSection;