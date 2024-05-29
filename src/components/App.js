import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

import { useEffect, useReducer } from "react";

function App() {
  const initalState = {
    questions: [],

    // loading, ready, error, active, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, status: "ready", questions: action.payload };

      case "start":
        return { ...state, status: "active" };

      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points: state.points + question.points,
        };

      case "dataFailed":
        return { ...state, status: "error" };

      default:
        throw new Error("unknown Action");
    }
  }

  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initalState
  );

  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
