import React from 'react'

interface BookingStep4Props {
  onBack: () => void;
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const BookingStep4: React.FC<BookingStep4Props> = ({
  onBack,
  paymentMethod,
  onPaymentMethodChange,
}) => {
  const paymentOptions: PaymentOption[] = [
    {
      id: 'credit-card',
      title: 'Credit / Debit Card',
      description: 'Pay using your Visa, Mastercard or JCB Credit/Debit card',
      icon: '💳',
    },
    {
      id: 'over-counter',
      title: 'Over the Counter',
      description: 'Pay by Cash through any of our payment partners nationwide',
      icon: '🏪',
    },
    {
      id: 'emoney',
      title: 'eMoney / Wallet',
      description: 'Pay using your E-Money Account such as GCash, Maya, GigoPay and many more.',
      icon: '📱',
    },
    {
      id: 'bank-counter',
      title: 'Bank - Over the Counter',
      description: 'Pay over-the-counter via our Partner Banks nationwide via DragonPay',
      icon: '🏦',
    },
    {
      id: 'online-banking',
      title: 'Online Banking',
      description: 'Pay using your Bank account via our online banking payment facility.',
      icon: '💻',
    },
  ];

  return (
    <div>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please be informed that each booking is{" "}
          <strong>limited to a maximum of 6 persons</strong> to ensure a
          comfortable and well-managed experience for all guests
        </p>
      </div>

      {/* Process Payment Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dark-main mb-2">Process Payment</h3>
        <p className="text-gray-main text-sm mb-6">How do you want to Pay?</p>

        {/* Payment Options */}
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                paymentMethod === option.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-light hover:border-gray-light bg-white'
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={option.id}
                checked={paymentMethod === option.id}
                onChange={(e) => onPaymentMethodChange(e.target.value)}
                className="mt-1 mr-4 w-5 h-5 text-teal-600 cursor-pointer"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-dark-main text-sm mb-1">{option.title}</h4>
                <p className="text-gray-main text-xs">{option.description}</p>
              </div>
              <span className="text-2xl ml-4">{option.icon}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-dark-main font-semibold rounded-lg border border-gray-light hover:bg-gray-light transition"
        >
          Back
        </button>
        <button
          disabled={!paymentMethod}
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition disabled:bg-gray-light disabled:text-gray-main cursor-disabled"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}

export default BookingStep4