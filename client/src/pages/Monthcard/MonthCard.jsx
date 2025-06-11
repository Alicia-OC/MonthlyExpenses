import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import './css/index.css';

import Axios from 'axios';

const MonthCard = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState();
  const [cardBlocksContent, setCardBlocksContent] = useState([]);

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
      setCardBlocksContent([
        res.data.fixedItems,
        res.data.subscriptionItems,
        res.data.otherItems,
        res.data.transportItems,
        res.data.groceriesItems,
      ]);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {
        description: 'HBO',
        amount: 4.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'HBO',
        amount: 4.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'HBO',
        amount: 4.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'HBO',
        amount: 4.99,
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
  const mockCardBlocks = [
    { title: 'The Non-Negotiables', items: mockCard.fixedItems },
    { title: 'On Repeat', items: mockCard.subscriptionItems },
    { title: 'Little Life Things', items: mockCard.otherItems },
    { title: 'Out & About', items: mockCard.transportItems },
    { title: 'Bits & Bites', items: mockCard.groceriesItems },
  ];

  useEffect(() => {
    if (userId && token) {
      cardInScope();
    }
  }, [userId, token]);

  const fixedItems = mockCard.fixedItems;
  const subscriptionItems = mockCard.subscriptionItems;
  const otherItems = mockCard.otherItems;
  const transportItems = mockCard.transportItems;
  const groceriesItems = mockCard.groceriesItems;

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

  const table_v2 = (
    <div className=" p-3 month-card-container">
      <div className="multi-column">
        <div className="month-card-h5">
          <h5>The Non-Negotiables</h5>
        </div>
        {fixedItems.map((item, index) => (
          <div className="item mb-3 month-card-body multi-column">
            <ul className="list-unstyled month-card-item">
              <li
                className="month-card-item-description "
                key={`${item.description}-${index}`}
              >
                {item.description}
              </li>
              <li className="month-card-item-money " key={item.description}>
                {item.amount} {currency}
              </li>
            </ul>
          </div>
        ))}
        <div className="month-card-h5">
          <h5>On Repeat</h5>
        </div>
        {subscriptionItems.map((item, index) => (
          <div className="item mb-3 month-card-body multi-column">
            <ul className="list-unstyled month-card-item">
              <li
                className="month-card-item-description "
                key={`${item.description}-${index}`}
              >
                {item.description}
              </li>
              <li className="month-card-item-money " key={item.description}>
                {item.amount} {currency}
              </li>
            </ul>
          </div>
        ))}
        <div className="month-card-h5">
          {' '}
          <h5> Little Life Things</h5>{' '}
        </div>
        {otherItems.map((item, index) => (
          <div className="item mb-3 month-card-body multi-column">
            <ul className="list-unstyled">
              <li
                className="month-card-item-description "
                key={`${item.description}-${index}`}
              >
                {item.description}
              </li>
              <li className="month-card-item-money " key={item.description}>
                {item.amount} {currency}
              </li>
            </ul>
          </div>
        ))}{' '}
        <div className="month-card-h5">
          <h5> Out & About</h5>{' '}
        </div>
        {transportItems.map((item, index) => (
          <div className="item mb-3 month-card-body multi-column">
            <ul className="list-unstyled">
              <li
                className="month-card-item-description "
                key={`${item.description}-${index}`}
              >
                {item.description}
              </li>
              <li className="month-card-item-money " key={item.description}>
                {item.amount} {currency}
              </li>
            </ul>
          </div>
        ))}{' '}
        <div className="month-card-h5">
          <h5> Bits & Bites</h5>{' '}
        </div>
        {groceriesItems.map((item, index) => (
          <div className="item mb-3 month-card-body multi-column">
            <ul className="list-unstyled">
              <li
                className="month-card-item-description "
                key={`${item.description}-${index}`}
              >
                {item.description}
              </li>
              <li className="month-card-item-money " key={item.description}>
                {item.amount} {currency}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const contentLoaded = () => {
    return (
      <Card className="month-card-component col-12 col-md-6 col-lg-4">
        {' '}
        <h2>{months[mockCard.month]}</h2>
        <div className="savings-div p-4 text-black bg-body-tertiary">
          <ExpensesSummary />
        </div>
        <div className="container "> </div>
        <div className="p-3 month-card-container">
          <div className="multi-column">
            {mockCardBlocks.map((group) => (
              <>
                <div className="month-card-h5" key={`${group.title}-title`}>
                  <h5>{group.title}</h5>
                </div>
                {group.items.map((item, index) => (
                  <div
                    className="item mb-3 month-card-body multi-column"
                    key={`${group.title}-${index}`}
                  >
                    <ul className="list-unstyled month-card-item">
                      <li className="month-card-item-description">
                        {item.description}
                      </li>
                      <li className="month-card-item-money">
                        {item.amount} {currency}
                      </li>
                    </ul>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      {' '}
      <div className="d-flex justify-content-between align-items-center mb-4 text-body"></div>
      <Container>
        <div className="container py-5 h-100">
          {isLoading ? 'Loading data' : contentLoaded()}
        </div>
      </Container>
    </>
  );
};

export default MonthCard;
