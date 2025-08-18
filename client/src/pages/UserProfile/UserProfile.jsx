import Axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'bootstrap';
import { useEffect } from 'react';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import avatar from '../../assets/Anya.png';

import AddDefaultItems from '../../components/AddDefaultItems/AddDefaultItems';
import RecentCardWidget from '../../components/cardWidget/RecentCardWidget';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import ExpenseInputFields from '../../components/addExpenseInline/ExpenseInputFields';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const userAvatar = avatar || user?.avatar;
  const backendLink = import.meta.env.VITE_APP_API_URL;

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [defaultItemsEditMode, setDefaultItemsEditMode] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newMail, setNewMail] = useState(null);

  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [errMsgPassword, setErrMsgPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [income, setIncome] = useState();
  const [formData, setFormData] = useState({
    newName: '',
    newMail: '',
    password: '',
    password2: '',
  });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getFullYear();

  const expensesYearIndex = user?.dataByYear.findIndex(
    (obj) => obj.year === currentYear
  );

  const expensesYearSummary = user?.dataByYear[expensesYearIndex];


  const handleProfileEditingMode = () => {
    setProfileEditMode((prev) => !prev);

    if (defaultItemsEditMode) {
      setDefaultItemsEditMode(false);
    }
  };

  const handleDefaultItemsEditingMode = async () => {
    setDefaultItemsEditMode((prev) => !prev);

    if (profileEditMode) {
      setProfileEditMode(false);
    }

  };

  const validatePassword = (pw1, pw2) => {
    if (pw1 !== pw2) {
      setErrMsgPassword(
        <div className="errMsgPassword">
          Please make sure both password fields are the same.
        </div>
      );
      return false;
    } else {
      setErrMsgPassword(null);
    }
    return true;
  };

  const handleSave = async () => {
    if (!validatePassword(password, password2)) {
      return;
    }
    setProfileEditMode(false);

    const modal = new Modal(document.getElementById('saveAlertModal'));
    modal.show();

    try {
      if (profileEditMode) {
        const response = await Axios.patch(
          `${backendLink}/users/${userid}/update`,
          {
            name: formData.newName || undefined,
            email: formData.newMail || undefined,
            password: formData.password || undefined,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          const { name, email } = response.data;
          dispatch(setLogin({ name, email }));
          setProfileEditMode(false);
          setFormData({
            newName: '',
            newMail: '',
            password: '',
            password2: '',
          });

          modal.show();
        }
      }

      if (defaultItemsEditMode) {
        const updateData = { totalIncome: income };

        defaultItems.forEach((block) => {
          switch (block.name) {
            case 'The Non-negotiables':
              updateData.fixedItems = block.items;
              break;
            case 'On Repeat':
              updateData.subscriptionItems = block.items;
              break;
            case 'Little Life Things':
              updateData.otherItems = block.items;
              break;
            case 'Out & About':
              updateData.transportItems = block.items;
              break;
            case 'Bits & Bites':
              updateData.foodItems = block.items;
              break;
          }
        });
        console.log(defaultItems);

        await Axios.patch(
          `${backendLink}/users/${userid}/defaultitems`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderProfileInfo = () => {
    if (user) {
      const allitems = user.defaultItems;
      const tableData = [];

      Object.entries(allitems).forEach(([categoryName, categoryData]) => {
        if (categoryData.items && categoryData.items.length > 0) {
          categoryData.items.forEach((item, index) => {
            tableData.push({
              category: index === 0 ? categoryData.name : '', // Only show category on first item
              description: item?.description || 'No description',
              price: item?.price || 0,
            });
          });
        }
      });

      return (
        <div className="profile-info-div">
          <div className="">
            <p>
              <label className=" ">
                <strong>Name:</strong>
              </label>
              <span className=""> {user?.name || 'Undefined'}</span>
            </p>
            <p>
              <label className="">
                {' '}
                <strong>Mail:</strong>
              </label>
              <span className=""> {user?.email || 'Undefined'}</span>
            </p>
          </div>
          <div className="separating-line"></div>

          <div className="default-items-div">
            <p>Default Items</p>
            <table className="default-items-table w-full text-sm">
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-1 px-4 text-gray-700 capitalize font-medium">
                      <strong>{row.category}</strong>
                    </td>
                    <td className="py-1 px-4 text-gray-600 capitalize">
                      {row.description}
                    </td>
                    <td className="py-1 px-4 text-right font-medium">
                      {`${row.price} ${currency}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return 'Loading...';
    }
  };

  // Render profile edit form
  const renderProfileEditForm = () => (
    <div className="form-grid editing-profile-div">
      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-grow-1">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            id="form-name"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-name">
            Your Name
          </label>
        </div>
        <i
          className="info-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="your name can only be updated once every 3 months"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      </div>

      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setNewMail(e.target.value)}
            type="email"
            id="form-email"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-email">
            Your Email
          </label>
        </div>
        <i
          className="info-warning"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="your mail can only be updated once every 6 months"
        >
          <FontAwesomeIcon icon={faCircleInfo} />
        </i>
      </div>

      <div className="d-flex flex-row align-items-center ">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="form-password"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-password">
            New password
          </label>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-floating flex-fill mb-0">
          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
          <input
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            id="form-repeat-pw"
            className="form-control"
          />
          <label className="form-label" htmlFor="form-repeat-pw">
            Repeat your new password
          </label>
        </div>
      </div>

      {errMsgPassword}

      <button className="btn btn-dark" onClick={handleSave}>
        Save
      </button>
    </div>
  );

  const renderDynamicContent = () => {
    if (defaultItemsEditMode) {
      return <AddDefaultItems />;
    }
    if (profileEditMode) {
      return renderProfileEditForm();
    }
    return renderProfileInfo();
  };

  return (
    <>
      <div
        className="modal fade"
        id="saveAlertModal"
        tabIndex="-1"
        aria-labelledby="saveAlertLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="saveAlertLabel">
                Yay!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Changes have been saved successfully 🌸
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary-pink"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <Container fluid className="px-3 px-lg-4">
        <div className="row justify-content-center ">
          <div className="col-12">
            {' '}
            <div className="card">
              <div className="card-body p-4">
                {/* Top Section - Avatar and Buttons */}
                <div className="row mb-4">
                  {' '}
                  <div className="justify-content-center d-flex flex-row">
                    <div className=" mt-3 d-flex flex-column">
                      <Image
                        src={userAvatar}
                        style={{ maxWidth: '300px', width: '100%' }}
                        className="img-fluid img-thumbnail mt-6 mb-2"
                        alt="User avatar"
                      />

                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        onClick={handleProfileEditingMode}
                      >
                        {!profileEditMode
                          ? 'Edit profile or password'
                          : 'Exit editing mode'}
                      </button>

                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        onClick={handleDefaultItemsEditingMode}
                      >
                        {!defaultItemsEditMode
                          ? 'Set your default monthly expenses'
                          : 'Go back to your Profile'}
                      </button>
                    </div>
                  </div>
                </div>

                {!defaultItemsEditMode ? (
                  <div className=" savings-div  ">
                    <h4 className="month-finances-h">
                      {expensesYearSummary.year} finances
                    </h4>
                    <ExpensesSummary
                      totalExpenses={expensesYearSummary.totalExpenses}
                      totalIncome={expensesYearSummary.totalIncome}
                      totalSavings={expensesYearSummary.totalSavings}
                      cardCurrency={user.currency}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="update-user-content">
                  <div className="main-content">{renderDynamicContent()}</div>
                </div>
                <div className="separating-line"></div>
                <RecentCardWidget />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
