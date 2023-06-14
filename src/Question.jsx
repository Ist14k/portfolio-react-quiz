import React from 'react';
import Progress from './Progress';
import NextQuestion from './NextQuestion';
import Timer from './Timer';
import Footer from './Footer';

const Question = props => {
  const { answer, dispatch } = props;
  const { question, options, correctOption } = props.question;
  const { index, questionsLength, secondsRemaining } = props.progress;
  const hasAnswer = answer !== null;

  return (
    <>
      <Progress progress={props.progress} />
      <div>
        <h2>{question}</h2>
        <div className="options">
          {options.map((el, index) => (
            <button
              key={el}
              onClick={() => dispatch({ type: 'new_answer', payload: index })}
              disabled={hasAnswer}
              className={
                'btn btn-option' +
                (index === answer ? ' answer' : '') +
                (hasAnswer ? (index === correctOption ? ' correct' : ' wrong') : '')
              }
            >
              {el}
            </button>
          ))}
        </div>
        <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          <NextQuestion dispatch={dispatch} answer={answer} index={index} questionsLength={questionsLength} />
        </Footer>
      </div>
    </>
  );
};

export default Question;
