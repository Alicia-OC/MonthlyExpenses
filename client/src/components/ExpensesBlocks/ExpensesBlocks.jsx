export const ItemsExpenseList = ({ items, currency }) => (
  <div className="items-list">
    {items.map((item, index) => (
      <div
        key={`${item.description}-${index}`}
        className="item mb-3 separating-line"
      >
        <ul className="list-unstyled month-card-item">
          <li className="month-card-item-description">{item.description}</li>
          <li className="month-card-item-money">
            {item.price} {currency}
          </li>
        </ul>
      </div>
    ))}
  </div>
);

export const CategorySection = ({ categoryData, currency }) => (
  <div className="month-card-h5">
    <h5>{categoryData.name}</h5>
    {ItemsExpenseList(categoryData.items, currency)}
  </div>
);
