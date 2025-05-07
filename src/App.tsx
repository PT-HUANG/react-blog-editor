import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogEditor } from "@/pages";

function App() {
  return (
    <div className="app">
      <BrowserRouter basename="/react-blog-editor">
        <Routes>
          <Route path="/" element={<BlogEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
