import { useSelector } from 'react-redux';

const RecentCardWidget = () => {
  const user = useSelector((state) => state.user); //
  const userId = useSelector((state) => state.userId);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 text-body">
        <p className="lead fw-normal mb-0">Recent Cards</p>
        <p className="mb-0">
          <a className="see-all-link" href={`/${user?.id}/cards`}>
            See all
          </a>
        </p>
      </div>

      <div>
        <div className="row g-2">
          <div className="col mb-2">
            <p id={user?.cards[0].id}>
              {' '}
              <a
                data-testid="card-month-display"
                className="widget-card-link"
                href={`/${userId}/${user?.cards[0].id || 'not found'} `}
              >
                {' '}
                {user?.cards[0].month || 'card 1'}
              </a>
            </p>
          </div>
          <div className="col mb-2">
            <p id={user?.cards[1].id}>
              <a
                className="widget-card-link"
                href={`/${userId}/${user?.cards[1].id || 'not found'} `}
              >
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
              <a
                className="widget-card-link"
                href={`/${userId}/${user?.cards[2].id || 'not found'}`}
              >
                {' '}
                {user?.cards[2].month || 'card 3'}
              </a>
            </p>
          </div>
          <div className="col">
            <p id={user?.cards[3].id}>
              {' '}
              <a
                className="widget-card-link"
                href={`/${userId}/${user?.cards[3].id || 'not found'}`}
              >
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

export default RecentCardWidget;
