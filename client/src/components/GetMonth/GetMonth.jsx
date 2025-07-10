const GetMonth = () => {
    const month = new Date().toLocaleString('en-US', { month: 'long' });
    const monthEdited = month.charAt(0).toUpperCase() + month.slice(1);
    return <span>{monthEdited}</span>;
}
export default GetMonth