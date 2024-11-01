import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from './data';

const ArticleList = ({ selectedCategory, selectedTag, onCategoryChange, onTagChange, currentPage, setCurrentPage }) => {
  const articlesPerPage = 8;

  // カテゴリとタグで記事をフィルタリングする
  const filteredArticles = articles.filter(article => {
    if (selectedCategory !== 'All' && selectedTag !== 'All') {
      return article.category === selectedCategory && article.tags.includes(selectedTag);
    } else if (selectedCategory !== 'All') {
      return article.category === selectedCategory;
    } else if (selectedTag !== 'All') {
      return article.tags.includes(selectedTag);
    } else {
      return true;
    }
  });

  // 表示する記事の範囲を計算
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // ページの総数を計算
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // ページを変更する関数
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main>
      <h1 className="title">記事一覧<small>松田作</small></h1>

      {/* カテゴリ選択のボタン */}
      <div className="categories">
        {['All', 'React', 'JavaScript', 'CSS'].map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={selectedCategory === category ? 'active-category' : ''}
            style={{
              backgroundColor: selectedCategory === category ? '#3498db' : '#f0f0f0',
              color: selectedCategory === category ? '#fff' : '#000',
              padding: '10px 15px',
              margin: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 記事一覧を表示 */}
      <ul className="article-list">
        {currentArticles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
            {/* タグをアイコンのように表示して、それぞれクリックできるようにリンクを付ける */}
            <div className="tags">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag-icon"
                  onClick={() => onTagChange(tag)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* ページネーションのボタン */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1} // 現在のページは押せないようにする
          >
            {index + 1} {/* ページ番号を表示 */}
          </button>
        ))}
      </div>
    </main>
  );
}

export default ArticleList;
