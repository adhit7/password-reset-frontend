import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import ErrorBox from '../../components/ErrorBox';
import {
  useNewPasswordMutation,
  useTempPasswordMutation,
} from '../../slices/userApiSlice';
import { setCredentials, setTempPasswordStatus } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const NewPassword = () => {
  const [tempToken, setTempToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const [tempPassword] = useTempPasswordMutation();

  const { checkTempPassword } = useSelector((state) => state.auth);

  //Checks with the generated random string in db
  //then chenges the checkTempPassword to true where shows new password form
  const tempPasswordHandler = async (e) => {
    e.preventDefault();
    if (tempToken.length === 0) {
      toast.error('Please enter the temporary password', {
        position: 'top-right',
      });
    } else {
      try {
        const res = await tempPassword(tempToken).unwrap();
        toast.success(res?.message, { position: 'top-right' });
        dispatch(setTempPasswordStatus(true));
      } catch (err) {
        toast.error(err?.data?.message || err.error, { position: 'top-right' });
        console.log(err?.data?.message || err.error);
      }
    }
  };

  //Setting new password
  const setNewPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Both password are not same');
    } else {
      try {
        //token - the random string, just make sure that is same user
        const res = await newPassword({
          tempToken: token,
          password: password,
        }).unwrap();
        toast.success('Your password is changed', { position: 'top-right' });
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error, { position: 'top-right' });
        console.log(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h3>{checkTempPassword ? 'New Password' : 'Temporary Password'}</h3>
      {error && <ErrorBox message={error} />}
      {checkTempPassword ? (
        <Form onSubmit={setNewPasswordHandler}>
          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='my-2 w-100 fs-5'
          >
            Submit
          </Button>
        </Form>
      ) : (
        <Form onSubmit={tempPasswordHandler}>
          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Temporary Password</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter password'
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='my-2 w-100 fs-5'
          >
            Submit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default NewPassword;
