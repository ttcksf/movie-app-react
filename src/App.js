import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./pages/Search";
import Top from "./pages/Top";
import Watch from "./pages/Watch";

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
