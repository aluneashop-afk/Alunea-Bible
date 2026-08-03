import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BibleProvider } from './contexts/BibleContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { DevotionalsPage } from './pages/DevotionalsPage';
import { SearchPage } from './pages/SearchPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <BibleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="reader" element={<Reader />} />
            <Route path="renungan" element={<DevotionalsPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BibleProvider>
  );
}
