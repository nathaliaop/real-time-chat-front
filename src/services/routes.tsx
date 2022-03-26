import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SocketProvider } from '../context/SocketContext';
import Chat from '../pages/Chat/index';
import Login from '../pages/Login';

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/chat' element={
                    <SocketProvider>
                        <Chat />
                    </SocketProvider>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default AllRoutes;