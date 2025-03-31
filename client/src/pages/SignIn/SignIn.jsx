import axios from 'axios';
import { useState } from 'react';
//import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('dasd');

    try {
      const response = await axios.post(`http://localhost:3030/auth/signin`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { token, user, id } = response.data;
        dispatch(setLogin({ token, user, id }));

        window.location.replace('/');
      } else if (response.status === 400) {
        setMessage('Missing required fields');
      } else if (response.status === 401) {
        setMessage('Incorrect password');
      }
    } catch (error) {
      console.log(error);
      setMessage('Please try again or reset your password.');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {' '}
          {message && <div>{message}</div>}
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{' '}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
