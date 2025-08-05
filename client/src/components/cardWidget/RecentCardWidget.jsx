import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setLastFourCards } from '../../state/authSlice';
import axios from 'axios';

const RecentCardWidget = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user); //
  const userId = useSelector((state) => state.userId);
  const backendLink = import.meta.env.VITE_APP_GETCARD;

  const token = useSelector((state) => state.token);
  const cards = useSelector((state) => state.lastFourCards);

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

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendLink}/cards/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setLastFourCards(response.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);
    console.log(cards)

  return (
    <>
      {' '}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4 text-body">
          <p className="lead fw-normal mb-0">Recent Cards</p>
        </div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && cards && (
          <div>
            <div className="row g-2">
              {cards.slice(0, 2).map((card, index) => (
                <div key={card.id} className="col mb-2">
                  <p id={card.id}>
                    <a
                      className="widget-card-link"
                      href={`/${userId}/${card.id}`}
                    >
                      {months[card.month] || `Card ${index + 1}`}
                    </a>
                  </p>
                </div>
              ))}
            </div>
            <div className="row g-2">
              {cards.slice(2, 4).map((card, index) => (
                <div key={card.id} className="col mb-2">
                  <p id={card.id}>
                    <a
                      className="widget-card-link"
                      href={`/${userId}/${card.id}`}
                    >
                      {months[card.month] || `Card ${index + 1}`}
                    </a>
                  </p>
                </div>
              ))}
            </div>

            <p className="mb-0">
              <a className="see-all-link" href={`/${user?.id}/cards`}>
                See all
              </a>
            </p>
          </div>
        )}

        {!isLoading && (!cards || cards.length === 0) && (
          <div>No cards found</div>
        )}
      </div>
    </>
  );
};

export default RecentCardWidget;
