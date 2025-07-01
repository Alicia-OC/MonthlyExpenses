import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons';



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
        setMessage('These email is alreayd in use, please use a different one or reset your password');
      }
    } catch (error) {
      setMessage('Failed to create account. Please try again.');
    }
  };
  return (
    <>
      <section class="" >
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" >
              <div class="card-body ">
                <div class="row justify-content-center">

                  <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">Sign up</p>
                  
                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-floating flex-fill mb-0">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <input type="text" id="form-name" class="form-control" />
                        <label class="form-label" for="form-name">Your Name</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-floating flex-fill mb-0">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <input type="email" id="form-email" class="form-control" />
                        <label class="form-label" for="form-email">Your Email</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-floating flex-fill mb-0">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>

                        <input type="password" id="form-pw" class="form-control" />
                        <label class="form-label" for="form-pw">Password</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-floating flex-fill mb-0">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <input type="password" id="form-repeat-pw" class="form-control" />
                        <label class="form-label" for="form-repeat-pw">Repeat your password</label>
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-4">
                      <input class="form-check-input me-2" type="checkbox" value="" id="show-pw" />
                      <label class="form-check-label" for="show-pw">
                        Show password
                      </label>
                    </div>

                    <div>
                      <button className="btn btn-dark" type="submit">Register</button>
                    </div>

                    <p class="text-center text-muted mt-4 mb-0">Have already an account? <a href="/signin"
                      className="fw-bold text-body"><u>Login here</u></a></p>
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
