import React from 'react'

const Navbar = () => {
    
    const handleSearch = () => {
        e.preventDefault();
        console.log("search button clicked");
    }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">📰 NewsApp</span>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2 bg-secondary text-light border-0"
            type="search"
            placeholder="Search news..."
            name="search"
          />
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
      </nav>
  )
}

export default Navbar
