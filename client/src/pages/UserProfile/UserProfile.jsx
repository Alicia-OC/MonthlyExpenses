import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'bootstrap';
import { useEffect } from 'react';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import RecentCardWidget from '../../components/cardWidget/RecentCardWidget';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
    console.log(token) ;

  const userAvatar = user?.avatar;

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(null);
  const [newMail, setNewMail] = useState(null);

  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [errMsgPassword, setErrMsgPassword] = useState(null);

  const [userExpenses, setUserExpenses] = useState('loading');
  const [userSavings, setUserSavings] = useState('loading');
  const [userIncome, setUserIncome] = useState('loading');

  useEffect(() => {
    if (user?.dataByYear?.[0]) {
      setUserExpenses(user.dataByYear[0].expenses || 'loading');
      setUserSavings(user.dataByYear[0].savings || 'loading');
      setUserIncome(user.dataByYear[0].income || 'loading');
    }
  }, [user]);

  const handlePasswordChange = () => {
    setEditMode(!editMode);
  };

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

    setEditMode(false);

    const modal = new Modal(document.getElementById('saveAlertModal'));
    modal.show();

    try {
      const response = await axios.patch(
        `http://localhost:3030/users/${id}/update`,
        {
          token: token,
          userId: id,
          name: newName,
          email: newMail,
          password: password,
        }
      );
      if (response.status === 200) {
        const { name, email } = response.data;
        dispatch(setLogin({ name, email }));
        modal.show();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ifNotEditMode = () => {
    if (!editMode) {
      return (
        <>
          <div>
            <p>
              <label className="font-semibold ">Name: </label>
              <span className="font-italic"> {user?.name || 'Undefined'}</span>
            </p>
            <p>
              <label className="font-semibold ">Mail: </label>
              <span className="font-italic"> {user?.email || 'Undefined'}</span>
            </p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="name" className="font-semibold">
                Name:
              </label>
              <span className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <i
                  className="info-warning"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="your name can only be updated once every 3 months"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </i>
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="mail" className="font-semibold">
                Mail:
              </label>
              <span className="input-wrapper">
                <input
                  id="mail"
                  type="text"
                  onChange={(e) => setNewMail(e.target.value)}
                />
                <i
                  className="info-warning"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="your mail can only be updated once every 6 months"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </i>
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="password1">New password:</label>
              <span className="input-wrapper">
                <input
                  id="password1"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="password2">Repeat new password:</label>
              <span className="input-wrapper">
                <input
                  id="password2"
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </span>
            </div>
            {errMsgPassword}

            <button className="btn btn-dark" onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      );
    }
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = new Date().getUTCMonth();
  return (
    <>
      <Container>
        <FontAwesomeIcon icon={faPenToSquare} />
        <div
          className="modal fade"
          id="saveAlertModal"
          tabIndex="-1"
          aria-labelledby="saveAlertLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="saveAlertLabel">
                  Success
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Changes have been saved successfully!
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5 h-100">
          <div className="col col-lg-9 col-xl-12">
            <div className="card">
              <div className="rounded-top text-white justify-content-center d-flex flex-row">
                <div className=" mt-5 d-flex flex-column">
                  <Image
                    src={userAvatar}
                    style={{ width: '400px' }}
                    className="img-fluid img-thumbnail mt-6 mb-2"
                    alt="User avatar"
                  />

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-dark"
                    data-mdb-ripple-color="dark"
                    onClick={handlePasswordChange}
                  >
                    {!editMode
                      ? 'Edit profile or password'
                      : 'Exit editing mode'}
                  </button>
                </div>
              </div>

              <div className="savings-div  p-4 text-black bg-body-tertiary">
                {' '}
                <h4>{months[currentMonth]} finances</h4> <ExpensesSummary />
              </div>

              <div className="card-body p-4 text-black">
                <div className="text-body">
                  <div className="p-4 bg-body-tertiary">{ifNotEditMode()}</div>
                </div>
              </div>
              <RecentCardWidget />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
