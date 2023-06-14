import { useReducer, useEffect } from 'react';

import Header from './Header';
import MainContainer from './MainContainer';
import Error from './Error';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Question from './Question';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 0,
  // status - loading, error, ready, active,finished
  status: 'loading',
};

const reducer = (state, action) => {
  const { type, payload } = action;
  const secs_per_question = 30;

  if (type === 'data_fetched') return { ...state, questions: payload, status: 'ready' };
  else if (type === 'fetching_failed') return { ...state, status: 'error' };
  else if (type === 'start')
    return { ...state, status: 'active', secondsRemaining: state.questions.length * secs_per_question };
  else if (type === 'new_answer') {
    const question = state.questions.at(state.index);
    const pointToAdd = payload === question.correctOption ? state.points + question.points : state.points;
    return { ...state, answer: payload, points: pointToAdd };
  } else if (type === 'next_question') return { ...state, index: state.index + 1, answer: null };
  else if (type === 'finish_answering') return { ...state, status: 'finished' };
  else if (type === 'restart') return { ...initialState, questions: state.questions, status: 'ready' };
  else if (type === 'tick') {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 0 ? 'finished' : state.status,
    };
  } else return state;
};

const App = () => {
  const [{ questions, index, answer, points, secondsRemaining, status }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const questionsLength = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'data_fetched', payload: data }))
      .catch(err => dispatch({ type: 'fetching_failed' }));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <MainContainer>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen questionsLength={questionsLength} dispatch={dispatch} />}
        {status === 'active' && (
          <Question
            question={questions[index]}
            answer={answer}
            progress={{
              index,
              points,
              questionsLength,
              totalPoints,
              earnedPoints: points,
              secondsRemaining,
              status,
            }}
            dispatch={dispatch}
          />
        )}
        {status === 'finished' && (
          <FinishScreen totalPoints={totalPoints} earnedPoints={points} dispatch={dispatch} />
        )}
      </MainContainer>
    </div>
  );
};

export default App;
