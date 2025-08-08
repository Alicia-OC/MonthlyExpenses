import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import GetMonth from '../../components/GetMonth/GetMonth';

import './css/index.css';

const CardsLibrary = () => {
  const backendLink = import.meta.env.VITE_APP_GETCARD;
  const user = useSelector((state) => state.user);

  const userid = user._id;
  const token = useSelector((state) => state.token);
  const currency = useSelector((state) => state.currency);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const cardsPerPage = 4;

  const paginationData = useMemo(() => {
    if (!allCards || allCards.length === 0) {
      return {
        currentCards: [],
        totalPages: 0,
        indexOfFirstCard: 0,
        indexOfLastCard: 0,
      };
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allCards
      .slice(indexOfFirstCard, indexOfLastCard)
      .reverse();
    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    return {
      currentCards,
      totalPages,
      indexOfFirstCard,
      indexOfLastCard,
    };
  }, [allCards, currentPage, cardsPerPage]);

  const { currentCards, totalPages } = paginationData;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getCardsData = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(`${backendLink}/${userid}/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllCards(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCardsData();
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
          allCards &&
          currentCards.map((item) => (
            <div className="col" key={item.id}>
              <div className="card">
                <div className="card-body" data-testid={item.id}>
                  <a
                    className="card-go-to-title"
                    href={`/${userid}/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h5 className="card-title">
                      <GetMonth cardMonth={item.month} />
                    </h5>
                  </a>

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
