import { useState } from 'react';
import {
    Link,
    useNavigate
} from 'react-router-dom';

import api from '../../services/api';

import { useToken } from '../../context/TokenContext';

import {
    Container,
    Form,
    Span,
    Title,
} from './styles'

import Input from '../../components/Input';
import Button from '../../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { setToken, setUserId } = useToken();

    const handleSignIn = (e: any) => {
        e.preventDefault();
        api.post('/auth/signin', {
            email: email,
            password: password,
        })
        .then((response) => {
            const signinDto: {token: string, userId: number} = response.data;
            setEmail('');
            setPassword('');
            setToken(signinDto.token);
            setUserId(signinDto.userId);
            navigate('/');
        })
        .catch(error => {
            console.error(error.response.data.message);
            toast.warn(error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    return (
        <Container>
            <Form onSubmit={ handleSignIn }>
                <Title>Sign In</Title>
                <Input type = 'email' value={ email } onChange={ setEmail } placeholder='Email' />
                <Input type = 'password' value={ password } onChange={ setPassword } placeholder='Password' />
                <Button>Send</Button>
                <ToastContainer position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Span>Not registered yet? <Link to='/signup'>Sign Up</Link></Span>
            </Form>
        </Container>
    );
}

export default SignIn;