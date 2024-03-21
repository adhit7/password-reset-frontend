import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import ErrorBox from '../../components/ErrorBox';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    setError('');
    e.preventDefault();

    try {
      const res = await login({ userName, password }).unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (err) {
      setError(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h3>Login</h3>
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your email id before @, user@gmail.com as user'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Row className='py-3'>
          <Col className='d-flex justify-content-between'>
            <span>
              <input type='checkbox' /> Remember Me
            </span>

            <Link to='/forgot-password' className='text-decoration-none'>
              Forgot Password?
            </Link>
          </Col>
        </Row>

        <Button
          // disabled={isLoading}
          type='submit'
          variant='primary'
          className='my-2 w-100 fs-5'
        >
          Login
        </Button>
      </Form>

      <Link to='/register'>
        {' '}
        <Button
          disabled={isLoading}
          type='submit'
          variant='outline-primary'
          className='my-2 w-100 fs-5'
        >
          Register
        </Button>
      </Link>

      {/* {isLoading && <Loader />} */}
    </FormContainer>
  );
};

export default Login;
