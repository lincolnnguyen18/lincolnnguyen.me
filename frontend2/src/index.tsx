import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import store from 'common/store';
import 'index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
