import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };
  return (
    <BrowserRouter>
      <div className="background-container">
        <div className="app">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  name={name}
                  setName={setName}
                  fetchQuestions={fetchQuestions}
                />
              }
            />
            <Route
              path="/quiz"
              element={
                <Quiz
                  name={name}
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
                />
              }
            />
            <Route
              path="/result"
              element={<Result name={name} score={score} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
