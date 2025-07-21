// Settings.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../features/news/newsSlice';
import { Link } from 'react-router-dom';

const categoriesList = ['technology', 'business', 'sports', 'health', 'science'];

const Settings = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(state => state.news.selectedCategories);

  const toggleCategory = (cat) => {
    dispatch(setCategory(cat));
  };

  return (
    <div className="container mt-4">
  {/* Top row with Home button */}
  <div className="d-flex text-white justify-content-between align-items-center mb-3">
    <Link to="/" className="btn text-white btn-outline-dark">
      🏠 Home
    </Link>
    <h3 className="text-center flex-grow-1 mb-0">Category Preferences</h3>
  </div>

  <p className="text-center">Select your preferred news categories:</p>

  <div className="d-flex gap-2 flex-wrap justify-content-center">
    {categoriesList.map((cat) => (
      <button
        key={cat}
        onClick={() => toggleCategory(cat)}
        className={`btn ${selectedCategories.includes(cat) ? 'btn-info text-white' : 'btn-outline-info'}`}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    ))}
  </div>
</div>
  );
};

export default Settings;
