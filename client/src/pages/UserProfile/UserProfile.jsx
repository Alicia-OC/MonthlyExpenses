import Axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import EditUserDetails from '../../components/EditUserDetails/EditUserDetails';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);
  const userAvatar = avatar || user?.avatar;
  const backendLink = import.meta.env.VITE_APP_API_URL;
  const dispatch = useDispatch();

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [defaultItemsEditMode, setDefaultItemsEditMode] = useState(false);

  const currentYear = new Date().getFullYear();

  const expensesYearIndex = user?.dataByYear?.findIndex(
    (obj) => obj.year === currentYear
  );

  const expensesYearSummary = user?.dataByYear?.[expensesYearIndex] || {};

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

  const renderProfileInfo = () => {
    if (user) {
      const allitems = user.defaultItems;
      const tableData = [];

      Object.entries(allitems || {})?.forEach(
        ([categoryName, categoryData]) => {
          if (categoryData.items && categoryData.items.length > 0) {
            categoryData.items.forEach((item, index) => {
              tableData.push({
                category: index === 0 ? categoryData.name : '', // Only show category on first item
                description: item?.description || 'No description',
                price: item?.price || 0,
              });
            });
          }
        }
      );

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

  const renderDynamicContent = () => {
    if (defaultItemsEditMode) {
      return <AddDefaultItems />;
    }
    if (profileEditMode) {
      return <EditUserDetails />;
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
            <div className="card profile-div ">
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
                      cardCurrency={currency}
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
