import Actions from './action';
import React from 'react';

const initialState = { rating: 1 };

const reducer = (state: any, action: any) => {
  switch (action.Type) {
    case Actions.RATING:
      return { ...state, rating: action.value };
    case Actions.RESET:
      return { ...state, rating: action.value };
    default:
      return { ...state, ...initialState };
  }
};

export const ApplicationContext = React.createContext(initialState);
export const ApplicationConumer = ApplicationContext.Consumer;
const Provider = (children: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    rating: state.rating,

    reset: () => dispatch({ type: Actions.RESET }),
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children.children}
    </ApplicationContext.Provider>
  );
};

export default Provider;
