import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLogin } from '../../state/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('dasd');

    try {
      const response = await axios.post(`http://localhost:3000/auth/signin`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        dispatch(setLogin({ token, user }));
        
        console.log(token, user);
        //window.location.replace('/');
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
      <section className="">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body ">
                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  {' '}
                  {message && <div>{message}</div>}
                  <label htmlFor="email">Your Email</label>
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
                    <button className="btn btn-dark" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
