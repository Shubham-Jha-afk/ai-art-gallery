import React from 'react';

const CategoryFilter = ({ categories, selectedCategories, onToggleCategory, onClear }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-4">
      {/* ✅ All Button */}
      <button
        onClick={() => onToggleCategory('ALL')}
        className={`px-3 py-1 rounded-full border ${
          selectedCategories.length === 0
            ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900'
            : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
        }`}
      >
        All
      </button>

      {/* ✅ Category Buttons */}
      {categories.map((cat) => {
        const isSelected = selectedCategories.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggleCategory(cat)}
            className={`px-3 py-1 rounded-full border ${
              isSelected
                ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900'
                : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {cat}
          </button>
        );
      })}

      {/* ✅ Clear Filters Button (only show when filters are active) */}
      {selectedCategories.length > 0 && (
        <button
          onClick={onClear}
          className="ml-auto px-3 py-1 text-sm text-red-600 border border-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
        >
          Clear Filters ✕
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;
