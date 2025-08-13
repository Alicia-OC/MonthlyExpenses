import Axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'bootstrap';
import { useEffect } from 'react';

/** ICONS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faMinus,
  faUser,
  faEnvelope,
  faLock,
  faKey,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Image } from 'react-bootstrap';

import avatar from '../../assets/Anya.png';
import RecentCardWidget from '../../components/cardWidget/RecentCardWidget';
import ExpensesSummary from '../ExpensesSummary/ExpensesSummary';
import ExpenseInputFields from '../../components/addExpenseInline/ExpenseInputFields';

const UserProfile = () => {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.userId);
  const currency = useSelector((state) => state.currency);

  const userAvatar = avatar || user?.avatar;

  const [profileEditMode, setProfileEditMode] = useState(false);
  const [defaultItemsEditMode, setDefaultItemsEditMode] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newMail, setNewMail] = useState(null);

  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const [errMsgPassword, setErrMsgPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultItems, setDefaultItems] = useState([]);
  const [income, setIncome] = useState();
  const backendLink = import.meta.env.VITE_APP_API_URL;
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

    setIsLoading(true);

    try {
      const res = await Axios.get(
        `${backendLink}/users/${userid}/defaultitems`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let itemsData = res.data;

      setIncome(itemsData.totalIncome);
      setDefaultItems([
        { name: itemsData.fixedItems.name, items: itemsData.fixedItems.items },
        {
          name: itemsData.subscriptionItems.name,
          items: itemsData.subscriptionItems.items,
        },
        { name: itemsData.otherItems.name, items: itemsData.otherItems.items },
        {
          name: itemsData.transportItems.name,
          items: itemsData.transportItems.items,
        },
        { name: itemsData.foodItems.name, items: itemsData.foodItems.items },
      ]);

      console.log(res.data);
    } catch (error) {
      console.error('Error fetching default items:', error);
    } finally {
      setIsLoading(false);
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

  const handleAddItem = async (newItemAdded) => {
    const updatedBlocks = defaultItems.map((block) =>
      block.name === newItemAdded.category
        ? { ...block, items: [...block.items, newItemAdded] }
        : block
    );
    setDefaultItems(updatedBlocks);

    try {
      const updateData = {};
      updatedBlocks.forEach((block, index) => {
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
    } catch (error) {
      console.error('Error fetching default items:', error);
    }
  };

  const handleDeleteItem = async (e, blockName, indexToDelete) => {
    const updatedBlocks = defaultItems.map((block) =>
      block.name === blockName
        ? {
            ...block,
            items: block.items.filter((_, index) => index !== indexToDelete),
          }
        : block
    );

    setDefaultItems(updatedBlocks);

    try {
      const updateData = {};

      updatedBlocks.forEach((block, index) => {
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
    } catch (error) {
      console.error('Error fetching card:', error);
    }
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

  const dynamicBlock = () => {
    if (!profileEditMode && !defaultItemsEditMode) {
      return (
        <>
          <div>
            <p>
              <label className="font-semibold ">Name: </label>
              <span className="font-italic"> {user?.name || 'Undefined'}</span>
            </p>
            <p>
              <label className="font-semibold ">Mail: </label>
              <span className="font-italic"> {user?.email || 'Undefined'}</span>
            </p>
          </div>
        </>
      );
    } else if (profileEditMode) {
      return (
        <>
          <div className="form-grid">
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
        </>
      );
    } else if (defaultItemsEditMode && defaultItems) {
      return (
        <>
          <div className="default-items-div group-column">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Total Income</h5>
              <input
                className="form-control line-input"
                onChange={(e) => setIncome(e.target.value)}
                value={income}
                type="number"
                style={{ maxWidth: '200px' }}
              />
            </div>
            {defaultItems.map((group, index) => (
              <>
                <div className="default-items-group">
                  <h5>{group.name}</h5>
                  {group.items.map((element, index) => (
                    <div
                      className="item mb-3 month-card-body multi-column"
                      key={element.id}
                    >
                      <ul className="list-unstyled month-card-item">
                        <li className="month-card-item-description">
                          {element.description}
                        </li>
                        <li className="month-card-item-money ">
                          {element.price} {currency}
                          <button
                            onClick={(e) =>
                              handleDeleteItem(e, group.name, index)
                            }
                            className="delete-list-item-btn"
                          >
                            <FontAwesomeIcon icon={faMinus} />{' '}
                          </button>
                        </li>
                      </ul>
                    </div>
                  ))}
                  <ExpenseInputFields
                    blockName={group.name}
                    onAdd={(newItemAdded) => handleAddItem(newItemAdded)}
                    isSmall={true}
                  />
                </div>
              </>
            ))}
            <button
              className="save-default-item btn btn-dark w-100"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </>
      );
    }
  };

  const renderProfileInfo = () => (
    <div>
      <p>
        <label className="font-semibold ">Name: </label>
        <span className="font-italic"> {user?.name || 'Undefined'}</span>
      </p>
      <p>
        <label className="font-semibold ">Mail: </label>
        <span className="font-italic"> {user?.email || 'Undefined'}</span>
      </p>
    </div>
  );

  // Render profile edit form
  const renderProfileEditForm = () => (
    <div className="form-grid">
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

  // Render default items editor
  const renderDefaultItemsEditor = () => (
    <div className="default-items-div group-column">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Total Income</h5>
        <input
          className="form-control line-input"
          onChange={(e) => setIncome(e.target.value)}
          value={income}
          type="number"
          style={{ maxWidth: '200px' }}
        />
      </div>
      {defaultItems.map((group, index) => (
        <>
          <div className="default-items-group">
            <h5>{group.name}</h5>
            {group.items.map((element, index) => (
              <div
                className="item mb-3 month-card-body multi-column"
                key={element.id}
              >
                <ul className="list-unstyled month-card-item">
                  <li className="month-card-item-description">
                    {element.description}
                  </li>
                  <li className="month-card-item-money ">
                    {element.price} {currency}
                    <button
                      onClick={(e) => handleDeleteItem(e, group.name, index)}
                      className="delete-list-item-btn"
                    >
                      <FontAwesomeIcon icon={faMinus} />{' '}
                    </button>
                  </li>
                </ul>
              </div>
            ))}
            <ExpenseInputFields
              blockName={group.name}
              onAdd={(newItemAdded) => handleAddItem(newItemAdded)}
              isSmall={true}
            />
          </div>
        </>
      ))}
      <button
        className="save-default-item btn btn-dark w-100"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );

  const renderDynamicContent = () => {
    if (defaultItemsEditMode) {
      return renderDefaultItemsEditor();
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
                Success
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Changes have been saved successfully!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <Container fluid className="px-3 px-lg-4">
        {' '}
        {/**modal div */}
        <div className="row justify-content-center">
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
                      {months[currentMonth]} finances
                    </h4>
                    <ExpensesSummary />
                  </div>
                ) : (
                  ''
                )}
                <div className="update-user-content">
                  <div className="main-content">{renderDynamicContent()}</div>
                </div>
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
