import PropTypes from "prop-types";

const Button = ({ children, onClick, type, className, disabled, ...props }) => {
  return (
    <button
      type={type}
      className={`w-full py-2 bg-[#2f2b43] text-white font-semibold rounded-lg hover:bg-[#3d375e] transition duration-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Define prop types for validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "button",
  className: "",
  disabled: false,
  onClick: () => {},
};

export default Button;
