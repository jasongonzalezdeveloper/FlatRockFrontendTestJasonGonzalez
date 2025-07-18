import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <span className="text-2xl font-bold mb-4">Loading...</span>
      <Loader size={48} className="animate-spin text-[#667085]" />
    </div>
  )
}
