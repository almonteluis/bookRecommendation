import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
