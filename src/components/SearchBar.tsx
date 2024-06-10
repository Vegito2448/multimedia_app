"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
}

// Función de debounce
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const SearchBar = ({ placeholder, onChange }: Props) => {
  const [inputValue, setInputValue] = useState('');

  console.log(`🚀 ~ SearchBar ~ inputValue:`, inputValue);

  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500 ms de retraso

  useEffect(() => {
    if (debouncedSearchTerm && onChange) {
      onChange(debouncedSearchTerm); // Aquí llamas a tu función onChange con el término de búsqueda
    }
    if (inputValue === '') onChange('');
  }, [debouncedSearchTerm]);

  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search" name="search"
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="absolute right-0 top-0 mt-5 mr-4">
        <IoSearch />
      </button>
    </div>
  );
};