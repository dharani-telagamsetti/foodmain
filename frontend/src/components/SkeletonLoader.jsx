import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 1, type = 'card' }) => {
  const cardVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            animate="animate"
            className="bg-slate-200 dark:bg-slate-700 rounded-2xl h-40 w-full"
          />
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            animate="animate"
            className="bg-slate-200 dark:bg-slate-700 rounded-lg h-4 w-full"
          />
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
