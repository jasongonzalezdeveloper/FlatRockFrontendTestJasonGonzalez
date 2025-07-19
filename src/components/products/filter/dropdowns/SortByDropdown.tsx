import { optionsByDropdownValues } from '@/components/types/products/Enums';
import DropdownMenu from '@/components/ui/DropdownMenu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type SortByDropdownProps = {
  onSortByChange: (sortBy?: string) => void;
};
export default function SortByDropdown({ onSortByChange }: SortByDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(optionsByDropdownValues.dateDesc);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
        }
    }
    if (open) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onSortByChange(option);
  };

  return (
    <div ref={dropdownRef} className="relative">
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
