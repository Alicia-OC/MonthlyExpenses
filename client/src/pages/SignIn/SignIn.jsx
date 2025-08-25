import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLogin } from '../../state/authSlice';
import ShowPasswordInput from '../../components/ShowPasswordInput/ShowPasswordInput';

const SignIn = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwVisibility, setPwVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePwVisibility = (data) => {
    setPwVisibility(data);
  };

  return (
    <>
      <section className="">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body ">
                <div className="row justify-content-center">
                  <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">
                    Sign in
                  </p>
                  <p className="error-message text-center p fw-bold mb-3 mx-1 mx-md-4 mt-2">
                    {' '}
                    {message}
                  </p>

                  <form className="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-floating flex-fill mb-0">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          id="form-email"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form-email">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-floating flex-fill mb-0">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>

                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type={pwVisibility ? 'text' : 'password'}
                          id="form-pw"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form-pw">
                          Password
                        </label>
                      </div>
                    </div>

                    <ShowPasswordInput onDataChange={handlePwVisibility} />

                    <div>
                      <button
                        onClick={handleSubmit}
                        className="btn btn-dark"
                        type="submit"
                        disabled={isLoading}
                      >
                        Sign in
                      </button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                      You don't have an account?{' '}
                      <a href="/signup" className="fw-bold text-body">
                        <u>Create one here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
