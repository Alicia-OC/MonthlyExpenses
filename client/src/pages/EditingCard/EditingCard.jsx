import { Container } from "react-bootstrap"
import { Card } from "react-bootstrap";
import mockCard from "./mockCard"
import { useSelector } from 'react-redux';

import ExpensesSummary from "../ExpensesSummary/ExpensesSummary";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


const EditingCard = () => {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.userId);
    const currency = useSelector((state) => state.currency);

    const [newFixedItem, setNewFixedItem] = useState('')
    const [newSubscriptionItems, setNewSubscriptionItems] = useState('')
    const [newOtherItems, setNewOtherItems] = useState('')
    const [newTransportItems, setNewTransportItems] = useState('')

    const mockCardBlocks = [
        { title: 'The Non-Negotiables', items: mockCard.fixedItems },
        { title: 'On Repeat', items: mockCard.subscriptionItems },
        { title: 'Little Life Things', items: mockCard.otherItems },
        { title: 'Out & About', items: mockCard.transportItems },
        { title: 'Bits & Bites', items: mockCard.groceriesItems },
    ];

    const inputsLoop = (index) => {
        switch (index) {
            case 0:
                return <input
                    id="name"
                    type="text"
                    placeholder="Add a new non-negotiable"
                    onChange={(e) => setNewFixedItem(e.target.value)}
                />
            case 1:
                return <input
                    id="name"
                    type="text"
                    placeholder="Add your on repeat"
                    onChange={(e) => setNewFixedItem(e.target.value)}
                />
            case 2:
                return <input
                    id="name"
                    type="text"
                    placeholder="Add your little life thing"
                    onChange={(e) => setNewFixedItem(e.target.value)}
                />
            case 3:
                return <input
                    id="name"
                    type="text"
                    placeholder="Add your out&about"
                    onChange={(e) => setNewFixedItem(e.target.value)}
                />

            case 4:
                return <input
                    id="name"
                    type="text"
                    placeholder="Add your groceries"
                    onChange={(e) => setNewFixedItem(e.target.value)}
                />
            default:
            // code block
        }
    }

    return <Container><div className="card py-5 h-100">

        <div className="savings-div p-4 text-black bg-body-tertiary">
            <ExpensesSummary />
        </div>
        <div className="month-card-component col-12 col-md-6 col-lg-4">
            <div className="container "> </div>
            <div className="p-3 month-card-container">
                <div className="multi-column ">
                    {mockCardBlocks.map((group, index) => (
                        <><div className="group-column"><div className="month-card-h5 " key={`${group.title}-title`}>
                            <h5>{group.title}</h5>
                        </div>
                            {group.items.map((item, index) => (
                                <div
                                    className="item mb-3 month-card-body multi-column"
                                    key={`${group.title}-${index}`}
                                >
                                    <ul className="list-unstyled month-card-item">
                                        <li className="month-card-item-description">
                                            {item.description}
                                        </li>
                                        <li className="month-card-item-money">
                                            {item.amount} {currency}
                                        </li>
                                    </ul>

                                </div>
                            ))}
                            <div>
                                { }
                                <span className="input-wrapper">
                                    {inputsLoop(index)}
                                    <button>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </span>

                            </div></div>

                        </>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </Container>
}

export default EditingCard