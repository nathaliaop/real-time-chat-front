import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    Title
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToken } from '../../context/TokenContext';

const SignUp = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { setToken } = useToken();

    useEffect(() => {
        window.addEventListener('storage', function (e) {
            console.log('oi')
            if (e.storageArea === sessionStorage && e.key === 'token') {
                navigate('/chat');
            }
        });
    }, [])

    const handleLogin = (e: any) => {
        e.preventDefault();
        api.post('/auth/signup', {
            username: username,
            email: email,
            password: password,
        })
        .then((response) => {
            const loginDto: {token: string} = response.data;
            setUsername('');
            setEmail('');
            setPassword('');
            setToken(loginDto.token);
            navigate('/');
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro! Tente novamente.');
        });
    }

    return (
        <>
        <Container>
            <Form onSubmit={ handleLogin }>
                <Title>Sign Up</Title>
                <Input value={ username } onChange={ setUsername } placeholder='Username' />
                <Input type = 'email' value={ email } onChange={ setEmail } placeholder='Email' />
                <Input type = 'password' value={ password } onChange={ setPassword } placeholder='Password' />
                <Button>Send</Button>
                <span>Já tem uma conta? <Link to='signup'>Entre</Link></span>
            </Form>
        </Container>
        </>
    );
}

export default SignUp;