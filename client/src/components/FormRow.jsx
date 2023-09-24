const FormRow = ({ labelText, name, handleChange, value, type }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
export default FormRow;
