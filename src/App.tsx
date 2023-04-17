import { Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
      </Routes>
    </div>
  );
}

export default App;
