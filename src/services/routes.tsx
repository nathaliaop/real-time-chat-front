import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from '../pages/Chat/index';
import Login from '../pages/Login';

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/chat' element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AllRoutes;