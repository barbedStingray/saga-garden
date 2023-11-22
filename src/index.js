import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// imports
import logger from 'redux-logger';

// SAGA step 1 - imports
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';



import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ];
    case 'SET_PLANT_LIST':
      return action.payload;
    default:
      return state;
  }
};


// const plantOriginalList = (state = [], action) => {
//     if(action.type === 'SET_PLANT_LIST') {
//       return action.payload;
//     }
//     return state;
// }


function* fetchPlantList() {
  try {

    const response = yield axios.get('/api/plant');

    const action = { type: 'SET_PLANT_LIST', payload: response.data }

    yield put(action);

  } catch (error) {
    console.log(`error GET /api/plant`, error);
    alert(`something went wrong`);
  }
}



function* rootSaga() {
  // all your sagas here
  yield takeEvery('FETCH_PLANT_LIST', fetchPlantList);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ 
    plantList 
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);