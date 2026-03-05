import { forwardRef } from "react";

const InputField = forwardRef(({
  name,
  title,
  placeholder,
  handleChange,
  type = "text",
  value,
  required = false,
  readOnly = false,
  error = null,
}, ref) => {
  return (
    <div className="space-y-1" ref={ref}>
      <label className="text-black text-sm font-semibold">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full py-2 px-4 border border-gray-300 rounded-lg text-black ${
          readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } focus:outline-none focus:ring-2 focus:ring-primary-1`}
      />
      {error && <small className="text-red-600">{error}</small>}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField; 