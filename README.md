
start command : npm run dev

# 📰 NewsWave - Personalized News App

NewsWave is a responsive React.js news application that fetches the latest headlines using the NewsAPI. It features infinite scrolling, category filtering, and a preferences settings page to enhance user experience.

---
screenshot - 
https://github.com/anil-shelke/PGAGI_compeny_task/blob/main/Screenshot%202025-07-21%20173329.png

- **Home Page** with news cards and infinite scroll
- **Settings Page** for selecting preferred categories
- **Mobile Responsive** UI using Bootstrap

---

## 🛠 Tech Stack

| Frontend   | Others           |
|------------|------------------|
| React.js   | LocalStorage     |
| Redux Toolkit | React Router v6 |
| Bootstrap  | Infinite Scroll  |
| Axios      | NewsAPI          |

---

## 🔧 Features

- 🔄 **Infinite scrolling** for seamless news loading
- 🎯 **Category selection** from settings page
- 💾 **LocalStorage** to persist preferences
- 💡 **Sort by date** (newest/oldest)
- 📱 **Responsive UI**
- User Preferences
- Search Bar: Allow users to search for content across different categories
- Debounced Search: debounced search functionality to optimize performance while the user types.

---



Install Dependencies
npm install

Add .env File
VITE_NEWS_API_KEY=your_newsapi_key_here

Start Development Server
npm run dev
