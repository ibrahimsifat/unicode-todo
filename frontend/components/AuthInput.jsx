import PropTypes from "prop-types";

const AuthInput = ({
  id,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor={id}
        className="w-1/4 h-10 flex items-center px-3 text-sm font-medium text-gray-700 bg-gray-50 ltr:rounded-l-lg rtl:rounded-r-lg border lrt:border-r-0 rtl:border-l-0 border-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-3/4 h-10 px-4 border border-gray-300 ltr:rounded-r-lg rtl:rounded-l-lg text-gray-700 focus:outline-none focus:border-[#2f2b43]"
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

// Define PropTypes to enforce the expected prop types
AuthInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string, // (e.g., "text", "password", "email")
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

AuthInput.defaultProps = {
  type: "text",
  placeholder: "Enter value",
  required: true,
};

export default AuthInput;
