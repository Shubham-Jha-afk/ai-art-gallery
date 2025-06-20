import React from 'react';
import ImageCard from './ImageCard';

const Gallery = ({ images, onSelect, favorites, toggleFavorite }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          onClick={() => onSelect(img)}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default Gallery;
