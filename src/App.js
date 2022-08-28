import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./pages/Search.js";
import Top from "./pages/Top.js";
import Watch from "./pages/Watch.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Top />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/watch" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
