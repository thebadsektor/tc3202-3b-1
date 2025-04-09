/** import './App.css' */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grammarpage from "./Pages/Grammarpage";
import Mainpage from "./Pages/Mainpage";
import Summarypage from "./Pages/Summarypage";
import Startpage from "./Pages/Startpage";
import QuizTopic from "./Pages/QuizTopic";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage/>} />
        <Route path="/mainpage" element={<Mainpage/>} />
        <Route path="/grammar" element={<Grammarpage />} />
        <Route path="/summary" element={<Summarypage/>} />
        <Route path="/quizzes" element={<QuizTopic/>} />
      </Routes>
    </Router>
  );
}

export default App;
