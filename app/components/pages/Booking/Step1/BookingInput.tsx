import React from 'react'

// Reusable component
function RequiredInput({ placeholder, required = true, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      
      {/* Red corner triangle (only shown when required) */}
      {required && (
        <div className="absolute top-0 left-0 w-0 h-0 
          border-l-[16px] border-l-red-500 
          border-b-[16px] border-b-transparent 
          rounded-tl-lg z-10" 
        />
      )}
      <input
        className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-satoshi 
        placeholder:text-gray-400 focus:outline-none focus:border-sky-main ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default RequiredInput


