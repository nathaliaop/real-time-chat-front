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
    Title
} from './styles'

import Input from '../../components/Input';
import Button from '../../components/Button';
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { setToken, setUserId } = useToken();

  const handleSignUp = (e: any) => {
    e.preventDefault();
    api.post('/auth/signup', {
      username: username,
      email: email,
      password: password,
    })
      .then((response) => {
        const signupDto: {token: string, userId: number} = response.data;
          setUsername('');
          setEmail('');
          setPassword('');
          setToken(signupDto.token);
          setUserId(signupDto.userId);
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
        <Form onSubmit={ handleSignUp }>
          <Title>Sign Up</Title>
          <Input value={ username } onChange={ setUsername } placeholder='Username' />
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
          <Span>Already have an account? <Link to='/signin'>Login</Link></Span>
        </Form>
      </Container>
    );
}

export default SignUp;