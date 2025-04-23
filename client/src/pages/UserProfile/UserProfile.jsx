import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import avatar from '../../assets/Anya.png';

const UserProfile = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <FontAwesomeIcon icon={faPenToSquare} />
        <div className="container py-5 h-100">
            <div className="col col-lg-9 col-xl-12">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row">
                  <div className="ms-4 mt-5 d-flex flex-column">
                    <Image
                      src={avatar}
                      style={{ width: '400px' }}

                      className="img-fluid img-thumbnail mt-6 mb-2"
                      alt={avatar}
                    />
    
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-dark text-body"
                      data-mdb-ripple-color="dark"
                    >
                      Edit profile
                    </button>
                  </div>
                  <div className="ms-3">
                    <h5>Alicia</h5>
                  </div>
                </div>
                <div className="p-4 text-black bg-body-tertiary">
                  <div className="d-flex justify-content-end text-center py-1 text-body">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">
                        yearly money saved
                      </p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">
                        yearly money spent
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">
                        yearly money earnt
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5  text-body">
                    <div className="p-4 bg-body-tertiary">
                      <p>
                        <label className="font-semibold mr-1">Name: </label>
                        <span className="font-italic"> Alicia</span>
                      </p>
                      <p>
                        <label className="font-semibold mr-1">Mail: </label>
                        <span className="font-italic"> Web Developer</span>
                      </p>
                      <p>
                        <label className="font-semibold mr-1">Password: </label>
                        <span className="font-italic"> password</span>
                      </p>{' '}
                    </div>
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
                      <h3>card 1</h3>
                    </div>
                    <div className="col mb-2">
                      <h3>card 2</h3>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <h3>card 3</h3>
                    </div>
                    <div className="col">
                      <h3>card 4</h3>
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
