import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: Props) => (
  <input
    type="text"
    placeholder="Search users..."
    value={value}
    onChange={onChange}
    className="w-64 p-2 border border-gray-300 rounded"
  />
);

export default SearchInput;
