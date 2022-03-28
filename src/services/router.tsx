import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SocketProvider } from '../context/SocketContext';
import Chat from '../pages/Chat/index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { useToken } from '../context/TokenContext';


const ProtectedRoute = ({ children } : { children: any }) => {
    const { token } = useToken();
    if (!token) {
        return <Navigate to='/signin' replace />;
    }
    return children;
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={
                    <ProtectedRoute>
                        <SocketProvider>
                            <Chat />
                        </SocketProvider>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;