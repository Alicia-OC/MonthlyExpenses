import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLastFourCards } from '../../state/authSlice';
import axios from 'axios';

import './css/index.css';

const CardsLibrary = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const currency = useSelector((state) => state.currency);
  const cards = useSelector((state) => state.lastFourCards);
  const backendLink = import.meta.env.VITE_APP_GETCARD;

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


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
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="col row-cols-1 g-4 justify-content-around align-items-center">
        <div className="card ">
          <div className="card-body">
            <p className="card-text">
              Navigation per year/month coming soon...
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: '0.05rem' }}
        className="row row-cols-1 row-cols-md-2 g-4 justify-content-around align-items-center"
      >
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          cards &&
          cards.map((item) => (
            <div className="col" key={item.id}>
              <div className="card">
                <div className="card-body" data-testid={item.id}>
                  <h5 className="card-title">item</h5>
                  <p className="card-text">
                    You have spent {item.foodExpenses} {currency} in groceries,{' '}
                    {item.subscriptionExpenses} {currency} in subscriptions,{' '}
                    {item.transportExpenses} {currency} in transport,{' '}
                    {item.otherExpenses} {currency} and in misc!
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default CardsLibrary;
