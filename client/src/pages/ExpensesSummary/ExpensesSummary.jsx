import { useState } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPiggyBank,
  faBasketShopping,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const ExpensesSummary = (props) => {
  const user = useSelector((state) => state.user); //
  const currency = useSelector((state) => state.currency);
  
  const totalExpenses = props.totalExpenses;
  const totalIncome = props.totalIncome;
  const totalSavings = props.totalSavings;

  return (
    <div className="d-flex justify-content-center py-1 text-body">
      <div>
        <p className="mb-1 h5">
          <FontAwesomeIcon icon={faPiggyBank} />{' '}
          {totalSavings + ' ' + currency}{' '}
        </p>
        <p className="small text-muted mb-0">savings</p>
      </div>
      <div className="px-3">
        <p className="mb-1 h5">
          <FontAwesomeIcon icon={faBasketShopping} />{' '}
          {totalExpenses + ' ' + currency}
        </p>
        <p className="small text-muted mb-0">expenses</p>
      </div>
      <div>
        <p className="mb-1 h5">
          <FontAwesomeIcon icon={faMoneyBillWave} />{' '}
          {totalIncome + ' ' + currency}{' '}
        </p>
        <p className="small text-muted mb-0">income</p>
      </div>
    </div>
  );
};

export default ExpensesSummary;
