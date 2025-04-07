/** import './App.css' */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grammarpage from "./Pages/Grammarpage";
import Mainpage from "./Pages/Mainpage";
import Summarypage from "./Pages/Summarypage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/grammar" element={<Grammarpage />} />
        <Route path="/summary" element={<Summarypage/>} />
      </Routes>
    </Router>
  );
}

export default App;
