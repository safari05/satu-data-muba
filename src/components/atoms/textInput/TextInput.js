import React from "react";

export const TextInput = ({
  label,
  placeholder,
  onChange,
  props,
  isTextArea = false,
  type = "text",
}) => {
  return (
    <div>
      {label && <p className="text-white mb-2">{label}</p>}
      {!isTextArea ? (
        <input
          type={type}
          placeholder={placeholder}
          className="placeholder:text-sm text-sm px-3 rounded-md h-10 w-full"
          onChange={onChange}
          {...props}
        />
      ) : (
        <textarea
          className="h-28 w-full text-sm p-3 rounded-md"
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
      )}
    </div>
  );
};
