import { useState } from 'react';
import EditingCard from '../EditingCard/EditingCard';
import Swal from 'sweetalert2';

const Home = () => {
  const [count, setCount] = useState(0);

  //const dispatch = useDispatch();
  const logged = true;
  const addNew = () => {
    Swal.fire({
      title: 'Coming soon, stay tuned!',
      width: 600,
      padding: '3em',
      color: '#F78FB3',
    });
  };

  if (logged) {
    return (
      <>
        <h1>Your monthly expenses at glance!</h1>{' '}
        <button onClick={(e) =>addNew()}>Add new</button>
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
