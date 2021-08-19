import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import EmployeePage from './modules/employee/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <EmployeePage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

