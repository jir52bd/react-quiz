import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import useQuestions from "../../hooks/useQuestions";
import _ from "lodash";
// import { useAuth } from "../../contexts/AuthContext";
// import { getDatabase, set, ref } from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.chesked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  // const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //handle when user clicks the next button to next questions
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  //handle when user clicks the prev button to previous questions
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  //submit function
  // async function submit() {
  //   const { uid } = currentUser;
  //   const db = getDatabase();
  //   const resultRef = ref(db, `result/${uid}`);
  //   await set(resultRef, {
  //     [id]: qna,
  //   });
  // }

  //calculate percentage of progreaa
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>loading .... </div>}
      {error && <div> There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handlechange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
