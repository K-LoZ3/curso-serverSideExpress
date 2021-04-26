import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom'; // Agregamos para poder incluir el historial.
import { createBrowserHistory } from 'history'; // Importamos para crear el historial dentro del frontend.
import reducer from './reducers';
import App from './routes/App';
import initialState from './initialState'; // Cambiamos en estado inicial de redux para un archivo aparte.

const history = createBrowserHistory(); // Creamos el historial.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, initialState, composeEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);