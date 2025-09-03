import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import GetMonth from '../../components/GetMonth/GetMonth';

import './css/index.css';

const CardsLibrary = () => {
  const navigate = useNavigate();

  const backendLink = import.meta.env.VITE_APP_GETCARD;
  const user = useSelector((state) => state.user);

  const userid = user?._id;
  const token = useSelector((state) => state.token);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [groupCards, setGroupCards] = useState([]);
  
  const [selectedYear, setSelectedYear] = useState(2025);

  /**PAGINATION */
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
  /**PAGINATION */


  const fetchCardsByYear = async (year) => {
    setIsLoading(true);
    console.log('first fetch');
    try {
      const res = await Axios.get(`${backendLink}/${userid}/${year}/cards`, {
        params: { year: year },
        headers: { Authorization: `Bearer ${token}` },
      });

      
      setAllCards(res.data.cards);
      setGroupCards(res.data.groupCards);

      setSelectedYear(year);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    fetchCardsByYear(selectedYear);
  };

  const summaryWidget = (
    <>
      <select
        id="card-year-dropdown"
        className="card-year-dropdown"
        onChange={handleYearChange}
      >
        {Object.keys(groupCards)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))
          .reverse()}
      </select>
      {allCards.map((card) => (
        <div key={card.id} className="card-item">
          <a
            href={`/${userid}/${card.id}`}
            className="card-go-to-title small"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GetMonth cardMonth={card.month} />
          </a>
        </div>
      ))}
    </>
  );

  useEffect(() => {
    fetchCardsByYear(2025);
  }, []);


  const handleCardClick = (cardid) => {
    navigate(`/${userid}/${cardid}`);
  };
  return (
    <>
      <div className="container py-5 h-100 ">
        <div className="filtering-cards-div col row-cols-1 g-4 justify-content-around align-items-center">
          <div className="card left-aligned-content summary-columns">
            <div className="summary-responsive ">{summaryWidget}</div>
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
                <div
                  className="card card-summary-div"
                  onClick={(e) => handleCardClick(item.id)}
                >
                  <div className="card-body" data-testid={item.month}>
                    <h5 className="card-title">
                      <GetMonth cardMonth={item.month} /> {item.year}
                    </h5>

                    <p className="card-text">
                      You have spent{' '}
                      <boldd>
                        {item.foodExpenses} {item.currency}{' '}
                      </boldd>
                      in groceries, {item.subscriptionExpenses} {item.currency}{' '}
                      in subscriptions, {item.transportExpenses} {item.currency}{' '}
                      in transport, {item.otherExpenses} {item.currency} and in
                      misc!
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
      </div>
    </>
  );
};

export default CardsLibrary;
