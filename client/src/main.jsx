import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../tailwind.css';
import './App.css'
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
