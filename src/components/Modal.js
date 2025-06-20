import React from 'react';

const Modal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl max-w-lg w-full relative shadow-lg transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-auto rounded object-contain max-h-[70vh]"
        />

        {/* Details */}
        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {image.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Creator: {image.creator}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Created: {image.date}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {image.prompt || 'No prompt available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
