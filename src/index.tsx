import React from 'react';
import ReactDOM from 'react-dom';
import { TokenProvider } from './context/TokenContext';
import './index.css';
import AllRoutes from './services/routes';

ReactDOM.render(
    <TokenProvider>
        <AllRoutes />
    </TokenProvider>,
    document.getElementById('root')
);