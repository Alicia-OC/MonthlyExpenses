import './css/index.css';

import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';

import Axios from 'axios';

const MonthCard = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
  const backendLink = import.meta.env.VITE_APP_API_URL;
  const { cardId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState();
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

  const cardInScope = async () => {
    setIsLoading(true);

    try {
      const res = await Axios.get(
        `${backendLink}/monthcards/${userId}/${cardId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCard(res.data);
      console.log(res.data);
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

  console.log(card)
  if (isLoading) {
    return (
      <Card className="month-card-component col-12 col-md-6 col-lg-4">
        <p>Loading...</p>
      </Card>
    );
  }

  if (!card) {
    return (
      <Card className="month-card-component col-12 col-md-6 col-lg-4">
        <p>No card data available</p>
      </Card>
    );
  }

  return (
    <>
      <Container>
        <div className="container py-5 h-100">
          <Card className="month-card-component col-12 col-md-6 col-lg-4">
            <>
              <h2>{card && months[card.month - 1]}</h2>
              <div className="savings-div p-4 text-black bg-body-tertiary">
                <ExpensesSummary
                  totalExpenses={card.totalExpenses}
                  totalIncome={card.totalIncome}
                  totalSavings={card.totalSavings}
                  cardCurrency={card.currency}
                />
              </div>{' '}
              <div className="p-3 month-card-container">
                <div className="multi-column">
                  {card && (
                    <>
                      {[
                        card.fixedItems,
                        card.subscriptionItems,
                        card.otherItems,
                        card.transportItems,
                        card.foodItems,
                        card.currency
                      ]
                        .filter(
                          (category) =>
                            category && Array.isArray(category.items)
                        )
                        .map((category) => (
                          <div
                            className="month-card-h5"
                            key={`${category.name}-title`}
                          >
                            <h5>{category.name}</h5>
                            {category.items?.map((item, index) => (
                              <div
                                className="item mb-3 separating-line multi-column"
                                key={`${category.name}-${index}`}
                              >
                                <ul className="list-unstyled month-card-item">
                                  <li className="month-card-item-description">
                                    {item.description}
                                  </li>
                                  <li className="month-card-item-money">
                                    {item.price} { card.currency}
                                  </li>
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default MonthCard;
