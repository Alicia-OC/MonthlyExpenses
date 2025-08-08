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
        <div className='title-div'>
          {' '}
          <h1>Quick Peek, Smart Spend! </h1>{' '}
          <button className="add-new-card-btn" onClick={(e) => addNew()}>
            Add new
          </button>
        </div>

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
