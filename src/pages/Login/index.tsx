import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Form
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    
    const signUp = (e: any) => {
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
            sessionStorage.setItem('token', loginDto.token);
            navigate('/chat');
        })
        .catch(error => {
            console.error(error);
            alert('Ocorreu um erro! Tente novamente.');
        });
    }

    return (
        <>
        <Container>
            <Form>
                <Input value={ username } onChange={ setUsername } placeholder='Username' />
                <Input value={ email } onChange={ setEmail } placeholder='Email' />
                <Input value={ password } password onChange={ setPassword } placeholder='Password' />
                <button onClick = {signUp}>Send</button>
            </Form>
        </Container>
        </>
    );
}

export default Login;