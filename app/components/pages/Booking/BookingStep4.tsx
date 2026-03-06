import React from 'react'

interface BookingStep4Props {
  onBack: () => void;
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}

const BookingStep4: React.FC<BookingStep4Props> = ({ onBack }) => {
  const paymentOptions: PaymentOption[] = [
    {
      id: 'credit-card',
      title: 'Credit / Debit Card',
      description: 'Pay using your Visa, Mastercard or JCB Credit/Debit card',
      icon: '💳',
      url: 'https://pay.example.com/credit-card',
    },
    {
      id: 'over-counter',
      title: 'Over the Counter',
      description: 'Pay by Cash through any of our payment partners nationwide',
      icon: '🏪',
      url: 'https://pay.example.com/over-the-counter',
    },
    {
      id: 'emoney',
      title: 'eMoney / Wallet',
      description: 'Pay using your E-Money Account such as GCash, Maya, GigoPay and many more.',
      icon: '📱',
      url: 'https://pay.example.com/emoney',
    },
    {
      id: 'bank-counter',
      title: 'Bank - Over the Counter',
      description: 'Pay over-the-counter via our Partner Banks nationwide via DragonPay',
      icon: '🏦',
      url: 'https://pay.example.com/bank-counter',
    },
    {
      id: 'online-banking',
      title: 'Online Banking',
      description: 'Pay using your Bank account via our online banking payment facility.',
      icon: '💻',
      url: 'https://pay.example.com/online-banking',
    },
  ];

  return (
    <div>
      {/* Process Payment Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dark-main mb-2">
          Process Payment
        </h3>
        <p className="text-gray-main text-sm mb-6">How do you want to Pay?</p>

        {/* Payment Options */}
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <a
              key={option.id}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 border-2 border-gray-200 bg-white rounded-xl cursor-pointer transition hover:border-sky-main hover:bg-sky-main/5 hover:shadow-sm group"
            >
              <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">
                {option.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-dark-main text-sm mb-0.5">
                  {option.title}
                </h4>
                <p className="text-sky-main text-xs">{option.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingStep4
