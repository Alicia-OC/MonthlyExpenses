import EditingCard from '../EditingCard/EditingCard';

const Home = () => {

  const logged = true;

  if (logged) {
    return (
      <>
        <div className="title-div">
          <h1>Quick Peek, Smart Spend! </h1>
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
