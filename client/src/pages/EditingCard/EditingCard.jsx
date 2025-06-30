import { Container } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useParams } from "react-router-dom";

import ExpensesSummary from "../ExpensesSummary/ExpensesSummary";
import mockCard from "./mockCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus
} from '@fortawesome/free-solid-svg-icons';
import ExpenseInputFields from "../../components/addExpenseInline/ExpenseInputFields";

import './css/index.css';

const backendLink = import.meta.env.VITE_APP_GETCARD


const EditingCard = () => {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.userId);
    const currency = useSelector((state) => state.currency);
    const [expenseBlocks, setExpenseBlocks] = useState([]);
    const [card, setCard] = useState({});
    const { cardId } = useParams()

    const getCard = async () => {
        try {
            const res = await Axios.get(
                `${backendLink}/${userId}/${cardId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCard(res.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getCard();
    }, [userId, token]);

    useEffect(() => {

        if (mockCard) {
            setExpenseBlocks([
                { name: mockCard.fixedItems.name, items: mockCard.fixedItems.items },
                { name: mockCard.subscriptionItems.name, items: mockCard.subscriptionItems.items },
                { name: mockCard.otherItems.name, items: mockCard.otherItems.items },
                { name: mockCard.transportItems.name, items: mockCard.transportItems.items },
                { name: mockCard.foodItems.name, items: mockCard.foodItems.items },
            ])
        }
    }, [mockCard]);


    const handleAddItem = (newItemAdded) => {
        setExpenseBlocks((prevBlocks) =>
            prevBlocks.map((block) =>
                block.name === newItemAdded.category
                    ? { ...block, items: [...block.items, newItemAdded] }
                    : block
            )
        );
    };

    const handleDeleteItem = (e, blockName, indexToDelete) => {
        e.preventDefault();
        setExpenseBlocks((prevBlocks) =>
            prevBlocks.map((block) =>
                block.name === blockName
                    ? {
                        ...block,
                        items: block.items.filter((_, index) => index !== indexToDelete),
                    }
                    : block
            )
        );
    };

    return <Container><div className="card py-5 h-100">

        <div className="savings-div p-4 text-black bg-body-tertiary">
            <ExpensesSummary />
        </div>
        <div className="month-card-component col-12 col-md-6 col-lg-4">
            <div className="container "> </div>
            <div className="p-3 month-card-container">
                <div className="multi-column ">

                    {expenseBlocks.map((group, index) => (
                        <><div className="group-column" key={`${group.name}-name`}>
                            <div className="month-card-h5 " >
                                <h5>{group.name}</h5>
                            </div>
                            {group.items.map((element, index) => (
                                <div
                                    className="item mb-3 month-card-body multi-column"
                                    key={element.id}                                >
                                    <ul className="list-unstyled month-card-item">
                                        <li className="month-card-item-description">
                                            {element.description}
                                        </li>
                                        <li className="month-card-item-money ">
                                            {element.price} {currency}
                                            <button onClick={(e) => handleDeleteItem(e, group.name, index)} className="delete-list-item-btn"><FontAwesomeIcon icon={faMinus} /> </button>
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
}

export default EditingCard 