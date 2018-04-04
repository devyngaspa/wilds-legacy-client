import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import './assets/stylesheets/index.css'

const app = document.getElementById('root')

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
registerServiceWorker();
