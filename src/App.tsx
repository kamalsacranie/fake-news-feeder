import { Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesPage />} />
    </Routes>
  );
}

export default App;
