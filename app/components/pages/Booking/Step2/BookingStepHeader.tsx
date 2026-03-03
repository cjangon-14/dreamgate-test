interface BookingStepHeaderProps {
  step: number;
}

export default function BookingStepHeader({ step }: BookingStepHeaderProps) {
  const totalSteps = 4;
  
  return (
    <>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please be informed that each booking is{" "}
          <strong>limited to a maximum of 6 persons</strong> to ensure a
          comfortable and well-managed experience for all guests
        </p>
      </div>
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-sky-main/20 text-navy-main font-satoshi font-bold text-xs px-3 py-1 rounded-full">
          STEP {step} OF {totalSteps}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-12 rounded-full ${
                index < step ? "bg-sky-main" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
