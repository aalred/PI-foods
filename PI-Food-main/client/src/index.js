import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/store'

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode on="true">
    <Provider store={store}>
      <Route>
        <App />
      </Route>
    </Provider>,
  </React.StrictMode>
);
