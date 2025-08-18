const GetMonth = (props) => {
  const cardMonth = props.cardMonth;

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

  return <span>{months[cardMonth - 1]}</span>;
};

export default GetMonth;
