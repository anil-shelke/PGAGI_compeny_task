import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const savedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || ['technology'];

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ query, selectedCategories, page, pageSize }, thunkAPI) => {
    let allArticles = [];

    if (query && query.trim() !== '') {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      );
      allArticles = response.data.articles;
    } else {
      for (const cat of selectedCategories) {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${API_KEY}`
        );
        allArticles.push(...response.data.articles);
      }
    }

    return allArticles;
  }
);


const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    query: '',
    selectedCategories: savedCategories,
    currentPage: 1,
    hasMore: true,
    pageSize: 10,
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.currentPage = 1;
      state.articles = [];
      state.hasMore = true;
    },
    setCategory: (state, action) => {
      const cat = action.payload;
      if (state.selectedCategories.includes(cat)) {
        state.selectedCategories = state.selectedCategories.filter(c => c != cat);
      }
      else {
        state.selectedCategories.push(cat);
      }
      
      state.currentPage = 1;
      state.articles = [];
      state.hasMore = true;
      localStorage.setItem('selectedCategories', JSON.stringify(state.selectedCategories));
    },
    setNextPage: (state) => {
      state.currentPage += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = [...state.articles, ...action.payload];

        if (action.payload.length < state.pageSize) {
          state.hasMore = false;
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
  }
})

export const { setQuery, setCategory, setNextPage, resetNews} = newsSlice.actions;
export default newsSlice.reducer;