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
  const currency = useSelector((state) => state.currency);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [groupCards, setGroupCards] = useState([]);

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

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await Axios.get(`${backendLink}/${userid}/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllCards(res.data.cards);
      setGroupCards(res.data.groupCards);
      console.log(res.data.groupCards);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const summaryWidget = () => {
    let result = [];

    Object.keys(groupCards).forEach((year) => {
      // Add year
      result.push(
        <div key={`${year}-header`} className="year-item">
          <strong>{year}</strong>
        </div>
      );

      // Add cards
      groupCards[year].forEach((card) => {
        result.push(
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
        );
      });
    });

    return <div className="summary-responsive ">{result}</div>;
  };

  const handleCardClick = (cardid) => {
    navigate(`/${userid}/${cardid}`);
  };

const cardsLoop = () => {
  return Object.entries(groupCards).flatMap(([year, items]) =>
    [...items].reverse().map((item) => (
      <div className="col" key={item.id}>
        <div
          className="card card-summary-div"
          onClick={() => handleCardClick(item.id)}
        >
          <div className="card-body" data-testid={item.month}>
            <h5 className="card-title">
              <GetMonth cardMonth={item.month} /> {item.year}
            </h5>

            <p className="card-text">
              You have spent{" "}
              <strong>
                {item.foodExpenses} {item.currency}{" "}
              </strong>
              in groceries, {item.subscriptionExpenses} {item.currency} in
              subscriptions, {item.transportExpenses} {item.currency} in
              transport, {item.otherExpenses} {item.currency} and in misc!
            </p>
          </div>
        </div>
      </div>
    ))
  )
}

  return (
    <>
      <div className="container py-5 h-100 ">
        <div className="filtering-cards-div col row-cols-1 g-4 justify-content-around align-items-center">
          <div className="card left-aligned-content summary-columns">
            {summaryWidget()}
          </div>
        </div>
        <div
          style={{ marginTop: '0.05rem' }}
          className="row row-cols-1 row-cols-md-2 g-4 justify-content-around align-items-center"
        >
          {isLoading && <div>Loading...</div>}
          {!isLoading && allCards && cardsLoop()}
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
