import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'bootstrap';
import { useEffect } from 'react';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import avatar from '../../assets/Anya.png';
import RecentCardWidget from '../../components/cardWidget/RecentCardWidget';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const userAvatar = avatar || user?.avatar;

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [defaultItemsEditMode, setDefaultItemsEditMode] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newMail, setNewMail] = useState(null);

  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [errMsgPassword, setErrMsgPassword] = useState(null);

  const [userExpenses, setUserExpenses] = useState('loading');
  const [userSavings, setUserSavings] = useState('loading');
  const [userIncome, setUserIncome] = useState('loading');

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

  useEffect(() => {
    if (user?.dataByYear?.[0]) {
      setUserExpenses(user.dataByYear[0].expenses || 'loading');
      setUserSavings(user.dataByYear[0].savings || 'loading');
      setUserIncome(user.dataByYear[0].income || 'loading');
    }
  }, [user]);

  const handleProfileEditingMode = () => {
    setProfileEditMode(!profileEditMode);
  };

  const handleDefaultItemsEditingMode = () => {
    setDefaultItemsEditMode(!defaultItemsEditMode);
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
    console.log('name' + newName, 'mail' + newName);
    setProfileEditMode(false);

    const modal = new Modal(document.getElementById('saveAlertModal'));
    modal.show();

    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${id}/update`,
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

  const dynamicBlock = () => {
    if (!profileEditMode && !defaultItemsEditMode) {
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
    } else if (profileEditMode) {
      return (
        <>
          <div className="form-grid">
            <div className="d-flex flex-row align-items-center ">
              <div className="form-floating flex-fill mb-0">
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
                  type="password"
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
                  type="password"
                  id="form-repeat-pw"
                  className="form-control"
                />
                <label className="form-label" htmlFor="form-repeat-pw">
                  Repeat your new password
                </label>
              </div>
            </div>

            {errMsgPassword}

            <button className="btn btn-dark" onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      );
    } else if (defaultItemsEditMode) {
      return 'Work in progress...';
    }
  };

  return (
    <>
      <Container className="">
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

        <div className=" h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card">
              <div className="card-body ">
                <div className=" text-white justify-content-center d-flex flex-row">
                  <div className=" mt-3 d-flex flex-column">
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
                      onClick={handleProfileEditingMode}
                    >
                      {!profileEditMode
                        ? 'Edit profile or password'
                        : 'Exit editing mode'}
                    </button>

                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      onClick={handleDefaultItemsEditingMode}
                    >
                      {!defaultItemsEditMode
                        ? 'Set your default monthly expenses'
                        : 'Go back to your Profile'}
                    </button>
                  </div>
                </div>

                <div className=" savings-div  ">
                  <h4 className="month-finances-h">
                    {months[currentMonth]} finances
                  </h4>
                  <ExpensesSummary />
                </div>

                <div className="">
                  <div className="text-body">
                    <div className="">{dynamicBlock()}</div>
                  </div>
                </div>
                <RecentCardWidget />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
