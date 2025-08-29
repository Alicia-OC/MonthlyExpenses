import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

const ExpenseInputFields = ({ onAdd, blockName, ...props }) => {
  const [newItem, setnewItem] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const currency = useSelector((state) => state.currency);

  const isSmall = props.isSmall;
  const cardCurrency = props.cardCurrency

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
      <form onSubmit={submitReq}>
        <div className="input-wrapper new-item">
          <div
            className={
              isSmall
                ? 'd-flex align-items-end gap-1'
                : 'stacked-inputs flex-grow-1'
            }
          >
            <div
              className="form-floating"
              style={isSmall ? { flex: '3' } : undefined}
            >
              <input
                value={newItem}
                onChange={(e) => setnewItem(e.target.value)}
                type="text"
                id="new-expense-item-input"
                className="form-control line-input"
              />
              <label  className='label-input' htmlFor="new-expense-item-input">{blockName}</label>
            </div>

            <div
              className="form-floating"
              style={isSmall ? { flex: '1' } : undefined}
            >
              <input
                value={newItemPrice}
                type="number"
                min="0"
                step=".01"
                className="form-control line-input"
                id="new-expense-price-input"
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
              <label htmlFor="new-expense-price-input">{cardCurrency}</label>
            </div>
          </div>
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseInputFields;
