import { useState } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faPiggyBank,
  faBasketShopping,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const ExpensesSummary = () => {
  const user = useSelector((state) => state.user); //
  const currency = useSelector((state) => state.currency);

  const [userExpenses, setUserExpenses] = useState('loading');
  const [userSavings, setUserSavings] = useState('loading');
  const [userIncome, setUserIncome] = useState('loading');

  useEffect(() => {
    if (user?.dataByYear?.[0]) {
      setUserExpenses(user.dataByYear[0].expenses || 'loading');
      setUserSavings(user.dataByYear[0].savings || 'loading');
      setUserIncome(user.dataByYear[0].income || 'loading');
    }
  }, [user]);

  return (
    <div className="savings-div  p-4 text-black bg-body-tertiary">
      <p data-testid="current-month-display">
        {user?.dataByYear?.[0].month || 'Loading'}
      </p>
      <div className="d-flex justify-content-center py-1 text-body">
        <div>
          <p className="mb-1 h5">
            <FontAwesomeIcon icon={faPiggyBank} />{' '}
            {userSavings + ' ' + currency}{' '}
          </p>
          <p className="small text-muted mb-0">savings</p>
        </div>
        <div className="px-3">
          <p className="mb-1 h5">
            <FontAwesomeIcon icon={faBasketShopping} />
            {userExpenses + ' ' + currency}
          </p>
          <p className="small text-muted mb-0">expenses</p>
        </div>
        <div>
          <p className="mb-1 h5">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            {`${userIncome + ' ' + currency}`}{' '}
          </p>
          <p className="small text-muted mb-0">income</p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSummary;
