import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articles } from "./data.jsx";
import { Link } from "react-router-dom";

const ArticleDetail = ({ onCategorySelect, onTagSelect }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate を使用してページ遷移を行う
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>記事が見つかりません。</div>;
  }

  // カテゴリをクリックしたときの動作
  const handleCategoryClick = (category) => {
    onCategorySelect(category); // カテゴリを選択する関数を呼び出し
    navigate("/"); // 記事一覧ページに遷移
  };

  // タグをクリックしたときの動作
  const handleTagClick = (tag) => {
    onTagSelect(tag); // タグを選択する関数を呼び出し
    navigate("/"); // 記事一覧ページに遷移
  };

  return (
    <main>
      <h1 className="title">{article.title}</h1>
            {/* カテゴリリンク */}
            <div className="category">
        <span
          onClick={() => handleCategoryClick(article.category)}
          className="category-link"
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          カテゴリ: {article.category}
        </span>
      </div>

      {/* タグをアイコンのようにリンクとして表示する部分 */}
      <div className="tags">
        {article.tags.map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTagClick(tag)}
            className="tag-icon"
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="content">{article.content}</p>
      <Link to="/">記事一覧に戻る</Link>


      
    </main>
  );
};

export default ArticleDetail;
