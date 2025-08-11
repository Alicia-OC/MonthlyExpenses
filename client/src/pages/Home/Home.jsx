import { useState } from 'react';
import { useSelector } from 'react-redux';

import Axios from 'axios';
import EditingCard from '../EditingCard/EditingCard';
import Swal from 'sweetalert2';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userid = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const backendLink = import.meta.env.VITE_APP_GETCARD;

  const logged = true;

  const addNew = async () => {
    setIsLoading(true);

    try {
      const res = await Axios.post(
        `${backendLink}/new/${userid}`,
        { year: currentYear, month: currentMonth },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: 'New card created, yay!',
          width: 600,
          padding: '3em',
          color: '#F78FB3',
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Swal.fire({
          title: 'Sorry, only one card per month is allowed!',
          width: 600,
          padding: '3em',
          color: '#F78FB3',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (logged) {
    return (
      <>
        <div className="title-div">
          <h1>Quick Peek, Smart Spend! </h1>
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
