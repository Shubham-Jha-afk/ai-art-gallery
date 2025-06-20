import React, { useState } from 'react';

const ImageCard = ({ image, onClick, favorites, toggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isFav = favorites.includes(image.id);

  const handleDownload = (e) => {
    e.stopPropagation(); // prevent modal from opening
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title}.jpg`;
    link.click();
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer shadow-md rounded-xl overflow-hidden hover:scale-105 transform transition duration-300 bg-white dark:bg-gray-800 relative"
    >
      {/* Skeleton while loading */}
      <div className="relative w-full h-60">
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700" />
        )}
        <img
          src={image.url}
          alt={image.title}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-60 object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Favorite & Download Actions */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(image.id);
          }}
          title="Favorite"
          className={`text-xl ${
            isFav ? 'text-red-500' : 'text-gray-500'
          } hover:scale-110 transition-transform`}
        >
          ♥
        </button>

        <button
          onClick={handleDownload}
          title="Download"
          className="text-xl text-blue-500 hover:scale-110 transition-transform"
        >
          ⬇️
        </button>
      </div>

      {/* Image details */}
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {image.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">By {image.creator}</p>
        <p className="text-xs text-gray-400 dark:text-gray-400">{image.date}</p>
      </div>
    </div>
  );
};

export default ImageCard;
