import { useEffect } from 'react';
import Axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import ExpenseInputFields from '../addExpenseInline/ExpenseInputFields';

const AddDefaultItems = () => {
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const backendLink = import.meta.env.VITE_APP_API_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [defaultItems, setDefaultItems] = useState([]);
  const [income, setIncome] = useState();

  const fetchData = async () => {
    try {
      const res = await Axios.get(
        `${backendLink}/users/${userid}/defaultitems`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let itemsData = res.data;

      setIncome(itemsData.totalIncome);
      setDefaultItems([
        { name: itemsData.fixedItems.name, items: itemsData.fixedItems.items },
        {
          name: itemsData.subscriptionItems.name,
          items: itemsData.subscriptionItems.items,
        },
        { name: itemsData.otherItems.name, items: itemsData.otherItems.items },
        {
          name: itemsData.transportItems.name,
          items: itemsData.transportItems.items,
        },
        { name: itemsData.foodItems.name, items: itemsData.foodItems.items },
      ]);

      console.log(res.data);
    } catch (error) {
      console.error('Error fetching default items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {
    fetchData();
  }, []);

  const handleAddItem = async (newItemAdded) => {
    const updatedBlocks = defaultItems.map((block) =>
      block.name === newItemAdded.category
        ? { ...block, items: [...block.items, newItemAdded] }
        : block
    );
    setDefaultItems(updatedBlocks);

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
    } catch (error) {
      console.error('Error fetching default items:', error);
    }
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
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const handleSave = async () => {
    if (!validatePassword(password, password2)) {
      return;
    }
    setProfileEditMode(false);

    const modal = new Modal(document.getElementById('saveAlertModal'));
    modal.show();

    try {
      if (profileEditMode) {
        const response = await Axios.patch(
          `${backendLink}/users/${userid}/update`,
          {
            name: formData.newName || undefined,
            email: formData.newMail || undefined,
            password: formData.password || undefined,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          const { name, email } = response.data;
          dispatch(setLogin({ name, email }));
          setProfileEditMode(false);
          setFormData({
            newName: '',
            newMail: '',
            password: '',
            password2: '',
          });

          modal.show();
        }
      }

      if (defaultItemsEditMode) {
        const updateData = { totalIncome: income };

        defaultItems.forEach((block) => {
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
        console.log(defaultItems);

        await Axios.patch(
          `${backendLink}/users/${userid}/defaultitems`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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
            />
          </div>
        </>
      ))}
      <button
        className="save-default-item btn btn-dark w-100"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default AddDefaultItems;
