import { optionsByDropdownValues } from '@/components/types/products/Enums';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

type SortByDropdownProps = {
  onSortByChange: (sortBy?: string) => void;
};
export default function SortByDropdown({onSortByChange}: SortByDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(optionsByDropdownValues.dateDesc);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onSortByChange(option);
  };

  return (
    <div className="relative">
      <button
        className="rounded-full px-6 py-2 text-left flex justify-between items-center cursor-pointer bg-white border border-[#E0E0E0] w-full min-w-max"
        onClick={() => setOpen(!open)}
      >
        <span>Sort By - {selected}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <DropdownMenu options={Object.values(optionsByDropdownValues)} selected={selected} setSelected={handleSelect} setOpen={setOpen} />
      )}
    </div>
  );
}
