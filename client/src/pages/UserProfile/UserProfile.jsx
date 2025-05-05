import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'bootstrap';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import avatar from '../../assets/Anya.png';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);

  const [editMode, setEditMode] = useState(false);

  const userName = user?.name || 'Undefined';
  const handlePasswordChange = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);

    const modal = new Modal(document.getElementById('saveAlertModal'));
    modal.show();
  };

  const ifNotEditMode = () => {
    if (!editMode) {
      return (
        <>
          <div>
            <p>
              <label className="font-semibold mr-1">Name: </label>
              <span className="font-italic"> {user?.name || 'Undefined'}</span>
            </p>
            <p>
              <label className="font-semibold mr-1">Mail: </label>
              <span className="font-italic"> {user?.email || 'Undefined'}</span>
            </p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <p>
              <label className="font-semibold mr-1">Name: </label>
              <span className="font-italic">
                {' '}
                <input type="text"></input>
              </span>
              <i className="info-warning"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="your name can only be updated once every 3 months">
                {' '}
                <FontAwesomeIcon icon={faCircleInfo} />
              </i>
            </p>
            <p>
              <label className="font-semibold mr-1">Mail: </label>
              <span className="font-italic">
                {' '}
                <input type="text"></input>
              </span>
              <i
                className="info-warning"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="your mail can only be updated once every 6 months"
              >
                {' '}
                <FontAwesomeIcon icon={faCircleInfo} />
              </i>
            </p>
            <p>
              {' '}
              <label>New password</label>
              <span>
                <input type="password"></input>
              </span>
            </p>
            <p>
              {' '}
              <label>Repeat new password</label>
              <span>
                <input type="password"></input>
              </span>
            </p>
            <button className="btn btn-dark" onClick={handleSave}>
              Save
            </button>{' '}
          </div>
        </>
      );
    }
  };

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
              <div className="rounded-top text-white d-flex flex-row">
                <div className="ms-4 mt-5 d-flex flex-column">
                  <Image
                    src={avatar}
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
                      ? 'Update profile or password'
                      : 'Exit editing mode'}
                  </button>
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">yearly money saved</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">yearly money spent</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">yearly money earnt</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5  text-body">
                  <div className="p-4 bg-body-tertiary">{ifNotEditMode()}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent Cards</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      See all
                    </a>
                  </p>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <h3 id={user?.cards[0].id}>
                      {user?.cards[0].month || 'card 1'}
                    </h3>
                  </div>
                  <div className="col mb-2">
                    <h3 id={user?.cards[1].id}>
                      {user?.cards[1].month || 'card 2'}
                    </h3>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                    <h3 id={user?.cards[2].id}>
                      {user?.cards[2].month || 'card 3'}
                    </h3>
                  </div>
                  <div className="col">
                    <h3 id={user?.cards[3].id}>
                      {user?.cards[3].month || 'card 4'}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
