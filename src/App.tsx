import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ArticlesPage from "./pages/ArticlesPage";
import TopicsPage from "./pages/TopicsPage";

function App() {
  const screenRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={screenRef} className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route
          path="/articles/:articleId"
          element={<ArticleDetailPage screenRef={screenRef} />}
        />
      </Routes>
    </div>
  );
}

export default App;
