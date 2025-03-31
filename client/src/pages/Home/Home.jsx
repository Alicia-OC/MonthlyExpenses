import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [count, setCount] = useState(0);

  //const dispatch = useDispatch();

  return (
    <>
      <h1>Monthly expenses</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>+5</button>
        <button onClick={() => setCount((count) => count + 1)}>+20</button>
        <button onClick={() => setCount((count) => count - 10)}>-10</button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
