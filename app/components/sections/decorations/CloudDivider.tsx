import { cloudDivider} from "~/assets";
import React from 'react'

const CloudDivider = () => {
  return (
    <div className="relative z-30 -mt-20 -mb-20 pointer-events-none select-none">
      {/* Left sun */}
      <img
        src={cloudDivider}
        alt=""
        className="absolute w-full left-0 top-40 -translate-y-1/2"
      />

      {/* Spacer so the div has height — adjust to match your graphic height */}
      <div className="w-full h-90" />
    </div>
  );
}

export default CloudDivider

