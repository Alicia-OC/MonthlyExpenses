import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

const ExpenseInputFields = ({ onAdd, blockName }) => {

    const [newItem, setnewItem] = useState('')
    const [newItemPrice, setNewItemPrice] = useState('')
    const currency = useSelector((state) => state.currency);

    function submitReq(e) {
        e.preventDefault();


        if (!newItem.trim() || !newItemPrice) return;

        const newObjItem = {
            description: newItem,
            price: parseFloat(newItemPrice),
            category: blockName,
            id: uuidv4(),

        };

        onAdd(newObjItem);

        setnewItem('');
        setNewItemPrice('');
    }

    return <div>
        { }
        <span className="input-wrapper">
            <div className="two-line-input">
                <input
                    type="text"
                    placeholder={`Add new ${blockName}`}
                    className="line-input"
                    value={newItem}

                    onChange={(e) => setnewItem(e.target.value)}
                />
                <input
                    type="number"
                    min="0"
                    placeholder={currency}
                    className="line-input"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                />
            </div>
            <button onClick={submitReq}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </span>
    </div>



}

export default ExpenseInputFields