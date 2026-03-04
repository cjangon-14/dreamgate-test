import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BookingStepHeaderProps {
  step: number;
}

export default function BookingStepHeader({ step }: BookingStepHeaderProps) {
  const totalSteps = 4;
  const [prevStep, setPrevStep] = useState(step);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    if (step > prevStep) {
      setDirection('forward');
    } else if (step < prevStep) {
      setDirection('backward');
    }
    setPrevStep(step);
  }, [step, prevStep]);
  
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
        <motion.span 
          className="bg-sky-main/20 text-navy-main font-satoshi font-bold text-xs px-3 py-1 rounded-full"
          key={step}
          initial={{ opacity: 0, y: direction === 'forward' ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          STEP {step} OF {totalSteps}
        </motion.span>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isFilled = index < step;
            const wasFilledBefore = index < prevStep;
            const isEmptying = wasFilledBefore && !isFilled;
            
            return (
              <div key={index} className="overflow-hidden relative h-2 w-12 rounded-full bg-gray-200">
                <motion.div
                  className="h-full w-full bg-sky-main rounded-full"
                  animate={{ 
                    scaleX: isFilled ? 1 : 0
                  }}
                  transition={{ 
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    delay: direction === 'forward' 
                      ? (isFilled ? index * 0.1 : 0)
                      : (totalSteps - index - 1) * 0.08
                  }}
                  style={{ originX: isEmptying ? 1 : 0 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}