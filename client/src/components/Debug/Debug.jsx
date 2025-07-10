import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";

import { setLogin } from "../../state/authSlice";


function DebugLoginTest() {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

 useEffect(() => {
    dispatch(setLogin({
      token: "test-token-123",
       user: {
          name: 'Alicia',
          email: 'placeholder@test',
          cards: [
            { id: 'testId1', month: 'June' },
            { id: 'testId2', month: '' },
            { id: 'testId3', month: '' },
            { id: 'testId4', month: '' },
            { id: '', month: '' },
          ],
          dataByYear: [
            {
              year: '',
              month: '',
              savings: '',
              expenses: 'dsa',
              income: '',
            },
          ],
          avatar: avatar,
        },
      id: "userId123"
    }));
  }, [dispatch]);

  console.log("Token:", token);

  return <div>Check console for token</div>;
}


export default DebugLoginTest