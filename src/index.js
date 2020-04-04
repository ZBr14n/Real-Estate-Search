import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/slate/bootstrap.min.css"; 

import App from './App';
// import Footer from './components/Footer';

import * as serviceWorker from './serviceWorker';
import UpperFilters from './components/UpperFilters';

ReactDOM.render(
    <>
    <UpperFilters />
    <App />
    </>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
