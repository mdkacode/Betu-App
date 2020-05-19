import Actions from './action';
import React from 'react';

interface productDetailsProps {
  name: string;
  _id: string;
  units: string;
  price: Iprice;
  quantity: number;
  maxOrderCount: number;
  minOrderCount: number;
  imageList: string[];
  isAvailable: boolean;
}
interface Icategory {
  name: string;
  _id: string;
}

const initialState = {
  rating: 1,
  productList: [{} as productDetailsProps],
  shopId: {},
  category: {} as Icategory,
  paymentStatus: false as boolean,
};

const reducer = (state: any, action: any) => {
  switch (action.Type) {
    case Actions.RATING:
      return {...state, rating: action.value};
    case Actions.RESET:
      return {...state, rating: action.value};
    case Actions.PRODUCT_LIST:
      return {...state, productList: action.value};
    default:
      return {...state, ...initialState};
  }
};

export const ApplicationContext = React.createContext(initialState);
ApplicationContext.displayName = 'APP_CONTECT';
export const ApplicationConumer = ApplicationContext.Consumer;
const Provider = (children: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    rating: state.rating,
    item: state.item,
    productList: () => dispatch({type: Actions.PRODUCT_LIST}),
    reset: () => dispatch({type: Actions.RESET}),
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children.children}
    </ApplicationContext.Provider>
  );
};

export default Provider;
