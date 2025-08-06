import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import './css/index.css';
import mockCard from '../EditingCard/mockCard';

import {
  ItemsExpenseList,
  CategorySection,
} from '../../components/ExpensesBlocks/ExpensesBlocks';

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
      <div className="d-flex justify-content-between align-items-center mb-4 text-body"></div>
      <Container>
        <div className="container py-5 h-100">
          <Card className="month-card-component col-12 col-md-6 col-lg-4">
            {card && !isLoading && (
              <>
                {' '}
                <h2>{card && months[card.month - 1]}</h2>
                <div className="savings-div p-4 text-black bg-body-tertiary">
                  <ExpensesSummary />
                </div>{' '}
                <div className="p-3 month-card-container">
                  <div className="multi-column">
                    {card && (
                      <>
                        <div
                          className="month-card-h5"
                          key={`${card.fixedItems.name}-title`}
                        >
                          <h5>{card.fixedItems.name}</h5>
                          {card.fixedItems.items.map((item, index) => (
                            <div
                              className="item mb-3 month-card-body multi-column"
                              key={`${card.fixedItems.name}`}
                            >
                              <ul className="list-unstyled month-card-item">
                                <li className="month-card-item-description">
                                  {item.description}
                                </li>
                                <li className="month-card-item-money">
                                  {item.price} {currency}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div
                          className="month-card-h5"
                          key={`${card.subscriptionItems.name}-title`}
                        >
                          <h5>{card.subscriptionItems.name}</h5>
                          {card.subscriptionItems.items.map((item, index) => (
                            <div
                              className="item mb-3 month-card-body multi-column"
                              key={`${card.subscriptionItems.name}`}
                            >
                              <ul className="list-unstyled month-card-item">
                                <li className="month-card-item-description">
                                  {item.description}
                                </li>
                                <li className="month-card-item-money">
                                  {item.price} {currency}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div
                          className="month-card-h5"
                          key={`${card.otherItems.name}-title`}
                        >
                          <h5>{card.otherItems.name}</h5>
                          {card.otherItems.items.map((item, index) => (
                            <div
                              className="item mb-3 month-card-body multi-column"
                              key={`${card.otherItems.name}`}
                            >
                              <ul className="list-unstyled month-card-item">
                                <li className="month-card-item-description">
                                  {item.description}
                                </li>
                                <li className="month-card-item-money">
                                  {item.price} {currency}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div
                          className="month-card-h5"
                          key={`${card.transportItems.name}-title`}
                        >
                          <h5>{card.transportItems.name}</h5>
                          {card.transportItems.items.map((item, index) => (
                            <div
                              className="item mb-3 month-card-body multi-column"
                              key={`${card.transportItems.name}`}
                            >
                              <ul className="list-unstyled month-card-item">
                                <li className="month-card-item-description">
                                  {item.description}
                                </li>
                                <li className="month-card-item-money">
                                  {item.price} {currency}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div
                          className="month-card-h5"
                          key={`${card.foodItems.name}-title`}
                        >
                          <h5>{card.foodItems.name}</h5>
                          {card.foodItems.items.map((item, index) => (
                            <div
                              className="item mb-3 month-card-body multi-column"
                              key={`${card.foodItems.name}`}
                            >
                              <ul className="list-unstyled month-card-item">
                                <li className="month-card-item-description">
                                  {item.description}
                                </li>
                                <li className="month-card-item-money">
                                  {item.price} {currency}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </Container>
    </>
  );
};

export default MonthCard;
