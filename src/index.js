import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// imports
import logger from 'redux-logger';

// SAGA step 1 - imports
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';
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
    // case 'ADD_PLANT':
    //   return [ ...state, action.payload ];
    case 'SET_PLANT_LIST':
      return action.payload;
    default:
      return state;
  }
};

const plantDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANT_DETAILS':
      return action.payload;
    default:
      return state;
  }
}


// set your plant list
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

function* addPlantList(action) {
  try {
    yield axios.post('/api/plant', action.payload);

    yield put({ type: 'FETCH_PLANT_LIST'});


  } catch (error) {
    console.log(`error POST`, error);
    alert(`something went wrong`);
  }
}

// delete a plant
function* deletePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`);

    yield put({ type: 'FETCH_PLANT_LIST' });

  } catch (error) {
    console.log(`deleting plant error`, error);
    alert(`something went wrong`);
    throw error;
  }
}

// obtain plant details
function* fetchPlantDetails(action) {
  try {
    const response = yield axios.get(`/api/plant/details/${action.payload}`);

    yield put({ type: 'SET_PLANT_DETAILS', payload: response.data });

  } catch (error) {
    console.log(`error in fetch plant details`, error);
    alert(`error in fetching plant details`);
  }
}



function* rootSaga() {
  // all your sagas here
  yield takeLatest('FETCH_PLANT_LIST', fetchPlantList);
  yield takeLatest('ADD_PLANT', addPlantList);
  yield takeLatest('DELETE_PLANT', deletePlant);
  yield takeLatest('FETCH_PLANT_DETAILS', fetchPlantDetails);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ 
    plantList,
    plantDetails
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