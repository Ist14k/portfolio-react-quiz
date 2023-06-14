import React from 'react';

const NextQuestion = props => {
  const { dispatch, answer, index, questionsLength } = props;

  if (answer === null) return null;

  if (index < questionsLength - 1)
    return (
      <button onClick={() => dispatch({ type: 'next_question' })} className="btn btn-ui">
        Next Question
      </button>
    );

  if (index === questionsLength - 1)
    return (
      <button onClick={() => dispatch({ type: 'finish_answering' })} className="btn btn-ui">
        Finish
      </button>
    );
};

export default NextQuestion;
