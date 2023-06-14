import React from 'react';

const StartScreen = props => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{props.questionsLength} Questions to Test Your React Mastery</h3>
      <button onClick={() => props.dispatch({ type: 'start' })} className="btn btn-ui">
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
