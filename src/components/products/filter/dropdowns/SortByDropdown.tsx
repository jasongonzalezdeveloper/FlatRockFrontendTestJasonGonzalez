import DropdownMenu from '@/components/ui/DropdownMenu';
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
        <DropdownMenu options={options} selected={selected} setSelected={setSelected} setOpen={setOpen} />
      )}
    </div>
  );
}
