import React from 'react';

const Progress = props => {
  const { index, points, questionsLength, totalPoints, earnedPoints } = props.progress;

  return (
    <header className="progress">
      <progress max={questionsLength} value={index + 1} />
      <p>
        Question
        <strong>
          {index + 1}/{questionsLength}
        </strong>
      </p>
      <p>
        Points
        <strong>
          {earnedPoints}/{totalPoints}
        </strong>
      </p>
    </header>
  );
};

export default Progress;
