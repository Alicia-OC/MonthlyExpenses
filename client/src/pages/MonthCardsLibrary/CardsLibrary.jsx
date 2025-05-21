import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';

const CardsLibrary = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
  const cards = user?.cards;

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

  const testCardsUI = currentCards.map((item) => (
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">item</h5>
          <p class="card-text">
            You have spent X {currency} in groceries, X {currency} in
            subscriptions, X {currency} in transport, X {currency} in misc.
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div class="row row-cols-1 row-cols-md-2 g-4 justify-content-around align-items-center">
        {testCardsUI}{' '}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <button
          style={{ margin: '0 1rem' }}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {currentPage - 1}
        </button>

        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          style={{ margin: '0 1rem' }}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {currentPage + 1}
        </button>

        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <Pagination>
        <Pagination.First
          onClick={(e) => {
            setCurrentPage(1);
          }}
        />
        <Pagination.Prev onClick={prevPage} />
        <Pagination.Ellipsis />

        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Item>{currentPage + 1}</Pagination.Item>
        <Pagination.Item>{currentPage + 2}</Pagination.Item>
        <Pagination.Item>{currentPage + 3}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{totalPages}</Pagination.Item>

        <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
        <Pagination.Last
          onClick={(e) => {
            setCurrentPage(totalPages);
          }}
        />
      </Pagination>
    </>
  );
};

export default CardsLibrary;
