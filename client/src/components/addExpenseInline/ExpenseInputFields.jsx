import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

const ExpenseInputFields = ({ onAdd, blockName }) => {
  const [newItem, setnewItem] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const currency = useSelector((state) => state.currency);

  //generate random UUID
  let myuuid = uuidv4();

  function submitReq(e) {
    e.preventDefault();

    if (!newItem.trim() || !newItemPrice) {
      return;
    }

    const newObjItem = {
      description: newItem,
      price: parseFloat(newItemPrice),
      category: blockName,
      id: myuuid,
    };
    console.log(newObjItem);
    onAdd(newObjItem);
    setnewItem('');
    setNewItemPrice('');
  }

  return (
    <div>
      <span className="input-wrapper">
        <div
          className="stacked-inputs flex-grow-1"
          style={{ maxWidth: '400px' }}
        >
          <div className="form-floating w-">
            <input
              onChange={(e) => setnewItem(e.target.value)}
              type="email"
              id="new-expense-item-input"
              className="form-control form-control-lg "
            />
            <label htmlFor="new-expense-item-input">{blockName}</label>
          </div>

          <div className="form-floating">
            <input
              type="number"
              min="0"
              className="form-control form-control-lg line-input"
              id="new-expense-price-input"
              onChange={(e) => setNewItemPrice(e.target.value)}
            />
            <label htmlFor="new-expense-price-input">{currency}</label>
          </div>
        </div>
        <button onClick={submitReq}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
};

export default ExpenseInputFields;
