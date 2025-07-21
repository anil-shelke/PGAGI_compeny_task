import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews, setCategory, setQuery, setNextPage } from '../features/news/newsSlice'
import debounce from 'lodash/debounce';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Home = () => {

  const [sortOrder, setSortOrder] = useState('desc');
  const dispatch = useDispatch();
  const { articles, loading, error, query, selectedCategories, currentPage, pageSize, hasMore } = useSelector((state) => state.news);

  const { ref, inView } = useInView();

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (value) {
      dispatch(setQuery(value))
    }
    e.target.reset();
  }

  // Debounced function to update the query
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setQuery(value));
    }, 500),
    [dispatch]
  )

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    if (value) {
      debouncedSearch(value);
    }
  }

  useEffect(() => {
    dispatch(fetchNews({ query, selectedCategories, page: currentPage, pageSize }));

  }, [dispatch, currentPage]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      dispatch(setNextPage());
    }
  }, [inView]);


  useEffect(() => {
    console.log(articles);
    console.log(selectedCategories.toString());
  }, [articles])


  return (
    <div className="container-fluid text-light py-4 min-vh-100" style={{ backgroundColor: '#242424' }}>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">📰 NewsApp</span>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2 bg-secondary text-light border-0"
            type="search"
            placeholder="Search news..."
            name="search"
            onChange={handleInputChange}
          />
          <button className="btn text-white" style={{ border: 'none', backgroundColor: '#201e1eff' }} type="submit">Search</button>
        </form>
        <Link to="/settings" className="btn text-white btn-outline-light" style={{ border: 'none', backgroundColor: '#201e1eff' }}>
          Preferences
        </Link>
      </nav>



      <div className="d-flex justify-content-between align-items-center my-4 px-3 flex-wrap">
        {/* Empty spacer to push category buttons to center */}
        <div style={{ width: '100px' }}></div>

        {/* Category buttons centered */}
        <div className="d-flex gap-2 flex-wrap justify-content-center flex-grow-1">
          {['technology', 'business', 'sports', 'health', 'science'].map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`btn ${selectedCategories.includes(cat) ? 'btn-light text-dark' : 'btn-dark text-white'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort button at the right */}
        <div>
          <button
            className="btn btn-outline-info"
            style={{ border: 'none', backgroundColor: '#201e1eff' }}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sort by Date: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
          </button>
        </div>
      </div>



      {articles.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row justify-content-center">
          {[...articles]
            .sort((a, b) =>
              sortOrder === 'asc'
                ? new Date(a.publishedAt) - new Date(b.publishedAt)
                : new Date(b.publishedAt) - new Date(a.publishedAt)
            ).map((article, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div
                  className="card h-100 text-light border-0 shadow-lg"
                  style={{ backgroundColor: "#1c1c1c", borderRadius: "12px" }}
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage || '/default-news.jpg'}
                      className="card-img-top"
                      alt="News Thumbnail"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = '/default-news.jpg';
                      }}
                    />

                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text text-secondary" style={{ flexGrow: 1 }}>
                      {article.description || "No description available."}
                    </p>
                    <a
                      href={article.url}
                      className="btn btn-outline-light mt-auto"
                      rel="noreferrer"
                    // style={{ backgroundColor: "#191919ff"}}
                    >
                      Read More
                    </a>
                  </div>
                  <div className="card-footer text-secondary small bg-transparent border-0">
                    {article.source?.name} ·{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="text-center my-4">
        {loading && <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>}
        {!loading && hasMore && <div ref={ref}>Loading more...</div>}
        {!hasMore && <p>No more articles</p>}
      </div>

    </div>
  )
}

export default Home
