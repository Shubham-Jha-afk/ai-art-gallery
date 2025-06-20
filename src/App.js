import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import preloaded from './data/preloaded';
import Switch from './components/Switch';
import CategoryFilter from './components/CategoryFilter';
import { fetchFromDeepAI } from './api/fetchImage';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
  });
const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
const [dynamicImages, setDynamicImages] = useState([]);




  // 🔧 Sync Tailwind dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);
  const toggleFavorite = (imageId) => {
  setFavorites((prev) =>
    prev.includes(imageId)
      ? prev.filter((id) => id !== imageId)
      : [...prev, imageId]
  );
};
  // 🔧 Extract unique categories
  const categories = [
    ...new Set(preloaded.flatMap((img) => img.category)),
  ];


  // 🔧 Filter images by selected categories
  const allImages = [...dynamicImages, ...preloaded];

const filteredImages = allImages.filter((img) => {
  const matchesCategory =
    selectedCategories.length === 0 ||
    (Array.isArray(img.category) &&
      img.category.some((cat) => selectedCategories.includes(cat)));

  const matchesSearch =
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.creator.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesFavorite =
    !showOnlyFavorites || favorites.includes(img.id);

  return matchesCategory && matchesSearch && matchesFavorite;
});


  // 🔧 Toggle individual category or reset all
  const handleToggleCategory = (cat) => {
    if (cat === 'ALL') {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  // 🔧 Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
  };
  
  const handleFetchNewImage = async () => {
  const newImage = await fetchFromDeepAI(); // can add prompt later
  setDynamicImages((prev) => [newImage, ...prev]);
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          AI Art Gallery
        </h1>
        <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className="px-6 py-2">
        <input
          type="text"
          placeholder="Search by title or creator..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="px-6 py-2">
        <button
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          className={`px-4 py-2 rounded-md text-sm border ${
            showOnlyFavorites
            ? 'bg-red-100 text-red-700 border-red-300'
          : 'bg-gray-100 text-gray-700 border-gray-300'
          }`}
        >
          {showOnlyFavorites ? 'Showing Favorites 🧡' : 'Show Favorites Only 🧡'}
        </button>
      </div>
        <div className="px-6 py-2">
          <button
            onClick={handleFetchNewImage}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
          🎨 Fetch New AI Art
          </button>
        </div>

      {/* Category Filters */}
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onClear={handleClearFilters}
      />

      {/* Gallery */}
      <Gallery
        images={filteredImages}
        onSelect={setSelectedImage}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      {/* Modal */}
      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;
