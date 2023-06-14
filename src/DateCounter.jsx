import { useReducer } from 'react';

function reducer(state, action) {
  console.log(state, action);

  const { type, payload } = action;
  const { count, step } = state;

  if (type === 'increment') return { ...state, count: count + payload };
  if (type === 'decrement') return { ...state, count: count - payload };
  if (type === 'set_count') return { ...state, count: payload };
  if (type === 'set_step') return { ...state, step: payload };
  if (type === 'reset') return { count: 0, step: 1 };

  return state;
}

function DateCounter() {
  const initialState = {
    count: 0,
    step: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'decrement', payload: 1 });
  };

  const inc = function () {
    dispatch({ type: 'increment', payload: 1 });
  };

  const defineCount = function (e) {
    dispatch({ type: 'set_count', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'set_step', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
