import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getBookingByCode } from '~/api/bookings';

interface CheckStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckStatusModal: React.FC<CheckStatusModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      await getBookingByCode(trimmed);
      onClose();
      navigate('/check-status?booking=' + encodeURIComponent(trimmed));
    } catch (err) {
      if (err instanceof Error && err.message.includes('not found')) {
        setError('No booking found for the provided reference number.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCode('');
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white px-8 py-7 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 cursor-pointer transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-satoshi font-bold text-navy-dark mb-1">Check Booking Status</h2>
        <p className="text-sm font-satoshi text-gray-500 mb-6">
          To check your Dream Gate Booking Status, kindly enter your Booking/Reference Number.
        </p>

        <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-1.5">
          Booking/Reference Number
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(null); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g. BYB20260309OTIMG5"
          className="w-full border border-navy-dark/20 rounded-lg px-4 py-2.5 font-satoshi text-sm text-navy-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-main mb-4"
        />

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-4 text-center">
            <p className="text-sm font-satoshi font-semibold text-red-500">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handleClose}
            className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!code.trim() || isLoading}
            className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-6 py-2.5 rounded-lg transition cursor-pointer disabled:bg-sky-main/50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Checking...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckStatusModal;
