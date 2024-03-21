import React from 'react';
import Header from '../../components/layouts/Header';
import { Container, Card } from 'react-bootstrap';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { removeCredentials } from '../../slices/authSlice';

const Home = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const userLogout = () => {
    logout();
    dispatch(removeCredentials());
  };
  return (
    <div>
      <Header logOut={userLogout} isLoading={isLoading} />
      <div className='py-5'>
        <Container className='d-flex justify-content-center'>
          <Card className='p-4 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1 className='text-center mb-4'>Password Forgot</h1>
            <p className='text-center mb-4'>
              This is a boilerplate for Password Forgot Flow, You can register
              new user and login with given details. It is MERN boilerplate
              project for authentication.
            </p>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Home;
