// ! re-usable form input used in both login and register form & search form

const FormInput = ({ name, type, label, defaultVal, size }) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultVal}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInput;
