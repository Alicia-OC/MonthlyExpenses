import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditingCard from '../EditingCard/EditingCard';

const Home = () => {
  const [count, setCount] = useState(0);

  //const dispatch = useDispatch();
  const logged = true
  if (logged) {
    return (
      <>
        <h1>Your monthly expenses at glance!</h1>
        <EditingCard />

      </>
    );
  } else {
    return (
      <>
        <h1>Your monthly expenses at glance!</h1>

      </>
    );
  }

};

export default Home;
