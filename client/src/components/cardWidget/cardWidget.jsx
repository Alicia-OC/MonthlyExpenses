import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CardWidget = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const cards = useSelector((state) => state.user.cards);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 text-body">
        <p className="lead fw-normal mb-0">Recent Cards</p>
        <p className="mb-0">
          <a className="see-all-link" href="/:userId/cards">
            See all
          </a>
        </p>
      </div>
     
      <div>
        <div className="row g-2">
          <div className="col mb-2">
            <p id={user?.cards[0].id}>
              {' '}
              <a className="widget-card-link" href={user?.cards[0].id}>
                {' '}
                {user?.cards[0].month || 'card 1'}
              </a>
            </p>
          </div>
          <div className="col mb-2">
            <p id={user?.cards[1].id}>
              <a className="widget-card-link" href={user?.cards[1].id}>
                {' '}
                {user?.cards[1].month || 'card 2'}
              </a>
            </p>
          </div>
        </div>
        <div className="row g-2">
          <div className="col">
            <p id={user?.cards[2].id}>
              {' '}
              <a className="widget-card-link" href={user?.cards[2].id}>
                {' '}
                {user?.cards[2].month || 'card 3'}
              </a>
            </p>
          </div>
          <div className="col">
            <p id={user?.cards[3].id}>
              {' '}
              <a className="widget-card-link" href={user?.cards[3].id}>
                {' '}
                {user?.cards[3].month || 'card 4'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWidget;
