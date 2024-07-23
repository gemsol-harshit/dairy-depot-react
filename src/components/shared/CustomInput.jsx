// src/components/CustomInputs.js
import React from "react";
import Select from "react-select";

export const InputField = ({
  label,
  name,
  value,
  onChange,
  required,
  ...props
}) => (
  <div>
    <label className="block text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      placeholder="Enter"
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
      required={required}
      {...props}
    />
  </div>
);

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
}) => (
  <div>
    <label className="block text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <Select
      name={name}
      value={options.find((option) => option.value === value)}
      options={options}
      onChange={(selectedOption) =>
        onChange({
          target: { name, value: selectedOption.value },
        })
      }
      className="mt-1"
      required={required}
    />
  </div>
);

export const PhoneInput = ({ value, onChange }) => (
  <div>
    <label className="block text-gray-700">
      Phone Number
      <span className="text-red-500">*</span>
    </label>
    <div className="flex">
      <span className="px-3 py-2 border border-gray-300 rounded-l mt-1 bg-gray-100">
        +91
      </span>
      <input
        type="tel"
        name="mobile"
        value={value || ""}
        placeholder="Enter"
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-r mt-1"
        pattern="[0-9]{10}"
        maxLength={10}
        required
      />
    </div>
  </div>
);

export const DocumentImage = ({ src, alt }) => (
  <div>
    <label className="block text-gray-700">{alt} Image</label>
    <div className="flex items-center">
      <img src={src} alt={alt} className="w-50 h-50 object-cover rounded" />
    </div>
  </div>
);

export const FileInput = ({ label, name, onChange, required }) => (
  <div>
    <label className="block text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
      required={required}
    />
  </div>
);
