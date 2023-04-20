import { Routes, Route } from "react-router-dom";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ArticlesPage from "./pages/ArticlesPage";
import TopicsPage from "./pages/TopicsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/articles/:articleId" element={<ArticleDetailPage />} />
    </Routes>
  );
}

export default App;
