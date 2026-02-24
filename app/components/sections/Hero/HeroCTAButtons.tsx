const HeroCTAButtons = () => (
  <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 z-50 w-[calc(70%-2rem)] sm:w-auto">
    <button className="cursor-pointer btn-secondary flex items-center justify-center gap-2 w-50 sm:w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      BOOK NOW
    </button>
    <button className="cursor-pointer btn-primary flex items-center justify-center gap-2 w-50 sm:w-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      CHECK STATUS
    </button>
  </div>
);

export default HeroCTAButtons;
