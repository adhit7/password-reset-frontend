import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = ({ logOut, isLoading }) => {
  return (
    <header>
      <Navbar collapseOnSelect bg='dark' expand='lg' variant='dark'>
        <Container>
          <Navbar.Brand className='fs-4'>{'<Dev />'}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <button
              disabled={isLoading}
              className='btn btn-outline-success'
              onClick={logOut}
            >
              Logout
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
