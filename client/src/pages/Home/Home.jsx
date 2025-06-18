import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditingCard from '../EditingCard/EditingCard';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';

const Home = () => {
  const [count, setCount] = useState(0);

  //const dispatch = useDispatch();

  return (
    <>
      <h1>Your monthly expenses at glance!</h1>
      <EditingCard />

    </>
  );
};

export default Home;
