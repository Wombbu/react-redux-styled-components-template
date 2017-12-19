import {createStore, AnyAction, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {ApiTypes} from './api-types';

// Actions

const actionTypes = {
  fetchStart: 'FETCH_START',
  fetchSuccess: 'FETCH_SUCCES',
}

export const fetchRandomUser = () => (dispatch: (action: AnyAction) => void) => {
  dispatch({type: actionTypes.fetchStart});

  fetch("https://randomuser.me/api/")
    .then((response: Response) => response.json())
    .then((randomUser: ApiTypes.Result) => {
        dispatch({type: actionTypes.fetchSuccess, payload: randomUser.results[0]})
    })
    .catch((error: any) => console.error(error));
}

// Reducer

export interface State {
  userData?: ApiTypes.User;
  loading: boolean;
}

const reducer = (state: State, action: AnyAction) => {
  switch(action.type) {
    case actionTypes.fetchStart:
      return {...state, loading: true};
    case actionTypes.fetchSuccess:
      return {loading: false, userData: action.payload};
    default:
      return {loading: false, userData: undefined};
  }
}

// Create redux store

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default createStore(reducer, {loading: false}, composeEnhancers(applyMiddleware(thunk)));