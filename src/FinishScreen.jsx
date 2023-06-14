import React from 'react';

const FinishScreen = props => {
  const { totalPoints, earnedPoints, dispatch } = props;
  return (
    <>
      <p className="result">
        You earned <strong>{earnedPoints}</strong> points out of {totalPoints}
      </p>
      <button onClick={() => dispatch({ type: 'restart' })} className="btn btn-ui">
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
