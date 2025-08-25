import Axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'bootstrap';
import { useEffect } from 'react';

import { updateUser } from '../../state/authSlice';
import ShowPasswordInput from '../ShowPasswordInput/ShowPasswordInput';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const EditUserDetails = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const backendLink = import.meta.env.VITE_APP_API_URL;
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(null);
  const [newMail, setNewMail] = useState(null);

  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [errMsgPassword, setErrMsgPassword] = useState(null);
  const [pwVisibility, setPwVisibility] = useState(false);

  const validatePassword = (pw1, pw2) => {
    if (pw1 !== pw2) {
      setErrMsgPassword(
        <div className="errMsgPassword">
          Please make sure both password fields are the same.
        </div>
      );
      return false;
    } else {
      setErrMsgPassword(null);
    }
    return true;
  };

  const handleSave = async () => {
    if (!validatePassword(password, password2)) {
      return;
    }

    const updateData = {};
    if (newName) updateData.name = newName;
    if (newMail) updateData.email = newMail;
    if (password) updateData.password = password;

    try {
      const response = await Axios.patch(
        `${backendLink}/users/update/${userid}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const { name, email } = response.data.userDataUpdated;

        dispatch(updateUser({ name, email }));
        const modal = new Modal(document.getElementById('saveAlertModal'));
        modal.show();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePwVisibility = (data) => {
    setPwVisibility(data);
  };

  return (
    <div className="form-grid editing-profile-div">
      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-grow-1">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            id="form-name"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-name">
            Your Name
          </label>
        </div>
        <i
          className="info-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="your name can only be updated once every 3 months"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      </div>

      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setNewMail(e.target.value)}
            type="email"
            id="form-email"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-email">
            Your Email
          </label>
        </div>
        <i
          className="info-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="your mail can only be updated once every 6 months"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      </div>

      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={pwVisibility ? 'text' : 'password'}
            id="form-password"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-password">
            New password
          </label>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setPassword2(e.target.value)}
            type={pwVisibility ? 'text' : 'password'}
            id="form-repeat-pw"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-repeat-pw">
            Repeat your new password
          </label>
        </div>
      </div>
      <ShowPasswordInput onDataChange={handlePwVisibility} />

      {errMsgPassword}

      <button className="btn btn-dark" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditUserDetails;
