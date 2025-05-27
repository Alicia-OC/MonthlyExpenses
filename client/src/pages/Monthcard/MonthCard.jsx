import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Axios from 'axios';

const MonthCard = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);

  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState();

  const { cardId } = useParams();

  const cardInScope = async () => {
    try {
      setIsLoading(true);

      const res = await Axios.get(
        `${import.meta.env.VITE_APP_GETCARD}/${userId}/${cardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCard(res.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      cardInScope();
    }
  }, [userId, token]);

  const mockCard = {
    cardId: 'dasds',
    year: 2024,
    month: 2,
    totalExpenses: 1200,
    totalIncome: 1600,
    totalSavings: 400,
    fixedItems: [
      {
        description: 'rent+bills+food',
        amount: 605,
        date: new Date('2025-02-01'),
      },
    ],
    subscriptionItems: [
      {
        description: 'HBO',
        amount: 4.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'Amazon no ads',
        amount: 1.99,
        date: new Date('2025-02-01'),
      },
    ],
    otherItems: [
      {
        description: 'print label + adhesive',
        amount: 2.56,
        category: '67a91f012213777227c723ca',
        date: new Date('2025-02-01'),
      },
      {
        description: 'Decathlon',
        amount: 76,
        category: '67a91f012213777227c723cb',
        date: new Date('2025-02-01'),
      },
    ],
    transportItems: [
      {
        description: 'cabify',
        amount: 6.98,
        category: '67a91f012213777227c723cb',

        date: new Date('2025-02-01'),
      },
    ],

    groceriesItems: [
      {
        description: 'cinnamon oreo',
        amount: 4.99,
        category: '67a91f012213777227c723cb',

        date: new Date(),
      },
    ],
    fixedExpenses: 9,
    subscriptionExpenses: 9,
    otherExpenses: 9,
    transportExpenses: 9,
    groceriesExpenses: 4.99,
  };

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

  return (
    <>
      {' '}
      <div className="d-flex justify-content-between align-items-center mb-4 text-body"></div>
      <Container>
        <Card>
          <h2>{months[mockCard.month]}</h2>
          <div class="container text-center">
            <div class="row">
              <div class="col">1 of 2</div>
              <div class="col">2 of 2</div>
            </div>
            <div class="row">
              <div class="col">1 of 2</div>
              <div class="col">2 of 2</div>
            </div>
          </div>
        </Card>
        <div className="container py-5 h-100">
          {isLoading ? 'Loading...' : 'Not loading'}
        </div>
      </Container>
    </>
  );
};

export default MonthCard;
