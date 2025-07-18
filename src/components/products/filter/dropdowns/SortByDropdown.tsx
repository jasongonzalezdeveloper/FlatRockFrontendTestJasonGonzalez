import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const options = [
  'Release Date: Desc',
  'Release Date: Asc',
  'Price: Desc',
  'Price: Asc'
];

export default function SortByDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative">
      <button
        className="rounded-full px-6 py-2 text-left flex justify-between items-center cursor-pointer bg-white border border-[#E0E0E0] w-full min-w-max"
        onClick={() => setOpen(!open)}
      >
        <span>Sort By: {selected}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow z-50 min-w-max">
          {options.map(option => (
            <div
              key={option}
              className={`px-6 py-2 cursor-pointer hover:bg-gray-100 ${selected === option ? 'text-[#EA2B2B] font-semibold' : ''}`}
              onClick={() => { setSelected(option); setOpen(false); }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
