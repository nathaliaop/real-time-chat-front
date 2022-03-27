import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    Title,
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToken } from '../../context/TokenContext';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { setToken } = useToken();

    const handleSignIn = (e: any) => {
        e.preventDefault();
        api.post('/auth/signin', {
            email: email,
            password: password,
        })
        .then((response) => {
            const signinDto: {token: string} = response.data;
            setEmail('');
            setPassword('');
            setToken(signinDto.token);
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
            <Form onSubmit={ handleSignIn }>
                <Title>Sign In</Title>
                <Input type = 'email' value={ email } onChange={ setEmail } placeholder='Email' />
                <Input type = 'password' value={ password } onChange={ setPassword } placeholder='Password' />
                <Button>Send</Button>
                <span>Ainda não tem uma conta? <Link to='signup'>Cadastre-se</Link></span>
            </Form>
        </Container>
        </>
    );
}

export default SignIn;