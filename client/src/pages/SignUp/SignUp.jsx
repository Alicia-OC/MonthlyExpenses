import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();


  const [message, setMessage] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userObj, setUserObj] = useState({});

  const validateData = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setMessage('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords must match');
      return false;
    } else {
      setMessage('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      name: fullName,
      email: email,
      password: password,
      password2: confirmPassword,
    });

    if (!validateData()) {
      return;
    } else {
      try {
        const response = await axios.post(`http://localhost:3030/auth/signup`, {
          name: fullName,
          email: email,
          password: password,
        });

        if (response.status === 201) {
          navigate('/signin');
        } else if (response.status === 409) {
          setMessage(
            'Email in use, please use a different one or reset your password'
          );
        }
      } catch (error) {
        setMessage('Failed to create account. Please try again.');
      }
    }
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
                    Sign up
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
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          id="form-name"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form-name">
                          Your Name
                        </label>
                      </div>
                    </div>

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
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-floating flex-fill mb-0">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>

                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="form-pw"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form-pw">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-floating flex-fill mb-0">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          id="form-repeat-pw"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form-repeat-pw">
                          Repeat your password
                        </label>
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="show-pw"
                      />
                      <label className="form-check-label" htmlFor="show-pw">
                        Show password
                      </label>
                    </div>

                    <div>
                      <button
                        onClick={handleSubmit}
                        className="btn btn-dark"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                      Have already an account?{' '}
                      <a href="/signin" className="fw-bold text-body">
                        <u>Login here</u>
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

export default SignUp;
