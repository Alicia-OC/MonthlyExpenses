import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import './css/index.css';
import mockCard from '../EditingCard/mockCard';

import Axios from 'axios';

const MonthCard = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState();
  const [cardBlocksContent, setCardBlocksContent] = useState([]);

  const { cardId } = useParams();
  // Inside your reducer:

  const backendLink = import.meta.env.VITE_APP_GETCARD

  const cardInScope = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(
        `${backendLink}/${userId}/${cardId}`,
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

  const mockCardBlocks = [
    { name: mockCard.fixedItems.name, items: mockCard.fixedItems.items },
    { name: mockCard.subscriptionItems.name, items: mockCard.subscriptionItems.items },
    { name: mockCard.otherItems.name, items: mockCard.otherItems.items },
    { name: mockCard.transportItems.name, items: mockCard.transportItems.items },
    { name: mockCard.foodItems.name, items: mockCard.foodItems.items },
  ];

  useEffect(() => {
    if (userId && token) {
      cardInScope();
    }
  }, [userId, token]);

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
                  <h5>{group.name}</h5>
                </div>
                {group.items.map((item, index) => (
                  <div
                    className="item mb-3 month-card-body multi-column"
                    key={`${group.name}-${index}`}
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
