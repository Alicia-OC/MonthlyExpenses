import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const SignUp = () => {

  const dispatch = useDispatch();

  const [message, setMessage] = useState();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3030/auth/signup`, {
        name: fullName,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        window.location.replace('/SignUp');
      } else if (response.status === 400) {
        setMessage('Missing required fields');
      } else if (response.status === 409) {
        setMessage('User already exists');
      }
    } catch (error) {
      setMessage('Failed to create account. Please try again.');
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {' '}
            {message && <div>{message}</div>}{' '}
            <label htmlFor="user-name">Name</label>
            <input
              type="text"
              id="user-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />{' '}
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
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
