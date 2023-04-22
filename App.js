import React, { useReducer } from 'react';
import OperationButton from './OperationButton';
import DigitButton from './DigitButton';
import './styles.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.operation) {
        return {
          ...state,
          previousOperand: state.previousOperand
            ? `${state.previousOperand}${state.operation}${state.currentOperand}`
            : state.currentOperand,
          currentOperand: "",
          operation: payload.operation,
        };
      } else {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: payload.operation,
        };
      }
    case ACTIONS.CLEAR:
      return {
        currentOperand: "",
        previousOperand: "",
        operation: "",
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      const { previousOperand, currentOperand, operation } = state;
      if (!operation) return state;
      const previous = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);
      if (isNaN(previous) || isNaN(current)) return state;
      const operators = {
        "+": previous + current,
        "-": previous - current,
        "*": previous * current,
        "/": previous / current,
      };
      const result = operators[operation];
      return {
        currentOperand: result.toString(),
        previousOperand: "",
        operation: "",
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    currentOperand: '',
    previousOperand: '',
    operation: '',
  });

  const { currentOperand, previousOperand, operation } = state;

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <OperationButton operation="." dispatch
={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

    </div>
  );
}

export default App;
