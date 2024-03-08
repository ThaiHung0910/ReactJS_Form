import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactForm from './components/ReactForm/ReactForm';
import { Provider } from 'react-redux';
import {store} from './redux/store'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactForm/>
  </Provider>
);


