import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';

import GetMonth from '../../components/GetMonth/GetMonth';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import ExpenseInputFields from '../../components/addExpenseInline/ExpenseInputFields';

import './css/index.css';

const backendLink = import.meta.env.VITE_APP_GETCARD;

const EditingCard = () => {
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
  const [expenseBlocks, setExpenseBlocks] = useState([]);
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getCard = async () => {
    setIsLoading(true);

    try {
      const res = await Axios.get(`${backendLink}/${userId}/cards/last-card`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCard(res.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCard();
  }, [userId, token]);

  useEffect(() => {
    if (card) {
      setExpenseBlocks([
        { name: card.fixedItems.name, items: card.fixedItems.items },
        {
          name: card.subscriptionItems.name,
          items: card.subscriptionItems.items,
        },
        { name: card.otherItems.name, items: card.otherItems.items },
        {
          name: card.transportItems.name,
          items: card.transportItems.items,
        },
        { name: card.foodItems.name, items: card.foodItems.items },
      ]);
    }
  }, [card]);

  const handleAddItem = async (newItemAdded) => {
    const updatedBlocks = expenseBlocks.map((block) =>
      block.name === newItemAdded.category
        ? { ...block, items: [...block.items, newItemAdded] }
        : block
    );
    setExpenseBlocks(updatedBlocks);

    try {
      const updateData = {};
      updatedBlocks.forEach((block, index) => {
        switch (block.name) {
          case 'The Non-negotiables':
            updateData.fixedItems = block.items;
            break;
          case 'On Repeat':
            updateData.subscriptionItems = block.items;
            break;
          case 'Little Life Things':
            updateData.otherItems = block.items;
            break;
          case 'Out & About':
            updateData.transportItems = block.items;
            break;
          case 'Bits & Bites':
            updateData.foodItems = block.items;
            break;
        }
      });

      const res = await Axios.patch(
        `${backendLink}/update/${userId}/${card._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedCard = res.data;
      setCard(updatedCard);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const handleDeleteItem = async (e, blockName, indexToDelete) => {
    const updatedBlocks = expenseBlocks.map((block) =>
      block.name === blockName
        ? {
            ...block,
            items: block.items.filter((_, index) => index !== indexToDelete),
          }
        : block
    );

    setExpenseBlocks(updatedBlocks);

    try {
      const updateData = {};

      updatedBlocks.forEach((block, index) => {
        switch (block.name) {
          case 'The Non-negotiables':
            updateData.fixedItems = block.items;
            break;
          case 'On Repeat':
            updateData.subscriptionItems = block.items;
            break;
          case 'Little Life Things':
            updateData.otherItems = block.items;
            break;
          case 'Out & About':
            updateData.transportItems = block.items;
            break;
          case 'Bits & Bites':
            updateData.foodItems = block.items;
            break;
        }
      });

      const res = await Axios.patch(
        `${backendLink}/update/${userId}/${card._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedCard = res.data;
      setCard(updatedCard);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  if (isLoading) {
    return (
      <Container className="month-card-component col-12 col-md-6 col-lg-4">
        <p>Loading...</p>
      </Container>
    );
  }

  if (!card) {
    return (
      <Container className="month-card-component col-12 col-md-6 col-lg-4">
        <p>No card data available</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="card h-100">
        <div className="savings-div p-4 text-black bg-body-tertiary">
          <h2>
            <GetMonth cardMonth={card.month} />
          </h2>
          <ExpensesSummary
            totalExpenses={card.totalExpenses}
            totalIncome={card.totalIncome}
            totalSavings={card.totalSavings}
          />
        </div>
        <div className="month-card-component col-12 col-md-6 col-lg-4">
          <div className="container "> </div>
          <div className="p-3 month-card-container">
            <div className="multi-column ">
              {expenseBlocks.map((group, index) => (
                <>
                  <div className="group-column" key={`${group.name}-name`}>
                    <div className="month-card-h5 ">
                      <h5>{group.name}</h5>
                    </div>
                    {group.items.map((element, index) => (
                      <div
                        className="item mb-3 month-card-body multi-column"
                        key={element.id}
                      >
                        <ul className="list-unstyled month-card-item">
                          <li className="month-card-item-description">
                            {element.description}
                          </li>
                          <li className="month-card-item-money ">
                            {element.price} {currency}
                            <button
                              onClick={(e) =>
                                handleDeleteItem(e, group.name, index)
                              }
                              className="delete-list-item-btn"
                            >
                              <FontAwesomeIcon icon={faMinus} />{' '}
                            </button>
                          </li>
                        </ul>
                      </div>
                    ))}

                    <ExpenseInputFields
                      blockName={group.name}
                      onAdd={(newItemAdded) => handleAddItem(newItemAdded)}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditingCard;
