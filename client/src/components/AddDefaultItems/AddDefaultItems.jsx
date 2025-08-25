import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Modal } from 'bootstrap';

/**REDUX */
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../state/authSlice';

/**ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import ExpenseInputFields from '../addExpenseInline/ExpenseInputFields';

const AddDefaultItems = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
  const userItems = user?.defaultItems || '';

  const backendLink = import.meta.env.VITE_APP_API_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [defaultItems, setDefaultItems] = useState([]);
  const [income, setIncome] = useState();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setDefaultItems([
      { name: userItems.fixedItems.name, items: userItems.fixedItems.items },
      {
        name: userItems.subscriptionItems.name,
        items: userItems.subscriptionItems.items,
      },
      { name: userItems.otherItems.name, items: userItems.otherItems.items },
      {
        name: userItems.transportItems.name,
        items: userItems.transportItems.items,
      },
      { name: userItems.foodItems.name, items: userItems.foodItems.items },
    ]);
    setIncome(userItems.totalIncome);
    setIsLoading(false);
  }, []);

  const handleAddItem = async (newItemAdded) => {
    const updatedBlocks = defaultItems.map((block) =>
      block.name === newItemAdded.category
        ? { ...block, items: [...block.items, newItemAdded] }
        : block
    );
    setDefaultItems(updatedBlocks);
    setHasUnsavedChanges(true);
  };

  const handleDeleteItem = async (e, blockName, indexToDelete) => {
    const updatedBlocks = defaultItems.map((block) =>
      block.name === blockName
        ? {
            ...block,
            items: block.items.filter((_, index) => index !== indexToDelete),
          }
        : block
    );
    setDefaultItems(updatedBlocks);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    const modal = new Modal(document.getElementById('saveAlertModal'));
    try {
      const updateData = { totalIncome: income };

      const mappedData = defaultItems.forEach((block) => {
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

      Object.assign(updateData, mappedData);
      console.log('Saving data:', updateData);

      const url = `${backendLink}/users/update/${userid}`;

      const res = await Axios.patch(url, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        const { defaultItems, currency, cards } = res.data.userDataUpdated;

        dispatch(updateUser({ defaultItems, currency, cards }));
        modal.show();
        setHasUnsavedChanges(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="default-items-div group-column">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Total Income</h5>
        <input
          className="form-control line-input"
          onChange={(e) => setIncome(e.target.value)}
          value={income}
          type="number"
          style={{ maxWidth: '200px' }}
        />
      </div>
      {defaultItems.map((group, index) => (
        <>
          <div className="default-items-group">
            <h5>{group.name}</h5>
            {group.items.map((element, index) => (
              <div
                className="item mb-3 separating-line multi-column"
                key={element.id}
              >
                <ul className="list-unstyled month-card-item">
                  <li className="month-card-item-description">
                    {element.description}
                  </li>
                  <li className="month-card-item-money ">
                    {element.price} {currency}
                    <button
                      onClick={(e) => handleDeleteItem(e, group.name, index)}
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
              isSmall={true}
              cardCurrency={currency}
            />
          </div>
        </>
      ))}

      {hasUnsavedChanges && (
        <div className="floating-save-btn">
          <button
            className={` btn btn-lg shadow-lg `}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              '💾'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDefaultItems;
