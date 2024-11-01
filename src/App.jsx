import './styles/styles.scss';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from './ArticleList';
import ArticleDetail from './ArticleDetail';

function App() {
  // カテゴリとタグを管理するためのステートをここに定義
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号のステートを追加

  // カテゴリを選択する関数
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedTag('All'); // タグをリセットしてカテゴリのみでフィルタリングする
    setCurrentPage(1); // ページを初期値にリセットする
  };

  // タグを選択する関数
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setSelectedCategory('All'); // カテゴリをリセットしてタグのみでフィルタリングする
    setCurrentPage(1); // ページを初期値にリセットする
  };

  return (
    <Router>
      <Routes>
        {/* ArticleListにカテゴリとタグの状態および変更関数を渡す */}
        <Route
          path="/"
          element={
            <ArticleList
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onCategoryChange={handleCategoryChange}
              onTagChange={handleTagChange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        {/* ArticleDetailにタグ・カテゴリの選択関数を渡す */}
        <Route
          path="/article/:id"
          element={
            <ArticleDetail
              onCategorySelect={handleCategoryChange}
              onTagSelect={handleTagChange}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
