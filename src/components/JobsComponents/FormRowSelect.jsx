// This is Select Input Component and we are using this in the GridFooter.jsx whick is 10,20,30 dropdown

const FormRowSelect = ({ name, value, handleChange, list }) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="FormSelect"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue} Rows Per Page
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
