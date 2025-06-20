const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      className="w-full border-b border-teal-500 outline-none focus:border-teal-700"
      {...props}
    />
  </div>
);

export default Input;
