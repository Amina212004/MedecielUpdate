const Button = ({ children, ...props }) => (
  <button
    className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
    {...props}
  >
    {children}
  </button>
);

export default Button;
